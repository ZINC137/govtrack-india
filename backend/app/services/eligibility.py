from datetime import date

from app.models.entities import Job, User


QUALIFICATION_RANK = {
    "10th": 1,
    "12th": 2,
    "Diploma": 3,
    "Graduate": 4,
    "B.Tech": 5,
    "Postgraduate": 6,
}


def calculate_age(dob: date | None, today: date | None = None) -> int | None:
    if not dob:
        return None
    today = today or date.today()
    return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))


def qualification_matches(user_qualification: str | None, required: list[str]) -> bool:
    if not required:
        return True
    if not user_qualification:
        return False
    if user_qualification in required:
        return True
    user_rank = QUALIFICATION_RANK.get(user_qualification, 0)
    return any(user_rank >= QUALIFICATION_RANK.get(item, 99) for item in required)


def evaluate_job(user: User, job: Job) -> dict:
    rule = job.eligibility_rule
    if not rule:
        return {
            "status": "Possibly Eligible",
            "score": 65,
            "matched": ["No strict rule has been published yet."],
            "warnings": ["Verify official notification before applying."],
            "blockers": [],
        }

    matched: list[str] = []
    warnings: list[str] = []
    blockers: list[str] = []
    checks = 0
    passed = 0

    age = calculate_age(user.dob)
    checks += 1
    if age is None:
        warnings.append("Date of birth is missing, so age eligibility is estimated.")
    elif rule.min_age <= age <= rule.max_age:
        passed += 1
        matched.append(f"Age {age} is within {rule.min_age}-{rule.max_age}.")
    else:
        blockers.append(f"Age {age} is outside the required {rule.min_age}-{rule.max_age} range.")

    checks += 1
    if qualification_matches(user.qualification, rule.qualifications):
        passed += 1
        matched.append("Qualification matches the published requirement.")
    else:
        blockers.append(f"Qualification must be one of: {', '.join(rule.qualifications)}.")

    checks += 1
    if not rule.allowed_categories or user.category in rule.allowed_categories:
        passed += 1
        matched.append("Category is accepted for this recruitment.")
    else:
        blockers.append(f"Category must be one of: {', '.join(rule.allowed_categories)}.")

    checks += 1
    if not rule.allowed_states or user.state in rule.allowed_states:
        passed += 1
        matched.append("State or domicile condition matches.")
    else:
        blockers.append(f"State restriction applies: {', '.join(rule.allowed_states)}.")

    checks += 1
    if user.experience_years >= rule.min_experience_years:
        passed += 1
        matched.append("Experience requirement is satisfied.")
    else:
        blockers.append(f"Requires at least {rule.min_experience_years} years of experience.")

    checks += 1
    if user.nationality.lower() == rule.nationality.lower():
        passed += 1
        matched.append("Nationality requirement is satisfied.")
    else:
        blockers.append(f"Nationality must be {rule.nationality}.")

    if user.disability and not rule.disability_allowed:
        warnings.append("This job has a disability restriction; verify reservation details carefully.")

    score = round((passed / checks) * 100)
    if blockers:
        status = "Not Eligible" if score < 75 else "Possibly Eligible"
    elif warnings:
        status = "Possibly Eligible"
    else:
        status = "Eligible"

    return {
        "status": status,
        "score": score,
        "matched": matched,
        "warnings": warnings,
        "blockers": blockers,
    }
