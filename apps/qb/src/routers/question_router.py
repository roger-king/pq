from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.routers.middlewares import get_db
from app.models.question import QuestionSchema, UpdateQuestionOptionsInput
from app.services.question_service import update_questions_options

router = APIRouter()


@router.put("/question/{id}", tags=["question"], response_model=QuestionSchema)
async def update_options(
    id: int, input: UpdateQuestionOptionsInput, db: Session = Depends(get_db)
):
    updated_question = update_questions_options(db, id, input)
    return updated_question

