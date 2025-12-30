function PageHeader({ title, subtitle }: { title: string, subtitle: string}) {

            return (<div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground">{subtitle}</p>
              </div>
            </div>)
}

export { PageHeader }