import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Navbar } from '../_components/navbar'

const SubscriptionPage = async () => {
	const { userId } = await auth()
	if (!userId) {
		redirect('/login')
	}

	return (
		<>
			<Navbar />
			<div className="p-6 space-y-6">
				<div className="flex w-full justify-between items-center">
					<h1 className="text-2xl font-bold">Assinatura</h1>
				</div>
			</div>
		</>
	)
}

export default SubscriptionPage
