'use client'

import { useState } from 'react'
import { useUpdateTransaction } from './useUpdateTransaction'

export function EditTransactionForm({
    transaction,
    onClose
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
    const { mutate } = useUpdateTransaction()

    const [title, setTitle] = useState(transaction.title)
    const [amount, setAmount] = useState(
        String(transaction.amount)
    )
    const [type, setType] = useState(transaction.type)

    function handleSubmit() {
        mutate(
            {
                id: transaction.id,
                title,
                amount: Number(amount),
                type
            },
            {
                onSuccess: () => {
                    onClose()
                }
            }
        )
    }

    return (
        <div className="space-y-2">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2"
            />

            <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2"
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border p-2"
            >
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
            </select>

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white p-2"
            >
                Salvar
            </button>
        </div>
    )
}