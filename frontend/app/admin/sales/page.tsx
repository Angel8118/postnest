import TransactionFilter from "@/components/transactions/TransactionFilter";
import Heading from "@/components/ui/Heading";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function SalesPage() {

  const queryClient = new QueryClient();
  

  return (
    <>
      <Heading>Ventas</Heading>
      <p className="text-lg">En esta seccion apareceran las ventas, utiliza el calendario para filtrar por fecha</p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>


    </>
  )
}