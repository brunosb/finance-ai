import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AddTransactionButton } from '../_components/add-transaction-button'
import { Navbar } from '../_components/navbar'
import { DataTable } from '../_components/ui/data-table'
import { db } from '../_lib/prisma'
import { transactionsColumns } from './_columns'

const TransactionsPage = async () => {
	const { userId } = await auth()
	if (!userId) {
		redirect('/login')
	}

	const transactions = await db.transaction.findMany({
		where: {
			userId,
		},
	})

	return (
		<>
			<Navbar />
			<div className="p-6 space-y-6">
				<div className="flex w-full justify-between items-center">
					<h1 className="text-2xl font-bold">Transações</h1>
					<AddTransactionButton />
				</div>

				<DataTable columns={transactionsColumns} data={transactions} />
			</div>
		</>
	)
}

export default TransactionsPage
