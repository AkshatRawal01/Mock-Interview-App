import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">MockMate</span>
          <p className="text-gray-600 text-center text-lg">Create your account and start mastering your interview skills with AI-powered practice!</p>
        </div>
        <SignUp appearance={{ elements: { card: 'shadow-none', formButtonPrimary: 'bg-blue-600 hover:bg-blue-700' } }} />
      </div>
    </div>
  )
}  