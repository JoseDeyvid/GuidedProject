'use client'

import { useState } from "react"
import { useCreateTransaction } from "./useCreateTransaction"

export function CreateTransactionForm() {
    const { mutate, isPending } = useCreateTransaction()

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('income')

    const handleSubmit = () => {
        mutate(
            { title, amount: Number(amount), type },

        )

        setTitle('')
        setAmount('')
        setType('income')
    }

    return (
        <div className="mt-6 space-y-2">
            <input
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full"
            />

            <input
                placeholder="Valor"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full"
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border p-2 w-full"
            >
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
            </select>

            <button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-blue-500 text-white p-2 w-full"
            >
                {isPending ? "Criando..." : "Criar"}
            </button>

        </div>
    )
}