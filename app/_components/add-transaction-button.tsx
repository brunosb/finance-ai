'use client'

import { ArrowDownUpIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'
import { UpsertTransactionDialog } from './upsert-transaction-dialog'

interface AddTransactionButtonProps {
	userCanAddTransaction?: boolean
}

export const AddTransactionButton = ({
	userCanAddTransaction,
}: AddTransactionButtonProps) => {
	const [dialogIsOpen, setDialogIsOpen] = useState(false)

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="rounded-full font-bold"
							onClick={() => setDialogIsOpen(true)}
							disabled={!userCanAddTransaction}
						>
							Adicionar transação
							<ArrowDownUpIcon className="ml-2" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						{!userCanAddTransaction &&
							'Você atingiu o limite de transações do mês. Atualize seu plano para adicionar mais transações.'}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<UpsertTransactionDialog
				isOpen={dialogIsOpen}
				setIsOpen={setDialogIsOpen}
			/>
		</>
	)
}
