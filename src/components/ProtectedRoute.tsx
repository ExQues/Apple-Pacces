import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6]">
        <div className="flex flex-col items-center gap-4">
          <div className="apple-spinner" />
          <p className="text-sm font-medium text-zinc-400">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
