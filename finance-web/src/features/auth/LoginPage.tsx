'use client'

import { useLogin } from '@/features/auth/useLogin'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const { mutate, isPending } = useLogin()

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) router.push('/dashboard')
    }, [router])

    function handleLogin() {
        mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    localStorage.setItem('token', data.token)
                    router.push('/dashboard')
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }, onError: (error: any) => {
                    console.log("Erro encontrado => ", error.response?.data.message)
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