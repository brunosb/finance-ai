import { db } from '@/app/_lib/prisma'
import {
	PiggyBankIcon,
	TrendingDownIcon,
	TrendingUpIcon,
	WalletIcon,
} from 'lucide-react'
import { SummaryCard } from './summary-card'

interface SummaryCardsProps {
	month: string
}

export const SummaryCards = async ({ month }: SummaryCardsProps) => {
	const where = {
		date: {
			gte: new Date(`2024-${month}-01`),
			lt: new Date(`2024-${month}-31`),
		},
	}

	const depositsTotal =
		Number(
			(
				await db.transaction.aggregate({
					where: {
						...where,
						type: 'DEPOSIT',
					},
					_sum: {
						amount: true,
					},
				})
			)?._sum?.amount,
		) || 0
	const investmentsTotal =
		Number(
			(
				await db.transaction.aggregate({
					where: {
						...where,
						type: 'INVESTMENT',
					},
					_sum: {
						amount: true,
					},
				})
			)?._sum?.amount,
		) || 0
	const expensesTotal =
		Number(
			(
				await db.transaction.aggregate({
					where: {
						...where,
						type: 'EXPENSE',
					},
					_sum: {
						amount: true,
					},
				})
			)?._sum?.amount,
		) || 0
	const balance = depositsTotal - investmentsTotal - expensesTotal

	return (
		<div className="space-y-6">
			<SummaryCard
				title="Saldo"
				amount={balance}
				icon={<WalletIcon size={16} />}
				size="large"
			/>

			<div className="grid grid-cols-3 gap-6">
				<SummaryCard
					title="Investido"
					amount={investmentsTotal}
					icon={<PiggyBankIcon size={16} />}
				/>
				<SummaryCard
					title="Receita"
					amount={depositsTotal}
					icon={<TrendingUpIcon size={16} className="text-primary" />}
				/>
				<SummaryCard
					title="Despesas"
					amount={expensesTotal}
					icon={<TrendingDownIcon size={16} className="text-red-500" />}
				/>
			</div>
		</div>
	)
}
