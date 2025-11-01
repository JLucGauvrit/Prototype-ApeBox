from fastapi import APIRouter, HTTPException
from typing import List, Dict
from app.utils.docker_manager import DockerManager

router = APIRouter()
docker_manager = DockerManager()

# Configuration des services avec leurs métadonnées
SERVICES_CONFIG = {
    "vllm": {
        "displayName": "vLLM",
        "description": "Serveur de modèles LLM",
        "url": "http://localhost:8000",
        "port": 8000
    },
    "n8n": {
        "displayName": "n8n",
        "description": "Automatisation no-code",
        "url": "http://localhost:5678",
        "port": 5678
    },
    "nextcloud": {
        "displayName": "Nextcloud",
        "description": "Stockage de fichiers",
        "url": "http://localhost:8081",
        "port": 8081
    },
    "mcp": {
        "displayName": "MCP Server",
        "description": "Model Context Protocol",
        "url": "http://localhost:9090",
        "port": 9090
    },
    "postgres": {
        "displayName": "PostgreSQL",
        "description": "Base de données",
        "url": None,
        "port": 5432
    },
    "qdrant": {
        "displayName": "Qdrant",
        "description": "Base vectorielle",
        "url": "http://localhost:6333",
        "port": 6333
    }
}

@router.get("/services")
async def get_services():
    """Récupère la liste de tous les services et leur statut"""
    try:
        containers = docker_manager.list_containers()
        services = []
        
        for container in containers:
            container_name = container.name
            # Extraire le nom du service (format: prototype-apebox-vllm-1 -> vllm)
            service_name = None
            for key in SERVICES_CONFIG.keys():
                if key in container_name.lower():
                    service_name = key
                    break
            
            if service_name and service_name in SERVICES_CONFIG:
                config = SERVICES_CONFIG[service_name]
                services.append({
                    "name": service_name,
                    "displayName": config["displayName"],
                    "description": config["description"],
                    "status": container.status,
                    "url": config["url"],
                    "port": config["port"],
                    "container_id": container.id[:12]
                })
        
        return {"services": services}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des services: {str(e)}")

@router.post("/services/{service_name}/start")
async def start_service(service_name: str):
    """Démarre un service spécifique"""
    try:
        container = docker_manager.get_container_by_name(service_name)
        if not container:
            raise HTTPException(status_code=404, detail=f"Service {service_name} non trouvé")
        
        docker_manager.start_container(container)
        return {
            "message": f"Service {service_name} démarré avec succès",
            "status": "running"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du démarrage: {str(e)}")

@router.post("/services/{service_name}/stop")
async def stop_service(service_name: str):
    """Arrête un service spécifique"""
    try:
        container = docker_manager.get_container_by_name(service_name)
        if not container:
            raise HTTPException(status_code=404, detail=f"Service {service_name} non trouvé")
        
        docker_manager.stop_container(container)
        return {
            "message": f"Service {service_name} arrêté avec succès",
            "status": "stopped"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'arrêt: {str(e)}")

@router.post("/services/{service_name}/restart")
async def restart_service(service_name: str):
    """Redémarre un service spécifique"""
    try:
        container = docker_manager.get_container_by_name(service_name)
        if not container:
            raise HTTPException(status_code=404, detail=f"Service {service_name} non trouvé")
        
        docker_manager.restart_container(container)
        return {
            "message": f"Service {service_name} redémarré avec succès",
            "status": "running"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du redémarrage: {str(e)}")

@router.get("/services/{service_name}/logs")
async def get_service_logs(service_name: str, tail: int = 100):
    """Récupère les logs d'un service"""
    try:
        container = docker_manager.get_container_by_name(service_name)
        if not container:
            raise HTTPException(status_code=404, detail=f"Service {service_name} non trouvé")
        
        logs = docker_manager.get_logs(container, tail=tail)
        return {
            "service": service_name,
            "logs": logs
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des logs: {str(e)}")
