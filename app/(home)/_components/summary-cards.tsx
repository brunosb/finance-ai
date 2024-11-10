import {
	PiggyBankIcon,
	TrendingDownIcon,
	TrendingUpIcon,
	WalletIcon,
} from 'lucide-react'
import { SummaryCard } from './summary-card'

interface SummaryCardsProps {
	balance: number
	investmentsTotal: number
	depositsTotal: number
	expensesTotal: number
	userCanAddTransaction?: boolean
}

export const SummaryCards = async ({
	balance,
	investmentsTotal,
	depositsTotal,
	expensesTotal,
	userCanAddTransaction,
}: SummaryCardsProps) => {
	return (
		<div className="space-y-6">
			<SummaryCard
				title="Saldo"
				amount={balance}
				icon={<WalletIcon size={16} />}
				size="large"
				userCanAddTransaction={userCanAddTransaction}
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
