import Button from '@/components/Button'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 bg-dark-900">
      <div className="text-center max-w-md">
        <p className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3">404</p>
        <h1 className="text-4xl font-bold mb-3">Page not found</h1>
        <p className="text-dark-300 mb-8">That route does not exist. The work is under Case studies.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/">Home</Button>
          <Button href="/case-studies" variant="secondary">
            Case studies
          </Button>
        </div>
      </div>
    </main>
  )
}
