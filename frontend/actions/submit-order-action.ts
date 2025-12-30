"use server"
import { OrderSchema } from "@/src/schemas"

export async function submitOrder(data: unknown) {
    const order = OrderSchema.parse(data)
    console.log(order)

    return {
        success: '',
        errors: []
    }
}