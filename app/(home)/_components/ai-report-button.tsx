'use client'

import { Button } from '@/app/_components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/_components/ui/dialog'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { BotIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Markdown from 'react-markdown'
import { generateAiReport } from '../_actions/generate-ai-report'

interface AiReportButtonProps {
	hasPremiumPlan: boolean
	month: string
}

export const AiReportButton = ({
	month,
	hasPremiumPlan,
}: AiReportButtonProps) => {
	const [report, setReport] = useState<string | null>(null)
	const [reportIsLoading, setReportIsLoading] = useState(false)

	const handleGenerateReport = async () => {
		try {
			setReportIsLoading(true)
			const aiReport = await generateAiReport({ month })
			setReport(aiReport)
		} catch (e) {
			console.error(e)
		} finally {
			setReportIsLoading(false)
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'ghost'}>
					Relatório IA
					<BotIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[600px]">
				{hasPremiumPlan ? (
					<>
						<DialogHeader>
							<DialogTitle>Relatório IA</DialogTitle>
							<DialogDescription>
								Use inteligência artificial para gerar um relatório com insights
								sobre suas finanças.
							</DialogDescription>
						</DialogHeader>
						<ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
							<Markdown>{report}</Markdown>
						</ScrollArea>
						<DialogFooter>
							<DialogClose>
								<Button variant="ghost">Cancelar</Button>
							</DialogClose>
							<Button onClick={handleGenerateReport} disabled={reportIsLoading}>
								{reportIsLoading && <Loader2Icon className="animate-spin" />}
								Gerar relatório
							</Button>
						</DialogFooter>
					</>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>Relatório IA</DialogTitle>
							<DialogDescription>
								Você precisa de um plano premium para gerar relatórios com
								inteligência artificial.
							</DialogDescription>
						</DialogHeader>

						<DialogFooter>
							<DialogClose>
								<Button variant="ghost">Cancelar</Button>
							</DialogClose>
							<Button asChild>
								<Link href={'/subscriptions'}>Assinar plano</Link>
							</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}
