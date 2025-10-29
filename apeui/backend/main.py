from fastapi import FastAPI
import docker

app = FastAPI()
client = docker.from_env()


@app.get("/")
def root():
    return {"message": "ApeUI backend", "available_routes": ["/services", "/service/{name}/{action}"]}

@app.get("/services")
def list_services():
    containers = client.containers.list(all=True)
    return [{"name": c.name, "status": c.status} for c in containers]

@app.post("/service/{name}/{action}")
def control_service(name: str, action: str):
    container = client.containers.get(name)
    if action == "start":
        container.start()
    elif action == "stop":
        container.stop()
    elif action == "restart":
        container.restart()
    return {"status": f"{name} {action}ed"}
