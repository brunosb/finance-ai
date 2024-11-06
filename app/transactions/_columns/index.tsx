'use client'

import { Button } from '@/app/_components/ui/button'
import {
	TRANSACTION_CATEGORY_LABELS,
	TRANSACTION_PAYMENT_METHOD_LABELS,
} from '@/app/_constants/transactions'
import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { TransactionTypeBadge } from '../_components/type-badge'

export const transactionsColumns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'name',
		header: 'Nome',
	},
	{
		accessorKey: 'type',
		header: 'Tipo',
		cell: ({ row: { original: transaction } }) => (
			<TransactionTypeBadge type={transaction.type} />
		),
	},
	{
		accessorKey: 'category',
		header: 'Categoria',
		cell: ({ row: { original: transaction } }) =>
			TRANSACTION_CATEGORY_LABELS[transaction.category],
	},
	{
		accessorKey: 'paymentMethod',
		header: 'Método de pagamento',
		cell: ({ row: { original: transaction } }) =>
			TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
	},
	{
		accessorKey: 'date',
		header: 'Data',
		cell: ({ row: { original: transaction } }) =>
			new Date(transaction.date).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
	},
	{
		accessorKey: 'amount',
		header: 'Valor',
		cell: ({ row: { original: transaction } }) =>
			new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			}).format(Number(transaction.amount)),
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: () => (
			<div>
				<Button
					variant={'ghost'}
					size={'icon'}
					className="text-muted-foreground space-x-1"
				>
					<PencilIcon />
				</Button>
				<Button
					variant={'ghost'}
					size={'icon'}
					className="text-muted-foreground space-x-1"
				>
					<TrashIcon />
				</Button>
			</div>
		),
	},
]
