import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Product, ShoppingCart } from "./schemas"

interface Store {
    total : number
    contents: ShoppingCart[]
    addToCart: (product: Product) => void
}

export const useStore = create<Store>()(devtools((set, get) => ({
    total: 0,
    contents: [],
    addToCart: (product) => {
        console.log(`Added ${product.name} to cart!`)
    }
})))