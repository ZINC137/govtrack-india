from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_, select
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.entities import Job, SavedJob, User
from app.schemas.common import EligibilityResult, JobRead, SavedJobCreate, SavedJobRead
from app.services.eligibility import evaluate_job

router = APIRouter(prefix="/jobs", tags=["jobs"])


def job_query():
    return select(Job).options(joinedload(Job.organization), joinedload(Job.eligibility_rule))


@router.get("", response_model=list[JobRead])
def list_jobs(
    q: str | None = None,
    category: str | None = None,
    state: str | None = None,
    qualification: str | None = None,
    min_salary: int | None = None,
    closing_before: date | None = None,
    sort: str = Query(default="newest", pattern="^(newest|highest_salary|most_vacancies|closing_soon)$"),
    db: Session = Depends(get_db),
) -> list[Job]:
    stmt = job_query()
    if q:
        like = f"%{q}%"
        stmt = stmt.where(or_(Job.title.ilike(like), Job.description.ilike(like), Job.category.ilike(like)))
    if category:
        stmt = stmt.where(Job.category == category)
    if state:
        stmt = stmt.where(or_(Job.state == state, Job.state.is_(None)))
    if min_salary:
        stmt = stmt.where(Job.salary_max >= min_salary)
    if closing_before:
        stmt = stmt.where(Job.last_date <= closing_before)
    if qualification:
        stmt = stmt.join(Job.eligibility_rule).where(Job.eligibility_rule.has())

    ordering = {
        "newest": Job.published_at.desc(),
        "highest_salary": Job.salary_max.desc(),
        "most_vacancies": Job.vacancies.desc(),
        "closing_soon": Job.last_date.asc(),
    }
    return list(db.scalars(stmt.order_by(ordering[sort])).unique())


@router.get("/featured", response_model=list[JobRead])
def featured_jobs(db: Session = Depends(get_db)) -> list[Job]:
    return list(db.scalars(job_query().where(Job.is_featured.is_(True)).limit(8)).unique())


@router.get("/calendar", response_model=list[JobRead])
def exam_calendar(db: Session = Depends(get_db)) -> list[Job]:
    return list(db.scalars(job_query().where(Job.exam_date.is_not(None)).order_by(Job.exam_date)).unique())


@router.post("/saved", response_model=SavedJobRead)
def save_job(
    payload: SavedJobCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> SavedJob:
    saved = SavedJob(user_id=user.id, job_id=payload.job_id, status=payload.status, notes=payload.notes)
    db.add(saved)
    db.commit()
    db.refresh(saved)
    return saved


@router.get("/saved/list", response_model=list[SavedJobRead])
def saved_jobs(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> list[SavedJob]:
    stmt = select(SavedJob).where(SavedJob.user_id == user.id).options(joinedload(SavedJob.job).joinedload(Job.organization))
    return list(db.scalars(stmt).unique())


@router.get("/{slug}", response_model=JobRead)
def get_job(slug: str, db: Session = Depends(get_db)) -> Job:
    job = db.scalar(job_query().where(Job.slug == slug))
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.post("/eligibility", response_model=list[EligibilityResult])
def check_eligibility(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[dict]:
    jobs = list(db.scalars(job_query()).unique())
    results = []
    for job in jobs:
        evaluation = evaluate_job(user, job)
        results.append({"job": job, **evaluation})
    return sorted(results, key=lambda item: item["score"], reverse=True)

