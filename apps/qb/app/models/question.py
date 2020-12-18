from typing import Optional, List
from sqlalchemy import Column, String, Integer, DateTime, event, ForeignKey, Boolean
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from uuid import UUID as UUIDType, uuid4
from . import Base
from pydantic import BaseModel, Json
from datetime import datetime


class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("games.id"))
    q = Column(String, nullable=False, unique=True)
    answer = Column(String, nullable=False)
    options = Column(JSONB, nullable=False, default=[])
    created_by = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=False), server_default=func.now())
    updated_at = Column(DateTime(timezone=False), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=False))

    def as_dict(self):
        return {
            "id": self.id,
            "game_id": str(self.game_id),
            "options": self.options,
            "q": self.q,
            "answer": self.answer,
            "created_by": self.created_by,
        }


class QuestionBase(BaseModel):
    game_id: int
    q: str
    answer: str
    options: List[dict]
    created_by: str
    created_at: datetime
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]


class QuestionSchema(QuestionBase):
    id: int

    class Config:
        orm_mode = True


class CreateQuestionInput(BaseModel):
    game_id: Optional[int]
    q: str
    answer: str
    created_by: str
    options: List[dict]


class UpdateQuestionOptionsInput(BaseModel):
    options: List[dict]
