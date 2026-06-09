from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.security import create_access_token, verify_password
from app.db.session import get_db
from app.models.entities import ActivityLog, AdminUser, EligibilityRule, Job, Notification, User
from app.schemas.common import JobCreate, JobRead, LoginRequest, Token

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/login", response_model=Token)
def admin_login(payload: LoginRequest, db: Session = Depends(get_db)) -> Token:
    admin = db.scalar(select(AdminUser).where(AdminUser.email == payload.email))
    if not admin or not verify_password(payload.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return Token(access_token=create_access_token(admin.email, {"role": "admin"}))


@router.get("/analytics")
def analytics(_: AdminUser = Depends(get_current_admin), db: Session = Depends(get_db)) -> dict:
    return {
        "users": db.scalar(select(func.count()).select_from(User)),
        "jobs": db.scalar(select(func.count()).select_from(Job)),
        "notifications": db.scalar(select(func.count()).select_from(Notification)),
        "activity_logs": db.scalar(select(func.count()).select_from(ActivityLog)),
    }


@router.post("/jobs", response_model=JobRead, status_code=status.HTTP_201_CREATED)
def create_job(payload: JobCreate, _: AdminUser = Depends(get_current_admin), db: Session = Depends(get_db)) -> Job:
    if db.scalar(select(Job).where(Job.slug == payload.slug)):
        raise HTTPException(status_code=409, detail="Slug already exists")
    data = payload.model_dump()
    rule_data = data.pop("eligibility_rule")
    job = Job(**data)
    db.add(job)
    db.flush()
    db.add(EligibilityRule(job_id=job.id, **rule_data))
    db.add(ActivityLog(action="job.created", target_type="job", target_id=job.id, metadata_json={"slug": job.slug}))
    db.commit()
    db.refresh(job)
    return job


@router.delete("/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(job_id: int, _: AdminUser = Depends(get_current_admin), db: Session = Depends(get_db)) -> None:
    job = db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.add(ActivityLog(action="job.deleted", target_type="job", target_id=job_id))
    db.commit()
