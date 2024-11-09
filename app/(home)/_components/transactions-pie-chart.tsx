'use client'

import { Pie, PieChart } from 'recharts'

import { Card, CardContent } from '@/app/_components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/app/_components/ui/chart'
import { TransactionPercentagePerType } from '@/app/_data/get-dashboard/types'
import { TransactionType } from '@prisma/client'
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { PercentageItem } from './percentageItem'

const chartConfig = {
	[TransactionType.INVESTMENT]: {
		label: 'Investido',
		color: '#ffffff',
	},
	[TransactionType.DEPOSIT]: {
		label: 'Receita',
		color: '#55b02e',
	},
	[TransactionType.EXPENSE]: {
		label: 'Despesa',
		color: '#e93030',
	},
} satisfies ChartConfig

interface TransactionsPieChartProps {
	investmentsTotal: number
	depositsTotal: number
	expensesTotal: number
	typesPercentage: TransactionPercentagePerType
}

export const TransactionsPieChart = ({
	investmentsTotal,
	depositsTotal,
	expensesTotal,
	typesPercentage,
}: TransactionsPieChartProps) => {
	const chartData = [
		{ type: TransactionType.DEPOSIT, amount: depositsTotal, fill: '#55b02e' },
		{
			type: TransactionType.INVESTMENT,
			amount: investmentsTotal,
			fill: '#ffffff',
		},
		{ type: TransactionType.EXPENSE, amount: expensesTotal, fill: '#e93030' },
	]

	return (
		<Card className="flex flex-col p-12">
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="amount"
							nameKey="type"
							innerRadius={60}
						/>
					</PieChart>
				</ChartContainer>

				<div className="space-y-2">
					<PercentageItem
						icon={<TrendingUpIcon size={16} className="text-primary" />}
						title="Receita"
						value={typesPercentage[TransactionType.DEPOSIT]}
					/>
					<PercentageItem
						icon={<TrendingDownIcon size={16} className="text-red-500" />}
						title="Despesa"
						value={typesPercentage[TransactionType.EXPENSE]}
					/>
					<PercentageItem
						icon={<PiggyBankIcon size={16} />}
						title="Investido"
						value={typesPercentage[TransactionType.INVESTMENT]}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
