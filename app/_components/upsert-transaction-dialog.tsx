import { z } from 'zod'
import {
	TRANSACTION_CATEGORY_OPTIONS,
	TRANSACTION_PAYMENT_METHOD_OPTIONS,
	TRANSACTION_TYPE_OPTIONS,
} from '../_constants/transactions'
import { MoneyInput } from './money-input'
import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

import { zodResolver } from '@hookform/resolvers/zod'
import {
	TransactionCategory,
	TransactionPaymentMethod,
	TransactionType,
} from '@prisma/client'
import { useForm } from 'react-hook-form'
import { UpsertTransaction } from '../_actions/upsert-transaction'

interface UpsertTransactionDialogProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	defaultValues?: FormSchema
	transactionId?: string
}

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Nome é obrigatório',
	}),
	amount: z
		.number({
			required_error: 'Valor é obrigatório',
		})
		.positive({
			message: 'Valor deve ser positivo ',
		}),
	type: z.nativeEnum(TransactionType, {
		required_error: 'Tipo é obrigatório',
	}),
	category: z.nativeEnum(TransactionCategory, {
		required_error: 'Categoria é obrigatória',
	}),
	paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
		required_error: 'Método de pagamento é obrigatório',
	}),
	date: z.date({
		required_error: 'Data é obrigatória',
	}),
})

type FormSchema = z.infer<typeof formSchema>

export const UpsertTransactionDialog = ({
	isOpen,
	setIsOpen,
	defaultValues,
	transactionId,
}: UpsertTransactionDialogProps) => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues || {
			amount: 1,
			category: TransactionCategory.OTHER,
			date: new Date(),
			name: '',
			paymentMethod: TransactionPaymentMethod.CASH,
			type: TransactionType.EXPENSE,
		},
	})

	const onSubmit = async (data: FormSchema) => {
		try {
			await UpsertTransaction({ ...data, id: transactionId })
			setIsOpen(false)
			form.reset()
		} catch (e) {
			console.error(e)
		}
	}

	const isUpdate = Boolean(transactionId)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open)
				if (!open) {
					form.reset()
				}
			}}
		>
			<DialogTrigger asChild></DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogHeader>
						<DialogTitle>
							{isUpdate ? 'Atualizar' : 'Criar'} transação
						</DialogTitle>
					</DialogHeader>
					<DialogDescription>Insira as informações abaixo</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Digite o nome" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Valor</FormLabel>
									<FormControl>
										<MoneyInput
											placeholder="Digite o valor"
											value={field.value}
											onValueChange={({ floatValue }) => {
												field.onChange(floatValue)
											}}
											onBlur={field.onBlur}
											disabled={field.disabled}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione um tipo" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{TRANSACTION_TYPE_OPTIONS.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Categoria</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione a categoria" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{TRANSACTION_CATEGORY_OPTIONS.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="paymentMethod"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Método de pagamento</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione um método de pagamento" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Data</FormLabel>
									<DatePicker value={field.value} onChange={field.onChange} />
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant={'outline'}>
									Cancelar
								</Button>
							</DialogClose>
							<Button type="submit">
								{isUpdate ? 'Atualizar' : 'Adicionar'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
