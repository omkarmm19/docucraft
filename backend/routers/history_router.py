from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import User, GenerationHistory, HistoryOut
from auth import get_current_user

router = APIRouter(prefix="/history", tags=["history"])


@router.get("/", response_model=List[HistoryOut])
def get_history(
    current_user: User    = Depends(get_current_user),
    db:           Session = Depends(get_db),
):
    """Return the current user's last 50 generation records, newest first."""
    return (
        db.query(GenerationHistory)
        .filter(GenerationHistory.user_id == current_user.id)
        .order_by(GenerationHistory.created_at.desc())
        .limit(50)
        .all()
    )


@router.delete("/{history_id}")
def delete_history(
    history_id:   int,
    current_user: User    = Depends(get_current_user),
    db:           Session = Depends(get_db),
):
    """Delete a single history record (only if it belongs to the current user)."""
    record = (
        db.query(GenerationHistory)
        .filter(
            GenerationHistory.id      == history_id,
            GenerationHistory.user_id == current_user.id,
        )
        .first()
    )
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    db.delete(record)
    db.commit()
    return {"message": "Deleted"}
