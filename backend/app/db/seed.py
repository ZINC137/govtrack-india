from datetime import date, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.entities import (
    AdminUser,
    Category,
    EligibilityRule,
    Job,
    Notification,
    NotificationType,
    Organization,
    Qualification,
    State,
    User,
)


def seed(db: Session) -> None:
    if db.scalar(select(Job).limit(1)):
        return

    states = [
        ("Andhra Pradesh", "AP"),
        ("Delhi", "DL"),
        ("Karnataka", "KA"),
        ("Maharashtra", "MH"),
        ("Tamil Nadu", "TN"),
        ("Uttar Pradesh", "UP"),
        ("West Bengal", "WB"),
    ]
    db.add_all([State(name=name, code=code) for name, code in states])
    db.add_all([Category(name=name) for name in ["General", "OBC", "SC", "ST", "EWS"]])
    db.add_all(
        [
            Qualification(name="10th", rank=1),
            Qualification(name="12th", rank=2),
            Qualification(name="Diploma", rank=3),
            Qualification(name="Graduate", rank=4),
            Qualification(name="B.Tech", rank=5),
            Qualification(name="Postgraduate", rank=6),
        ]
    )

    orgs = [
        Organization(name="Staff Selection Commission", department="Personnel and Training", website="https://ssc.gov.in"),
        Organization(name="Indian Railways", department="Railway Recruitment Board", website="https://indianrailways.gov.in"),
        Organization(name="Institute of Banking Personnel Selection", department="Banking", website="https://ibps.in"),
        Organization(name="Union Public Service Commission", department="Civil Services", website="https://upsc.gov.in"),
        Organization(name="Bharat Electronics Limited", department="Public Sector Undertaking", website="https://bel-india.in"),
    ]
    db.add_all(orgs)
    db.flush()

    today = date.today()
    jobs = [
        Job(
            title="SSC Combined Graduate Level Examination 2026",
            slug="ssc-cgl-2026",
            organization_id=orgs[0].id,
            category="SSC",
            job_type="Central Government",
            state=None,
            vacancies=17727,
            salary_min=25500,
            salary_max=151100,
            description="Group B and C recruitment across central ministries and departments.",
            selection_process=["Tier I", "Tier II", "Document Verification"],
            required_documents=["Photo ID", "Graduation certificate", "Category certificate if applicable"],
            official_notification_pdf="https://ssc.gov.in",
            official_website="https://ssc.gov.in",
            application_link="https://ssc.gov.in",
            published_at=today - timedelta(days=5),
            apply_start_date=today - timedelta(days=5),
            last_date=today + timedelta(days=25),
            exam_date=today + timedelta(days=90),
            admit_card_date=today + timedelta(days=78),
            result_date=today + timedelta(days=160),
            is_featured=True,
        ),
        Job(
            title="Railway Technician Grade I Signal 2026",
            slug="railway-technician-grade-i-signal-2026",
            organization_id=orgs[1].id,
            category="Railways",
            job_type="Central Government",
            state=None,
            vacancies=9144,
            salary_min=19900,
            salary_max=63200,
            description="Technical recruitment for signal and maintenance roles across railway zones.",
            selection_process=["Computer Based Test", "Document Verification", "Medical Examination"],
            required_documents=["10th certificate", "ITI or diploma certificate", "Photo ID"],
            official_notification_pdf="https://www.rrbcdg.gov.in",
            official_website="https://www.rrbcdg.gov.in",
            application_link="https://www.rrbapply.gov.in",
            published_at=today - timedelta(days=12),
            apply_start_date=today - timedelta(days=10),
            last_date=today + timedelta(days=18),
            exam_date=today + timedelta(days=75),
            admit_card_date=today + timedelta(days=65),
            result_date=today + timedelta(days=140),
            is_featured=True,
        ),
        Job(
            title="IBPS Probationary Officer 2026",
            slug="ibps-po-2026",
            organization_id=orgs[2].id,
            category="Banking",
            job_type="Banking",
            state=None,
            vacancies=4455,
            salary_min=36000,
            salary_max=63840,
            description="Probationary Officer recruitment for participating public sector banks.",
            selection_process=["Preliminary Exam", "Main Exam", "Interview"],
            required_documents=["Graduation certificate", "Photo ID", "Signature", "Category certificate if applicable"],
            official_notification_pdf="https://ibps.in",
            official_website="https://ibps.in",
            application_link="https://ibpsonline.ibps.in",
            published_at=today - timedelta(days=3),
            apply_start_date=today - timedelta(days=3),
            last_date=today + timedelta(days=28),
            exam_date=today + timedelta(days=70),
            admit_card_date=today + timedelta(days=58),
            result_date=today + timedelta(days=125),
            is_featured=True,
        ),
        Job(
            title="UPSC Engineering Services Examination 2026",
            slug="upsc-ese-2026",
            organization_id=orgs[3].id,
            category="Engineering",
            job_type="Central Government",
            state=None,
            vacancies=232,
            salary_min=56100,
            salary_max=177500,
            description="Engineering services recruitment for civil, mechanical, electrical, and electronics branches.",
            selection_process=["Preliminary Exam", "Main Exam", "Personality Test"],
            required_documents=["Engineering degree", "Photo ID", "Age proof"],
            official_notification_pdf="https://upsc.gov.in",
            official_website="https://upsc.gov.in",
            application_link="https://upsconline.nic.in",
            published_at=today - timedelta(days=20),
            apply_start_date=today - timedelta(days=20),
            last_date=today + timedelta(days=12),
            exam_date=today + timedelta(days=110),
            admit_card_date=today + timedelta(days=95),
            result_date=today + timedelta(days=210),
            is_featured=False,
        ),
        Job(
            title="BEL Project Engineer Recruitment 2026",
            slug="bel-project-engineer-2026",
            organization_id=orgs[4].id,
            category="PSU",
            job_type="PSU",
            state="Karnataka",
            vacancies=48,
            salary_min=40000,
            salary_max=55000,
            description="Contract engineering roles for electronics, computer science, and mechanical projects.",
            selection_process=["Shortlisting", "Written Test", "Interview"],
            required_documents=["B.Tech certificate", "Experience certificate", "Photo ID"],
            official_notification_pdf="https://bel-india.in",
            official_website="https://bel-india.in",
            application_link="https://bel-india.in/careers",
            published_at=today - timedelta(days=7),
            apply_start_date=today - timedelta(days=7),
            last_date=today + timedelta(days=20),
            exam_date=None,
            admit_card_date=None,
            result_date=today + timedelta(days=80),
            is_featured=False,
        ),
    ]
    db.add_all(jobs)
    db.flush()

    rules = [
        EligibilityRule(job_id=jobs[0].id, min_age=18, max_age=32, qualifications=["Graduate"], allowed_categories=[], allowed_states=[], min_experience_years=0),
        EligibilityRule(job_id=jobs[1].id, min_age=18, max_age=36, qualifications=["10th", "Diploma"], allowed_categories=[], allowed_states=[], min_experience_years=0),
        EligibilityRule(job_id=jobs[2].id, min_age=20, max_age=30, qualifications=["Graduate"], allowed_categories=[], allowed_states=[], min_experience_years=0),
        EligibilityRule(job_id=jobs[3].id, min_age=21, max_age=30, qualifications=["B.Tech"], allowed_categories=[], allowed_states=[], min_experience_years=0),
        EligibilityRule(job_id=jobs[4].id, min_age=24, max_age=32, qualifications=["B.Tech"], allowed_categories=["General", "OBC", "EWS"], allowed_states=["Karnataka"], min_experience_years=2),
    ]
    db.add_all(rules)

    demo_user = User(
        email="demo@govtrack.in",
        full_name="Demo Candidate",
        password_hash=hash_password("Demo@12345"),
        is_verified=True,
        dob=date(1998, 5, 12),
        state="Karnataka",
        district="Bengaluru Urban",
        gender="Female",
        category="OBC",
        qualification="B.Tech",
        degree_type="Bachelor",
        branch="Computer Science",
        experience_years=2,
        interests=["Banking", "SSC", "Railways", "PSU"],
    )
    admin = AdminUser(email="admin@govtrack.in", full_name="GovTrack Admin", password_hash=hash_password("Admin@12345"))
    db.add_all([demo_user, admin])
    db.flush()
    db.add_all(
        [
            Notification(user_id=demo_user.id, job_id=jobs[0].id, type=NotificationType.deadline, title="SSC CGL closes soon", message="Application deadline is approaching."),
            Notification(user_id=demo_user.id, job_id=jobs[2].id, type=NotificationType.vacancy, title="New banking vacancy", message="IBPS PO matches your Banking interest."),
        ]
    )
    db.commit()
