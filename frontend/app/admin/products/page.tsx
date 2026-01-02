import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { ProductResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import { redirect } from "next/navigation";

async function getProducts(take: number, skip: number) {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`; 
  const req = await fetch(url);
  const json = await req.json();
  const data = ProductResponseSchema.parse(json);
  return {
    products: data.products,
    total: data.total
  }
}

type SearchParams = Promise<{page: string}> 

export default async function ProductsPage({searchParams}: {searchParams: SearchParams}) {

  const {page} = await searchParams;

  if (!isValidPage(+page)) redirect('/admin/products?page=1');

  const productsPerPage = 10;
  const skip = ((+page || 1) -1) * productsPerPage;

  const { products, total } = await getProducts(productsPerPage, skip);
  return (
    <>
    <Heading>Administrar Productos</Heading>
    <ProductsTable
      products={products}
    />

    </>
  )
}
