from datetime import date, datetime
from enum import Enum

from sqlalchemy import Boolean, Date, DateTime, Enum as SAEnum, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class JobStatus(str, Enum):
    interested = "Interested"
    applied = "Applied"
    exam_given = "Exam Given"
    result_awaited = "Result Awaited"
    selected = "Selected"
    rejected = "Rejected"


class NotificationType(str, Enum):
    vacancy = "Vacancy Alert"
    deadline = "Deadline Reminder"
    admit_card = "Admit Card"
    result = "Result"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(160))
    password_hash: Mapped[str] = mapped_column(String(255))
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    dob: Mapped[date | None] = mapped_column(Date)
    state: Mapped[str | None] = mapped_column(String(120))
    district: Mapped[str | None] = mapped_column(String(120))
    gender: Mapped[str | None] = mapped_column(String(40))
    category: Mapped[str | None] = mapped_column(String(40))
    qualification: Mapped[str | None] = mapped_column(String(120))
    degree_type: Mapped[str | None] = mapped_column(String(120))
    branch: Mapped[str | None] = mapped_column(String(120))
    experience_years: Mapped[int] = mapped_column(Integer, default=0)
    disability: Mapped[bool] = mapped_column(Boolean, default=False)
    nationality: Mapped[str] = mapped_column(String(80), default="Indian")
    interests: Mapped[list[str]] = mapped_column(JSON, default=list)
    notification_preferences: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    saved_jobs: Mapped[list["SavedJob"]] = relationship(back_populates="user")


class AdminUser(Base):
    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(160))
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(80), default="editor")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Organization(Base):
    __tablename__ = "organizations"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(180), unique=True)
    department: Mapped[str] = mapped_column(String(180))
    website: Mapped[str] = mapped_column(String(255))
    jobs: Mapped[list["Job"]] = relationship(back_populates="organization")


class State(Base):
    __tablename__ = "states"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True)
    code: Mapped[str] = mapped_column(String(8), unique=True)


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(80), unique=True)


class Qualification(Base):
    __tablename__ = "qualifications"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True)
    rank: Mapped[int] = mapped_column(Integer, default=0)


class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(220), index=True)
    slug: Mapped[str] = mapped_column(String(260), unique=True, index=True)
    organization_id: Mapped[int] = mapped_column(ForeignKey("organizations.id"))
    category: Mapped[str] = mapped_column(String(80), index=True)
    job_type: Mapped[str] = mapped_column(String(80), default="Central Government")
    state: Mapped[str | None] = mapped_column(String(120), index=True)
    vacancies: Mapped[int] = mapped_column(Integer)
    salary_min: Mapped[int] = mapped_column(Integer)
    salary_max: Mapped[int] = mapped_column(Integer)
    description: Mapped[str] = mapped_column(Text)
    selection_process: Mapped[list[str]] = mapped_column(JSON, default=list)
    required_documents: Mapped[list[str]] = mapped_column(JSON, default=list)
    official_notification_pdf: Mapped[str | None] = mapped_column(String(255))
    official_website: Mapped[str] = mapped_column(String(255))
    application_link: Mapped[str] = mapped_column(String(255))
    published_at: Mapped[date] = mapped_column(Date)
    apply_start_date: Mapped[date] = mapped_column(Date)
    last_date: Mapped[date] = mapped_column(Date, index=True)
    exam_date: Mapped[date | None] = mapped_column(Date)
    admit_card_date: Mapped[date | None] = mapped_column(Date)
    result_date: Mapped[date | None] = mapped_column(Date)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    organization: Mapped[Organization] = relationship(back_populates="jobs")
    eligibility_rule: Mapped["EligibilityRule"] = relationship(back_populates="job", uselist=False)


class EligibilityRule(Base):
    __tablename__ = "eligibility_rules"

    id: Mapped[int] = mapped_column(primary_key=True)
    job_id: Mapped[int] = mapped_column(ForeignKey("jobs.id"), unique=True)
    min_age: Mapped[int] = mapped_column(Integer)
    max_age: Mapped[int] = mapped_column(Integer)
    qualifications: Mapped[list[str]] = mapped_column(JSON, default=list)
    allowed_categories: Mapped[list[str]] = mapped_column(JSON, default=list)
    allowed_states: Mapped[list[str]] = mapped_column(JSON, default=list)
    min_experience_years: Mapped[int] = mapped_column(Integer, default=0)
    nationality: Mapped[str] = mapped_column(String(80), default="Indian")
    disability_allowed: Mapped[bool] = mapped_column(Boolean, default=True)
    notes: Mapped[str | None] = mapped_column(Text)

    job: Mapped[Job] = relationship(back_populates="eligibility_rule")


class SavedJob(Base):
    __tablename__ = "saved_jobs"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    job_id: Mapped[int] = mapped_column(ForeignKey("jobs.id"))
    status: Mapped[JobStatus] = mapped_column(SAEnum(JobStatus), default=JobStatus.interested)
    notes: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped[User] = relationship(back_populates="saved_jobs")
    job: Mapped[Job] = relationship()


class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"))
    job_id: Mapped[int | None] = mapped_column(ForeignKey("jobs.id"))
    type: Mapped[NotificationType] = mapped_column(SAEnum(NotificationType))
    title: Mapped[str] = mapped_column(String(180))
    message: Mapped[str] = mapped_column(Text)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    actor_id: Mapped[int | None] = mapped_column(Integer)
    action: Mapped[str] = mapped_column(String(120))
    target_type: Mapped[str] = mapped_column(String(80))
    target_id: Mapped[int | None] = mapped_column(Integer)
    metadata_json: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
