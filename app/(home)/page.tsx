import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'
import { Navbar } from '../_components/navbar'
import { getDashboard } from '../_data/get-dashboard'
import { ExpensesPerCategory } from './_components/expenses-per-category'
import { LastTransactions } from './_components/last-transactions'
import { SummaryCards } from './_components/summary-cards'
import { TimeSelect } from './_components/time-select'
import { TransactionsPieChart } from './_components/transactions-pie-chart'

interface HomeProps {
	searchParams: {
		month: string
	}
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
	const { userId } = await auth()

	if (!userId) {
		redirect('/login')
	}

	const monthIsValid = !month || !isMatch(month, 'MM')
	if (monthIsValid) {
		redirect(`?month=${new Date().getMonth() + 1}`)
	}

	const dashboard = await getDashboard(month)

	return (
		<>
			<Navbar />
			<div className="p-6 space-y-6 flex flex-col overflow-hidden">
				<div className="flex justify-between">
					<h1 className="text-2xl font-bold">Dashboard</h1>
					<TimeSelect />
				</div>

				<div className="grid grid-cols-[2fr,1fr] h-full gap-6 overflow-hidden">
					<div className="flex flex-col gap-6 overflow-hidden">
						<SummaryCards {...dashboard} />

						<div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
							<TransactionsPieChart {...dashboard} />
							<ExpensesPerCategory
								expensesPerCategory={dashboard.totalExpensePerCategory}
							/>
						</div>
					</div>

					<LastTransactions lastTransactions={dashboard.lastTransactions} />
				</div>
			</div>
		</>
	)
}

export default Home
