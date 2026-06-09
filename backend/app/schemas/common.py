from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=2, max_length=160)
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ProfileUpdate(BaseModel):
    dob: date | None = None
    state: str | None = None
    district: str | None = None
    gender: str | None = None
    category: str | None = None
    qualification: str | None = None
    degree_type: str | None = None
    branch: str | None = None
    experience_years: int = 0
    disability: bool = False
    nationality: str = "Indian"
    interests: list[str] = []
    notification_preferences: dict = {}


class UserRead(ProfileUpdate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    full_name: str
    is_verified: bool
    created_at: datetime


class OrganizationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    department: str
    website: str


class EligibilityRuleRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    min_age: int
    max_age: int
    qualifications: list[str]
    allowed_categories: list[str]
    allowed_states: list[str]
    min_experience_years: int
    nationality: str
    disability_allowed: bool
    notes: str | None = None


class JobCreate(BaseModel):
    title: str
    slug: str
    organization_id: int
    category: str
    job_type: str = "Central Government"
    state: str | None = None
    vacancies: int
    salary_min: int
    salary_max: int
    description: str
    selection_process: list[str]
    required_documents: list[str]
    official_notification_pdf: str | None = None
    official_website: str
    application_link: str
    published_at: date
    apply_start_date: date
    last_date: date
    exam_date: date | None = None
    admit_card_date: date | None = None
    result_date: date | None = None
    is_featured: bool = False
    eligibility_rule: EligibilityRuleRead


class JobRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    organization: OrganizationRead
    category: str
    job_type: str
    state: str | None
    vacancies: int
    salary_min: int
    salary_max: int
    description: str
    selection_process: list[str]
    required_documents: list[str]
    official_notification_pdf: str | None
    official_website: str
    application_link: str
    published_at: date
    apply_start_date: date
    last_date: date
    exam_date: date | None
    admit_card_date: date | None
    result_date: date | None
    is_featured: bool
    eligibility_rule: EligibilityRuleRead | None = None


class EligibilityResult(BaseModel):
    job: JobRead
    status: str
    score: int
    matched: list[str]
    warnings: list[str]
    blockers: list[str]


class NotificationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    type: str
    title: str
    message: str
    is_read: bool
    created_at: datetime


class SavedJobCreate(BaseModel):
    job_id: int
    status: str = "Interested"
    notes: str | None = None


class SavedJobRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    status: str
    notes: str | None
    created_at: datetime
    job: JobRead
