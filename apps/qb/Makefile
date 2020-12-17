setup:
	docker-compose up -d
	poetry install

start:
	poetry run uvicorn app.main:app --reload

migrate:
	poetry run alembic upgrade head