from fastapi import APIRouter, FastAPI
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str


api = APIRouter(prefix="/api")


@api.get("/health", operation_id="getHealth")
def health() -> HealthResponse:
    return HealthResponse(status="ok")


app = FastAPI(title="Margin Tracker API", openapi_url="/api/openapi.json", docs_url="/api/docs")
app.include_router(api)
