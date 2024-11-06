import { Badge } from '@/app/_components/ui/badge'
import { TransactionType } from '@prisma/client'
import { CircleIcon } from 'lucide-react'

interface TransactionTypeBadgeProps {
	type: TransactionType
}

export const TransactionTypeBadge = ({ type }: TransactionTypeBadgeProps) => {
	if (type === TransactionType.DEPOSIT) {
		return (
			<Badge className="bg-muted text-primary hover:bg-muted font-bold">
				<CircleIcon className="fill-primary mr-2" size={10} />
				Depósito
			</Badge>
		)
	}
	if (type === TransactionType.EXPENSE) {
		return (
			<Badge className="font-bold text-danger bg-danger bg-opacity-10">
				<CircleIcon className="fill-danger mr-2" size={10} />
				Despesa
			</Badge>
		)
	}

	return (
		<Badge className="font-bold text-white bg-white bg-opacity-10">
			<CircleIcon className="fill-white mr-2" size={10} />
			Investimento
		</Badge>
	)
}
