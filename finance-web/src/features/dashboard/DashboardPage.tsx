'use client'

import { useRouter } from "next/navigation"
import { useSummary } from "./useSummary"
import { useEffect } from "react"

export default function DashboardPage() {
    const { data, isLoading, isError } = useSummary()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) router.push('/login')
    }, [router])


    if (isLoading) return <p>Carregando...</p>
    if (isError) return <p>Erro ao carregar</p>

    return (
        <div style={{ padding: 20 }}>
            <h1>Dashboard</h1>

            <div className="grid grid-cols-3 gap-4">
                <p className="p-4 bg-green-200">Receitas: {data.income}</p>
                <p className="p-4 bg-red-200">Despesas: {data.expense}</p>
                <p className="p-4 bg-blue-200">Saldo: {data.balance}</p>
            </div>
        </div>
    )
}