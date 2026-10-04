# Margin Tracker

## Layout

| Folder       | What                                                               |
| ------------ | ------------------------------------------------------------------ |
| `backend/`   | FastAPI app (Python 3.13, uv)                                      |
| `frontend/`  | React app (Vite, TanStack Router + Query, Tailwind, shadcn/ui)     |
| `notebooks/` | Jupyter notebooks, own Python environment                          |
| `data/`      | Local input files. **Ignored by git, never commit real data.**    |
| `docs/`      | Architecture and process docs                                      |

## Run the app

Requires [Docker](https://docs.docker.com/get-docker/).

```sh
docker compose up --build
```

- Frontend: http://localhost:5173
- API docs: http://localhost:8000/api/docs

Both services reload on code changes. The frontend proxies `/api` to the backend.

## Run the notebooks

Requires [uv](https://docs.astral.sh/uv/getting-started/installation/).

```sh
cd notebooks
uv run jupyter lab
```

Add a package with `uv add <package>` from `notebooks/`.

## Develop without Docker

Backend (needs uv):

```sh
cd backend
uv run uvicorn app.main:app --reload
uv run pytest
uv run ruff check . && uv run ruff format .
```

Frontend (needs Node 24 and pnpm):

```sh
cd frontend
pnpm install
pnpm dev
pnpm test
pnpm typecheck
pnpm lint && pnpm format
```

## API client

The frontend's API client and TanStack Query helpers are generated from the backend's OpenAPI spec. After changing a backend endpoint, regenerate and commit the result:

```sh
cd frontend
pnpm gen:api
```

This writes `frontend/openapi.json` and `frontend/src/client/`.

## Deployment (testing)

The app deploys to Vercel as one project: `frontend/` is served as static files and `api/index.py` runs the FastAPI app as a Python function for `/api/*`. Every push to a PR gets a preview URL; `main` deploys to production.

Vercel installs backend packages from the root `requirements.txt`. After changing backend dependencies, regenerate it:

```sh
cd backend
uv export --no-dev --no-hashes --no-emit-project -o ../requirements.txt
```
