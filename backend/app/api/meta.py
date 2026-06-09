from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.entities import Category, Qualification, State

router = APIRouter(prefix="/meta", tags=["meta"])


@router.get("/states")
def states(db: Session = Depends(get_db)) -> list[str]:
    return list(db.scalars(select(State.name).order_by(State.name)))


@router.get("/categories")
def categories(db: Session = Depends(get_db)) -> list[str]:
    return list(db.scalars(select(Category.name).order_by(Category.name)))


@router.get("/qualifications")
def qualifications(db: Session = Depends(get_db)) -> list[str]:
    return list(db.scalars(select(Qualification.name).order_by(Qualification.rank)))
