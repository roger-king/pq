import string
import random
from typing import Optional
from sqlalchemy import Column, String, Integer, DateTime, event, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from . import Base
from pydantic import BaseModel, Json
from datetime import datetime


class Game(Base):
    __tablename__ = "games"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    code = Column(String, nullable=False, unique=True)
    host_code = Column(String, nullable=False, unique=True)
    is_over = Column(Boolean, nullable=False, default=False)
    start_time = Column(DateTime(timezone=False), server_default=func.now())
    created_by = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=False), server_default=func.now())
    updated_at = Column(DateTime(timezone=False), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=False))

    def as_dict(self):
        return {
            "id": self.id,
            "name": str(self.name),
            "code": self.code,
            "host_code": self.host_code,
            "start_time": self.start_time,
            "created_by": self.created_by,
        }


def generate_code(size=12, chars=string.ascii_uppercase + string.digits) -> str:
    return ''.join(random.choice(chars) for _ in range(size))

@event.listens_for(Game, "before_insert")
def before_insert(mapper, connect, target):
    if not target.code:
        target.host_code = generate_code()
    
    if not target.code:
        target.code = generate_code()

class GameBase(BaseModel):
    name: str
    code: str
    host_code: str
    created_by: str
    start_time: datetime
    created_at: datetime
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]


class GameSchema(GameBase):
    id: int

    class Config:
        orm_mode = True


class CreateGameInput(BaseModel):
    name: str
    created_by: str