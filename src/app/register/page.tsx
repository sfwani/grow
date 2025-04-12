import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[url('/images/wasteland-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      <div className="relative z-10">
        <RegisterForm />
      </div>
    </main>
  )
} 