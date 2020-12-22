from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.routers.middlewares import get_db
from app.models.game import GameSchema, JoinGameSchema, CreateGameInput
from app.models.question import QuestionSchema, CreateQuestionInput
from app.services.question_service import (
    find_questions_by_game_id,
    bulk_create_question,
)
from app.services.game_service import (
    create_game,
    find_all_games,
    find_one_game,
    join_game,
    start_game
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


@router.put("/games/{code}/join", tags=["game", "join"], response_model=JoinGameSchema)
async def join(
    code: str, db: Session = Depends(get_db),
):
    game = join_game(db, code)
    is_host = True if game.host_code == code else False
    # TODO: add player if not host
    return JoinGameSchema(
        id=game.id,
        name=game.name,
        host_code=game.host_code,
        code=game.code,
        is_over=game.is_over,
        is_started=game.is_started,
        created_by=game.created_by,
        start_time=game.start_time,
        created_at=game.created_at,
        is_host=is_host,
    )


@router.put("/games/{code}/start", tags=["game", "start"], response_model=GameSchema)
async def start(
    code: str, db: Session = Depends(get_db),
):
    game = start_game(db, code)

    return game


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
    "/games/{id}/questions",
    tags=["game", "question"],
    response_model=List[QuestionSchema],
)
async def create_game_question(
    id: int, input: List[CreateQuestionInput], db: Session = Depends(get_db),
):
    question = bulk_create_question(db, input)
    return question
