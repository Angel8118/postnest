import { submitOrder } from "@/actions/submit-order-action"
import { useActionState } from "react"
import { useStore } from "@/src/store"


export default function SubmitOrderForm() {

    const total = useStore((state) => state.total)
    const coupon = useStore((state) => state.coupon.name)
    const contents = useStore((state) => state.contents)
    const order = {
        total,
        coupon,
        contents
    }
    const submitOrderWithData = submitOrder.bind(null, order)

    const [state, dispatch] = useActionState(submitOrderWithData, {
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
