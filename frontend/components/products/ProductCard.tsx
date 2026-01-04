import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div
            className='rounded bg-white shadow relative p-5'
        >
            <div className={`${!isAvailable(product.inventory) && 'opacity-50'} `}>
                <Image
                    src={getImagePath(product.image)}
                    alt={`Image of ${product.name}`}
                    width={400}
                    height={600}
                    priority
                />
                <div className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
                    <p className="text-gray-500">Disponibles: {product.inventory}</p>
                    <p className="text-2xl font-extrabold  text-gray-900">{formatCurrency(product.price)}</p>
                </div>
            </div>
            {
                isAvailable(product.inventory) ? (
                    <AddProductButton
                        product={product}
                    />
                ) : (
                    <p className="absolute top-0.5 left-0.5 transform -translate-x-0.5 -translate-y-0.5
                    bg-white opacity-60 w-full text-center py-5 text-2xl uppercase font-black ">Agotado</p>
                )
            }

        </div>
    )
}
