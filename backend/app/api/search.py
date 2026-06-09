from fastapi import APIRouter, Depends
from sqlalchemy import or_, select
from sqlalchemy.orm import Session, joinedload

from app.db.session import get_db
from app.models.entities import Job
from app.schemas.common import JobRead

router = APIRouter(prefix="/search", tags=["search"])


@router.get("", response_model=list[JobRead])
def global_search(q: str, db: Session = Depends(get_db)) -> list[Job]:
    like = f"%{q}%"
    stmt = (
        select(Job)
        .options(joinedload(Job.organization), joinedload(Job.eligibility_rule))
        .where(or_(Job.title.ilike(like), Job.category.ilike(like), Job.description.ilike(like), Job.job_type.ilike(like)))
        .order_by(Job.is_featured.desc(), Job.last_date.asc())
        .limit(12)
    )
    return list(db.scalars(stmt).unique())


@router.get("/autocomplete")
def autocomplete(q: str, db: Session = Depends(get_db)) -> list[str]:
    like = f"%{q}%"
    stmt = select(Job.title).where(Job.title.ilike(like)).limit(8)
    return list(db.scalars(stmt))


@router.get("/popular")
def popular_searches() -> list[str]:
    return ["SSC CGL", "Railway Technician", "IBPS PO", "UPSC Civil Services", "Defence", "PSU Engineer"]
