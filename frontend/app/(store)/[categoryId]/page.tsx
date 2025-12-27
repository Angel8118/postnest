type Params = Promise<{ categoryId: string }>

async function getProducts(categoryId:string) {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;
    const req = await fetch(url, {cache: 'no-store'});
    const json = await req.json();
    return json;
}

export default async function StorePage({ params }: { params: Params }) {
    const { categoryId } = await params
    const products =await getProducts(categoryId);
    return (
    <div>StorePage</div>
  )
}