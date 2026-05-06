/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect } from "react"
import { useTransactions } from "./useTransactions"
import { useRouter } from "next/navigation"
import { useDeleteTransaction } from "./useDeleteTransaction"

const TransactionList = () => {
    const { data, isLoading, isError } = useTransactions()
    const { mutate: deleteTransaction } = useDeleteTransaction()
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
                    <div>
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

                    <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-red-500"
                    >
                        Deletar
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TransactionList