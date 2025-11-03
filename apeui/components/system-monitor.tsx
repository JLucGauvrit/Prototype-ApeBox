import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, HardDrive, Thermometer, Zap } from "lucide-react"

interface SystemMetric {
  icon: React.ElementType
  label: string
  value: string
  percentage: number
  color: string
}

export function SystemMonitor() {
  const metrics: SystemMetric[] = [
    {
      icon: Cpu,
      label: "CPU",
      value: "45%",
      percentage: 45,
      color: "bg-chart-1",
    },
    {
      icon: Zap,
      label: "GPU",
      value: "62%",
      percentage: 62,
      color: "bg-chart-2",
    },
    {
      icon: HardDrive,
      label: "Mémoire",
      value: "8.2 / 16 Go",
      percentage: 51,
      color: "bg-chart-3",
    },
    {
      icon: Thermometer,
      label: "Température",
      value: "58°C",
      percentage: 58,
      color: "bg-chart-4",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Surveillance système</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{metric.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{metric.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full transition-all ${metric.color}`} style={{ width: `${metric.percentage}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
