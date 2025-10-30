from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import docker
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = docker.from_env()

# Mount the static files
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    # Mount the assets directory
    assets_dir = os.path.join(static_dir, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="static")

@app.get("/api")
async def root():
    return {"message": "ApeUI backend", "available_routes": ["/api/services", "/api/service/{name}/{action}"]}

@app.get("/api/services")
async def list_services():
    try:
        containers = client.containers.list(all=True)
        return [{"name": c.name, "status": c.status} for c in containers]
    except Exception as e:
        return {"error": str(e)}

@app.get("/{full_path:path}")
async def serve_frontend(request: Request, full_path: str):
    # For all other routes, serve index.html for SPA behavior
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "File not found"}
async def list_services():
    try:
        containers = client.containers.list(all=True)
        return [{"name": c.name, "status": c.status} for c in containers]
    except Exception as e:
        print(f"Error listing containers: {str(e)}")
        return {"error": "Failed to list containers"}

@app.post("/api/service/{name}/{action}")
def control_service(name: str, action: str):
    container = client.containers.get(name)
    if action == "start":
        container.start()
    elif action == "stop":
        container.stop()
    elif action == "restart":
        container.restart()
    return {"status": f"{name} {action}ed"}
