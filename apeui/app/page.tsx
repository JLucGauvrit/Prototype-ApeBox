"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFooter } from "@/components/dashboard-footer"
import { ServiceCard } from "@/components/service-card"
import { SystemMonitor } from "@/components/system-monitor"
import { Bot, Workflow, Cloud } from "lucide-react"
import { useState } from "react"

type ServiceStatus = "running" | "stopped"

interface Service {
  id: string
  icon: typeof Bot
  title: string
  description: string
  status: ServiceStatus
}

export default function DashboardPage() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "openwebui",
      icon: Bot,
      title: "Open WebUI",
      description: "Interface IA locale",
      status: "running",
    },
    {
      id: "n8n",
      icon: Workflow,
      title: "n8n Automations",
      description: "Workflows d'automatisation",
      status: "running",
    },
    {
      id: "nextcloud",
      icon: Cloud,
      title: "Nextcloud Drive",
      description: "Stockage et partage de fichiers",
      status: "stopped",
    },
  ])

  const handleStart = (id: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, status: "running" as ServiceStatus } : s)))
  }

  const handleStop = (id: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, status: "stopped" as ServiceStatus } : s)))
  }

  const handleOpen = (id: string) => {
    console.log(`Opening service: ${id}`)
    // In production, this would open the service URL
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Tableau de bord</h2>
            <p className="mt-1 text-muted-foreground">Gérez vos services IA et surveillez votre système</p>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="mb-4 text-lg font-semibold text-foreground">Services principaux</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    status={service.status}
                    onStart={() => handleStart(service.id)}
                    onStop={() => handleStop(service.id)}
                    onOpen={() => handleOpen(service.id)}
                  />
                ))}
              </div>
            </section>

            <SystemMonitor />
          </div>
        </div>
      </main>

      <DashboardFooter />
    </div>
  )
}
