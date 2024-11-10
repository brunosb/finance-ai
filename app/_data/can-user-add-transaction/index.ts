import { auth, clerkClient } from '@clerk/nextjs/server'
import { getCurrentMonthTransactions } from '../get-current-month-transactions'

export const canUserAddTransaction = async () => {
	const { userId } = await auth()
	if (!userId) {
		throw new Error('User not authenticated')
	}

	const user = await clerkClient().users.getUser(userId)
	if (user.publicMetadata.subscriptionPlan === 'premium') {
		return true
	}

	const currentMothTransactions = await getCurrentMonthTransactions()
	return currentMothTransactions < 10
}
