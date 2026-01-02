"use client"

import { useState } from "react";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";
import { getSalesByDate } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import TransactionSummary from "./TransactionSummary";
import { formatCurrency } from "@/src/utils";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TransactionFilter() {

    const [date, setDate] = useState<Value>(new Date());

    const formattedDate = format(date as Date, 'yyyy-MM-dd');
    const { data, isLoading, error } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: async () => getSalesByDate(formattedDate),
    })

    const total = data?.reduce((total, transaction) => total + Number(transaction.total), 0) || 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
            <div className="lg:sticky lg:top-15"> 
                <Calendar
                    value={date}
                    onChange={setDate}
                    locale="es"
                />
            </div>

            <div>
                {isLoading && <p className="text-lg text-center">Cargando...</p>}
                {data ?  data.length ? data.map(transaction => (
                    <TransactionSummary key={transaction.id}
                        transaction={transaction} />
                )) : <p className="text-lg text-center">No hay ventas en esta fecha.</p> : null}

                <p className="my-5 text-lg font-bold text-right">Total del día: {''}
                    <span className="font-normal">{formatCurrency(total)}</span>
                </p>
            </div>
        </div>
    )
}
