from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.routers.middlewares import get_db
from app.models.game import GameSchema, CreateGameInput
from app.models.question import QuestionSchema, CreateQuestionInput
from app.services.question_service import find_questions_by_game_id, bulk_create_question
from app.services.game_service import (
    create_game,
    find_all_games,
    find_one_game,
)

router = APIRouter()


@router.post("/games", tags=["game"], response_model=GameSchema)
async def create(input: CreateGameInput, db: Session = Depends(get_db)):
    new_game = create_game(db, input)
    return new_game


@router.get("/games", tags=["game"], response_model=List[GameSchema])
async def find_all(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 20,
    code: str = None,
    host_code: str = None,
):
    games = find_all_games(db, skip, limit, code, host_code)
    return games


@router.get(
    "/games/{id}/questions",
    tags=["game", "question"],
    response_model=List[QuestionSchema],
)
async def find_game_questions(
    id: int, db: Session = Depends(get_db),
):
    questions = find_questions_by_game_id(db, id)
    return questions


@router.post(
    "/games/{id}/questions", tags=["game", "question"], response_model=List[QuestionSchema]
)
async def create_game_question(
    id: int, input: List[CreateQuestionInput], db: Session = Depends(get_db),
):
    question = bulk_create_question(db, input)
    return question
