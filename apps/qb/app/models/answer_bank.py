import string
from typing import Optional
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, backref

from .game import Game
from .question import Question
from . import Base
from pydantic import BaseModel, Json


class AnswerBank(Base):
    __tablename__ = "answer_bank"
    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer, ForeignKey("games.id", ondelete="CASCADE"), primary_key=True)
    question_id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE"), primary_key=True)
    user_id = Column(String, nullable=False)
    answer = Column(String, nullable=True)
    is_correct = Column(Boolean, nullable=False)
    
    question = relationship(Question, backref=backref("answer_bank", cascade="all, delete"))
    game = relationship(
        Game, backref=backref("answer_bank", cascade="all, delete")
    )


    def as_dict(self):
        return {
            "id": self.id,
            "game_id": self.game_id,
            "question_id": self.question_id,
            "user_id": self.user_id,
            "answer": self.answer,
            "is_correct": self.is_correct,
        }


class AnswerBankBase(BaseModel):
    game_id: int
    question_id: int
    user_id: str
    is_correct: bool
    answer: str


class AnswerBankSchema(AnswerBankBase):
    id: int

    class Config:
        orm_mode = True


class RecordAnswerInput(BaseModel):
    game_id: int
    question_id: int
    user_id: str
    answer: Optional[str]
