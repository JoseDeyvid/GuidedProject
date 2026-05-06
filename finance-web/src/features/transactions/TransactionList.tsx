/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react"
import { useTransactions } from "./useTransactions"
import { useRouter } from "next/navigation"
import { useDeleteTransaction } from "./useDeleteTransaction"
import { EditTransactionForm } from "./EditTransactionForm"

const TransactionList = () => {
    const [search, setSearch] = useState('')
    const [type, setType] = useState('')
    const { data, isLoading, isError } = useTransactions({ search, type })
    const { mutate: deleteTransaction } = useDeleteTransaction()
    const router = useRouter()

    const [editingId, setEditingId] = useState<string | null>(null)

    const handleDeleteTransaction = (id: string) => {
        const confirmed = confirm(
            'Deseja realmente deletar essa transação?'
        )

        if (confirmed)
            deleteTransaction(id)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) router.push('/login')
    }, [router])

    if (isLoading) return <p>Carregando...</p>
    if (isError) return <p>Erro ao carregar</p>
    return (
        <div className="space-y-2 mt-6">
            <input
                placeholder="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 w-full"
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border p-2 w-full"
            >
                <option value="">Todos</option>
                <option value="income">Receitas</option>
                <option value="expense">Despesas</option>
            </select>
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

                    {
                        editingId === transaction.id ? (
                            <EditTransactionForm
                                transaction={transaction}
                                onClose={() => setEditingId(null)}
                            />
                        ) : (
                            <>
                                <p>{transaction.title}</p>

                                <button onClick={() => setEditingId(transaction.id)}>
                                    Editar
                                </button>
                            </>
                        )
                    }

                    <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
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