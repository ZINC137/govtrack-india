from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.entities import Notification, User
from app.schemas.common import NotificationRead

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("", response_model=list[NotificationRead])
def list_notifications(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> list[Notification]:
    stmt = select(Notification).where(Notification.user_id == user.id).order_by(Notification.created_at.desc())
    return list(db.scalars(stmt))


@router.patch("/{notification_id}/read", response_model=NotificationRead)
def mark_read(
    notification_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Notification:
    notification = db.get(Notification, notification_id)
    if not notification or notification.user_id != user.id:
        raise HTTPException(status_code=404, detail="Notification not found")
    notification.is_read = True
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification
