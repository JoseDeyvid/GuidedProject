'use client'

import { useLogin } from '@/features/auth/useLogin'
import { useState } from 'react'

export default function LoginPage() {
    const { mutate, isPending } = useLogin()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin() {
        mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    console.log("Got it")
                    localStorage.setItem('token', data.token)
                }
            }
        )
    }

    return (
        <div className='bg-amber-300'>
            <input onChange={(e) => setEmail(e.target.value)} />
            <input onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} disabled={isPending}>
                Login
            </button>
        </div>
    )
}