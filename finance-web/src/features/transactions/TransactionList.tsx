/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect } from "react"
import { useTransactions } from "./useTransactions"
import { useRouter } from "next/navigation"

const TransactionList = () => {
    const { data, isLoading, isError } = useTransactions()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) router.push('/login')
    }, [router])

    if (isLoading) return <p>Carregando...</p>
    if (isError) return <p>Erro ao carregar</p>
    return (
        <div className="space-y-2 mt-6">
            {data.map((transaction: any) => (
                <div
                    key={transaction.id}
                    className="p-4 bg-white shadow rounded flex justify-between"
                >
                    <span>{transaction.title}</span>
                    <span
                        className={
                            transaction.type === 'income'
                                ? 'text-green-600'
                                : 'text-red-600'
                        }
                    >
                        {transaction.type === 'income' ? "+" : "-"}
                        {transaction.amount}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default TransactionList