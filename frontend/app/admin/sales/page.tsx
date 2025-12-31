import TransactionFilter from "@/components/transactions/TransactionFilter";
import Heading from "@/components/ui/Heading";

export default function SalesPage() {
  return (
    <>
    <Heading>Ventas</Heading>
    <p className="text-lg">En esta seccion apareceran las ventas, utiliza el calendario para filtrar por fecha</p>

    <TransactionFilter />
    
    </>
  )
}