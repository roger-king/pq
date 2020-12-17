# Gary Postal services

# Development

```bash
    poetry install
    poetry run uvicorn app.main:app --reload

    # Generate version
    poetry run alembic revision --autogenerate -m 'some kind of message'

    # Run to latest migration
    poetry run alembic upgrade head
```
