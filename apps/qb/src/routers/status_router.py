from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/status", tags=["status"])
async def get():
    return {"msg": "OK"}
