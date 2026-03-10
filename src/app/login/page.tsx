import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-charcoal-700 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-500 dark:text-teal-300 mb-2">🎵 MusicNerds</h1>
          <p className="text-slate-500 dark:text-gray-300/70">Your social platform for music lovers</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
