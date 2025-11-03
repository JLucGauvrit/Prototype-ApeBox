"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Star, Check } from "lucide-react"
import Image from "next/image"

interface WorkflowCardProps {
  name: string
  description: string
  category: string
  author: string
  downloads: number
  rating: number
  installed: boolean
  imageQuery: string
  onInstall: () => void
  onUninstall: () => void
}

export function WorkflowCard({
  name,
  description,
  category,
  author,
  downloads,
  rating,
  installed,
  imageQuery,
  onInstall,
  onUninstall,
}: WorkflowCardProps) {
  const categoryColors: Record<string, string> = {
    automation: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    ai: "bg-primary/10 text-primary border-primary/20",
    productivity: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    integration: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:border-primary/50">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={`/.jpg?height=192&width=384&query=${encodeURIComponent(imageQuery)}`}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {installed && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-success px-2 py-1 text-xs font-medium text-success-foreground">
            <Check className="h-3 w-3" />
            Installé
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="outline" className={categoryColors[category] || "bg-secondary/10"}>
            {category}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Par {author}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium text-foreground">{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{downloads.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {installed ? (
          <Button variant="outline" size="sm" onClick={onUninstall} className="w-full bg-transparent">
            Désinstaller
          </Button>
        ) : (
          <Button size="sm" onClick={onInstall} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Installer
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
