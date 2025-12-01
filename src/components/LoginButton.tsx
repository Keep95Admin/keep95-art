// src/components/LoginButton.tsx
import Link from 'next/link'

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="bg-white text-black px-8 py-3 rounded-full text-lg font-bold hover:scale-105 transition"
    >
      Login
    </Link>
  )
}