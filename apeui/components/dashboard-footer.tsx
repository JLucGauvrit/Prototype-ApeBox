export function DashboardFooter() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>
              IP locale: <span className="font-mono text-foreground">192.168.1.100</span>
            </span>
            <span className="text-border">•</span>
            <span>Dernière mise à jour: il y a 2 minutes</span>
          </div>
          <span>ApeBox v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}
