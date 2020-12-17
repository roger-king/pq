from sqlalchemy.orm import Session
from typing import List
from app.utils.decorators import handle_sql_error, handle_validation_error
from app.models.question import Question, CreateQuestionInput


@handle_sql_error
def create_question(db: Session, input: CreateQuestionInput):
    c = Question(**input.dict())
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


@handle_sql_error
def update_questions_options(db: Session, id: int, options: List[dict]):
    question = db.query(Question).filter_by(id=id).update({"options": options})
    db.commit()
    return question


@handle_sql_error
def find_questions_by_game_id(db: Session, game_id: int):
    return db.query(Question).filter_by(game_id=game_id).all()
