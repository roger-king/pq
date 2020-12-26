import string
import random
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.utils.decorators import handle_sql_error, handle_validation_error
from app.models.game import Game, CreateGameInput
from app.models.answer_bank import AnswerBank


@handle_sql_error
def create_game(db: Session, input: CreateGameInput):
    c = Game(**input.dict())
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


# TODO: look into filter object
@handle_sql_error
def find_all_games(
    db: Session, skip: int = 0, limit: int = 20, code: str = None, host_code: str = None
):
    if code:
        return db.query(Game).filter_by(code=code).offset(skip).limit(limit).all()
    if host_code:
        return (
            db.query(Game)
            .filter_by(host_code=host_code)
            .offset(skip)
            .limit(limit)
            .all()
        )

    return db.query(Game).offset(skip).limit(limit).all()


@handle_sql_error
def find_one_game(db: Session, id: int):
    return db.query(Game).filter_by(id=id).first()


@handle_sql_error
def join_game(db: Session, code: str):
    return db.query(Game).filter(or_(Game.host_code == code, Game.code == code)).first()


@handle_sql_error
def start_game(db: Session, code: str):
    db.query(Game).filter_by(host_code=code).update({"is_started": True})
    db.commit()
    g = db.query(Game).filter_by(host_code=code).first()
    return g


@handle_sql_error
def mark_as_done(db: Session, code: str):
    db.query(Game).filter_by(code=code).update({"is_over": True})
    db.commit()
    return True


@handle_sql_error
def calculate_score(db: Session, code: str):
    leaderboard = {}
    game = db.query(Game).filter_by(code=code).first()

    if game:
        # TODO: order by score
        answers = db.query(AnswerBank).filter_by(game_id=game.id).all()
        print(answers)
        for a in answers:
            if a.user_id in leaderboard:
                if a.is_correct:
                    leaderboard[a.user_id]['score'] += 1
            else:
                leaderboard[a.user_id] = {"display_name": a.display_name, "score": 0}

                if a.is_correct:
                    leaderboard[a.user_id]['score'] = 1

    #TODO: throw error game not found
    return leaderboard
