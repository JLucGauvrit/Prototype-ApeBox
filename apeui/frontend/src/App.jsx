import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Square, RefreshCcw, Cpu, Cloud } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const serviceConfig = {
  openwebui: {
    name: "Open WebUI",
    description: "Interface IA pour interagir avec des modèles de langage",
    icon: <Cpu />,
    port: 8080
  },
  n8n: {
    name: "n8n Automations",
    description: "Automatisation de workflows et intégrations",
    icon: <RefreshCcw />,
    port: 5678
  },
  nextcloud: {
    name: "Nextcloud Drive",
    description: "Stockage cloud personnel et partage de fichiers",
    icon: <Cloud />,
    port: 8081
  }
};

export default function ApeBoxDashboard() {
  const [services, setServices] = useState(Object.entries(serviceConfig).map(([id, config]) => ({
    ...config,
    id,
    status: "loading"
  })));
  const [loading, setLoading] = useState({});

  useEffect(() => {
    fetchServices();
    const interval = setInterval(fetchServices, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(prev => prev.map(service => {
        const containerInfo = data.find(d => d.name === service.id);
        return {
          ...service,
          status: containerInfo ? containerInfo.status : "stopped"
        };
      }));
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer l'état des services",
        variant: "destructive"
      });
    }
  };

  const updateServiceStatus = async (id, action) => {
    setLoading(prev => ({ ...prev, [id]: true }));
    try {
      const response = await fetch(`/api/service/${id}/${action}`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to update service');
      
      toast({
        title: "Succès",
        description: `Service ${id} ${action === 'start' ? 'démarré' : 'arrêté'} avec succès`,
      });
      
      await fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Erreur",
        description: `Impossible de ${action === 'start' ? 'démarrer' : 'arrêter'} le service ${id}`,
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6">🦍 ApeBox Dashboard</h1>
      <p className="text-gray-400 mb-10">Manage your local AI and automation services</p>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {services.map(service => (
          <Card key={service.id} className="bg-gray-900 border-gray-800 shadow-lg hover:border-gray-700 transition-all">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-4xl mb-3 text-blue-400">{service.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{service.description}</p>
              <p className={`text-sm mb-4 flex items-center gap-2 ${
                service.status === 'running' ? 'text-green-400' : 
                service.status === 'loading' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  service.status === 'running' ? 'bg-green-400' :
                  service.status === 'loading' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`} />
                {service.status === 'running' ? 'En cours d\'exécution' :
                 service.status === 'loading' ? 'Chargement...' :
                 'Arrêté'}
              </p>

              <div className="flex gap-3">
                {service.status !== 'running' ? (
                  <Button 
                    onClick={() => updateServiceStatus(service.id, 'start')} 
                    disabled={loading[service.id]}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading[service.id] ? <Loader2 className="animate-spin" /> : <Play className="mr-2" />} 
                    Démarrer
                  </Button>
                ) : (
                  <Button 
                    variant="destructive" 
                    onClick={() => updateServiceStatus(service.id, 'stop')} 
                    disabled={loading[service.id]}
                  >
                    {loading[service.id] ? <Loader2 className="animate-spin" /> : <Square className="mr-2" />} 
                    Arrêter
                  </Button>
                )}
                <Button 
                  variant="secondary" 
                  disabled={service.status !== 'running'}
                  onClick={() => window.open(`http://localhost:${service.port}`, '_blank')}
                >
                  Ouvrir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
