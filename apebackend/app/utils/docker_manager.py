import docker
from docker.errors import DockerException, NotFound
from typing import List, Optional

class DockerManager:
    """Gestionnaire pour interagir avec Docker via le SDK Python"""
    
    def __init__(self):
        try:
            self.client = docker.from_env()
        except DockerException as e:
            print(f"Erreur de connexion à Docker: {e}")
            raise
    
    def list_containers(self, all_containers: bool = True) -> List:
        """Liste tous les conteneurs"""
        try:
            return self.client.containers.list(all=all_containers)
        except DockerException as e:
            print(f"Erreur lors de la liste des conteneurs: {e}")
            return []
    
    def get_container_by_name(self, service_name: str) -> Optional[object]:
        """Récupère un conteneur par son nom de service"""
        try:
            containers = self.list_containers(all_containers=True)
            for container in containers:
                if service_name.lower() in container.name.lower():
                    return container
            return None
        except DockerException as e:
            print(f"Erreur lors de la recherche du conteneur {service_name}: {e}")
            return None
    
    def start_container(self, container) -> bool:
        """Démarre un conteneur"""
        try:
            container.start()
            return True
        except DockerException as e:
            print(f"Erreur lors du démarrage: {e}")
            return False
    
    def stop_container(self, container) -> bool:
        """Arrête un conteneur"""
        try:
            container.stop()
            return True
        except DockerException as e:
            print(f"Erreur lors de l'arrêt: {e}")
            return False
    
    def restart_container(self, container) -> bool:
        """Redémarre un conteneur"""
        try:
            container.restart()
            return True
        except DockerException as e:
            print(f"Erreur lors du redémarrage: {e}")
            return False
    
    def get_logs(self, container, tail: int = 100) -> str:
        """Récupère les logs d'un conteneur"""
        try:
            logs = container.logs(tail=tail).decode('utf-8')
            return logs
        except DockerException as e:
            print(f"Erreur lors de la récupération des logs: {e}")
            return ""
    
    def get_container_stats(self, container) -> dict:
        """Récupère les statistiques d'un conteneur"""
        try:
            stats = container.stats(stream=False)
            return stats
        except DockerException as e:
            print(f"Erreur lors de la récupération des stats: {e}")
            return {}
