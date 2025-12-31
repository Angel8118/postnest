import TransactionFilter from "@/components/transactions/TransactionFilter";
import Heading from "@/components/ui/Heading";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function SalesPage() {

  const queryClient = new QueryClient();
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  await queryClient.prefetchQuery({
    queryKey: ['sales', formattedDate],
    queryFn: async () => {}
  })
  console.log(formattedDate);

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