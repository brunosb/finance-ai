'use client'

import { Button } from '@/app/_components/ui/button'
import { UpsertTransactionDialog } from '@/app/_components/upsert-transaction-dialog'
import { Transaction } from '@prisma/client'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

interface EditransactionButtonProps {
	transaction: Transaction
}

export const EditTransactionButton = ({
	transaction,
}: EditransactionButtonProps) => {
	const [dialogIsOpen, setDialogIsOpen] = useState(false)

	return (
		<>
			<Button
				variant={'ghost'}
				size={'icon'}
				className="text-muted-foreground space-x-1"
				onClick={() => setDialogIsOpen(true)}
			>
				<PencilIcon />
			</Button>
			<UpsertTransactionDialog
				isOpen={dialogIsOpen}
				setIsOpen={setDialogIsOpen}
				defaultValues={{
					...transaction,
					amount: Number(transaction.amount),
				}}
				transactionId={transaction.id}
			/>
		</>
	)
}
