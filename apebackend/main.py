
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import services

app = FastAPI(
    title="ApeBox API",
    description="API de gestion des services ApeBox",
    version="1.0.0"
)

# Configuration CORS pour permettre au frontend d'accéder à l'API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En production, spécifier les domaines autorisés
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclure les routes
app.include_router(services.router, prefix="/api", tags=["services"])

@app.get("/")
async def root():
    return {
        "message": "ApeBox API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "ok"}
