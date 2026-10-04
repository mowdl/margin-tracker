"""Write the OpenAPI spec to frontend/openapi.json."""

import json
from pathlib import Path

from app.main import app

out = Path(__file__).resolve().parents[2] / "frontend" / "openapi.json"
out.write_text(json.dumps(app.openapi(), indent=2) + "\n")
print(f"Wrote {out}")
