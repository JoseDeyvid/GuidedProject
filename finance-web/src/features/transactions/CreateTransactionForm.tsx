'use client'

import { useCreateTransaction } from './useCreateTransaction'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
    createTransactionSchema,
    CreateTransactionFormData,
} from './schemas/createTransactionSchema'

export function CreateTransactionForm() {
    const { mutate, isPending } =
        useCreateTransaction()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateTransactionFormData>({
        resolver: zodResolver(
            createTransactionSchema
        ),

        defaultValues: {
            type: 'income',
        },
    })

    function onSubmit(
        data: CreateTransactionFormData
    ) {
        mutate(data)

        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-2"
        >
            <input
                placeholder="Título"
                {...register('title')}
                className="border p-2 w-full"
            />

            {errors.title && (
                <p className="text-red-500 text-sm">
                    {errors.title.message}
                </p>
            )}

            <input
                type="number"
                placeholder="Valor"
                {...register('amount', {
                    valueAsNumber: true,
                })}
                className="border p-2 w-full"
            />

            {errors.amount && (
                <p className="text-red-500 text-sm">
                    {errors.amount.message}
                </p>
            )}

            <select
                {...register('type')}
                className="border p-2 w-full"
            >
                <option value="income">
                    Receita
                </option>

                <option value="expense">
                    Despesa
                </option>
            </select>

            {errors.type && (
                <p className="text-red-500 text-sm">
                    {errors.type.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 text-white p-2 w-full disabled:opacity-50"
            >
                {isPending
                    ? 'Criando...'
                    : 'Criar'}
            </button>
        </form>
    )
}