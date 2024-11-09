'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/app/_components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'

const MONTH_OPTIONS = [
	{ label: 'January', value: '01' },
	{ label: 'February', value: '02 ' },
	{ label: 'March', value: '03' },
	{ label: 'April', value: '04' },
	{ label: 'May', value: '05' },
	{ label: 'June', value: '06 ' },
	{ label: 'July', value: '07 ' },
	{ label: 'August', value: '08' },
	{ label: 'September', value: '09' },
	{ label: 'October', value: '10' },
	{ label: 'November', value: '11' },
	{ label: 'December', value: '12' },
]

export const TimeSelect = () => {
	const { push } = useRouter()

	const searchParams = useSearchParams()
	const month = searchParams.get('month')

	const handleMonthChange = (month: string) => {
		push(`/?month=${month}`)
	}

	return (
		<Select
			onValueChange={(value) => handleMonthChange(value)}
			defaultValue={month ?? ''}
		>
			<SelectTrigger className="rounded-full w-[250px]">
				<SelectValue placeholder="Mês" />
			</SelectTrigger>
			<SelectContent>
				{MONTH_OPTIONS.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
