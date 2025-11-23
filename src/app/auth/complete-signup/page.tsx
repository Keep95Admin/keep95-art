// src/app/auth/complete-signup/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function CompleteSignup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) setLoading(false)
    }
    checkUser()
  }, [])

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setMessage('Session expired. Please start over.')
      setSubmitting(false)
      return
    }

    // 1. Check if username is already taken
    const { data: existing } = await supabase
      .from('consumers')
      .select('id')
      .eq('username', username.trim())
      .single()

    if (existing) {
      setMessage('Username already taken. Please choose another.')
      setSubmitting(false)
      return
    }

    // 2. Set password + username
    const { error: authError } = await supabase.auth.updateUser({
      email: user.email!,
      password,
      data: { username: username.trim() },
    })

    if (authError) {
      setMessage('Error: ' + authError.message)
      setSubmitting(false)
      return
    }

    // 3. Create consumer row
    const { error: rowError } = await supabase
      .from('consumers')
      .upsert({
        id: user.id,
        email: user.email!,
        username: username.trim(),
        credits_cents: 0,
        joined_at: new Date().toISOString(),
      }, { onConflict: 'id' })

    if (rowError) {
      console.error(rowError)
      setMessage('Account created but profile failed. Contact support.')
    } else {
      router.push('/drops')
    }

    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center space-y-12">

        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-black text-white">
            Welcome to Keep95
          </h1>
          <p className="text-xl text-white/80">
            One last step — finish setting up your collector account.
          </p>
        </div>

        <form onSubmit={handleComplete} className="space-y-8">
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
            maxLength={20}
            pattern="[A-Za-z0-9_]+"
            title="Only letters, numbers, and underscores"
            className="w-full px-8 py-6 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 text-xl focus:outline-none focus:border-white transition"
          />

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-8 py-6 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 text-xl focus:outline-none focus:border-white transition"
          />

          <button
            type="submit"
            disabled={submitting || !username || !password}
            className="w-full bg-white text-black py-6 rounded-full text-2xl font-black hover:scale-105 transition shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating Account...' : 'Complete Account'}
          </button>
        </form>

        {message && (
          <p className={`text-lg font-medium ${message.includes('taken') ? 'text-yellow-400' : message.includes('created') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </div>
    </main>
  )
}