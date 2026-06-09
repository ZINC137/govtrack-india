from datetime import date, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.entities import Job, Notification, SavedJob, User
from app.services.eligibility import evaluate_job

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("")
def dashboard(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict:
    jobs = list(db.scalars(select(Job).options(joinedload(Job.organization), joinedload(Job.eligibility_rule))).unique())
    evaluations = [{"job": job, **evaluate_job(user, job)} for job in jobs]
    eligible = [item for item in evaluations if item["status"] == "Eligible"]
    deadline_limit = date.today() + timedelta(days=30)
    upcoming = [job for job in jobs if job.last_date <= deadline_limit]

    return {
        "eligible_jobs_count": len(eligible),
        "saved_jobs_count": db.scalar(select(func.count()).select_from(SavedJob).where(SavedJob.user_id == user.id)),
        "unread_notifications": db.scalar(
            select(func.count()).select_from(Notification).where(Notification.user_id == user.id, Notification.is_read.is_(False))
        ),
        "upcoming_deadlines": [{"title": job.title, "slug": job.slug, "last_date": job.last_date} for job in upcoming[:6]],
        "recommended_jobs": [
            {"title": item["job"].title, "slug": item["job"].slug, "score": item["score"], "status": item["status"]}
            for item in sorted(evaluations, key=lambda result: result["score"], reverse=True)[:6]
        ],
        "recent_searches": ["SSC", "Banking", "Railways"],
    }
