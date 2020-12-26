from sqlalchemy.orm import Session
from app.utils.decorators import handle_sql_error
from app.models.answer_bank import RecordAnswerInput, AnswerBank
from app.services.game_service import find_one_game
from app.services.question_service import find_one_question

@handle_sql_error
def record_answer(db: Session, input: RecordAnswerInput) -> bool:
    game = find_one_game(db, input.game_id)
    question = find_one_question(db, input.question_id)
    # TODO: Validate input.answer is A,B,C,D
    # TODO: fix duplicate entries for a persons answer for 1 question in 1 game can be recorded twice
    if game and question:
        is_correct = question.answer.lower() == input.answer.lower()
        a = AnswerBank(game_id=game.id, question_id=question.id, answer=input.answer, user_id=input.user_id, is_correct=is_correct, display_name=input.display_name)
        db.add(a)
        db.commit()
        return True
    
    return False
