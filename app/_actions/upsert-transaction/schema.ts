import {
	TransactionCategory,
	TransactionPaymentMethod,
	TransactionType,
} from '@prisma/client'
import { z } from 'zod'

// Schema for the upsert transaction action
export const UpsertTransactionSchema = z.object({
	name: z.string().min(1),
	amount: z.number().positive(),
	type: z.nativeEnum(TransactionType),
	category: z.nativeEnum(TransactionCategory),
	paymentMethod: z.nativeEnum(TransactionPaymentMethod),
	date: z.date(),
})
