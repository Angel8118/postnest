import { submitOrder } from "@/actions/submit-order-action"
import { useActionState } from "react"
import { useStore } from "@/src/store"


export default function SubmitOrderForm() {

    const total = useStore((state) => state.total)
    const coupon = useStore((state) => state.coupon)
    const contents = useStore((state) => state.contents)
    const order = {
        total,
        coupon,
        contents
    }
    console.log(order)

    const [state, dispatch] = useActionState(submitOrder, {
        errors : [],
        success: ''
    })
  return (
    <>
    <form action={dispatch}>
        <input type="submit"
        className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-bold uppercase p-3"
        value="Confirmar Compra"
        />
    </form>
    </>
  )
}
