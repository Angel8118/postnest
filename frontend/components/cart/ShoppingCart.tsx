"use client"
import { useStore } from "@/src/store"
import ShoppingCartItem from "./ShoppingCartItem"

export default function ShoppingCart() {

  const contents = useStore((state) => state.contents)

  return (
    <>
    {contents.length? (
      <>
        <h2 className="font-bold text-4xl text-gray-900">Resumen de Ventas</h2>

        <ul
          role="list" className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
          {contents.map((item) => (
            <ShoppingCartItem 
            key={item.productId} 
            item={item} />
          ))}
        </ul>
      </>
    ) : (
      <h2 className="text-center font-bold text-4xl text-gray-900">El carrito está vacío</h2>
    )}
    </>
  )
}
