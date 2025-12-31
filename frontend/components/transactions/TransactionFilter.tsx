"use client"

import { useState } from "react";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TransactionFilter() {

    const [date, setDate] = useState<Value>(new Date());

    const formattedDate = format(date as Date, 'yyyy-MM-dd');
    console.log(formattedDate);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <div>
            <Calendar 
            value={date}
            onChange={setDate}
            />
        </div>

        <div>
2
        </div>
    </div>
  )
}
