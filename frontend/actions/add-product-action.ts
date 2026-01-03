"use server"

import { ProductResponseSchema } from "@/src/schemas";
import { error } from "console";
import { success } from "zod";

type ActionStateType = {
    errors: string[]
    success: string;
}

export async function addProduct(prevState: ActionStateType, formData: FormData) {
    
    const product = ProductResponseSchema.safeParse({
        name: formData.get('name'),
        price: Number(formData.get('price')),
        inventory: Number(formData.get('inventory')),
        categoryId: Number(formData.get('categoryId')),
    })
    if (!product.success) {
        return {
            errors: product.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    return {
        errors: [],
        success: ''
    }

}