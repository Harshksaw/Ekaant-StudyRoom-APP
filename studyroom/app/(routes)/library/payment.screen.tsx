import store from "@/redux/store"

import PaymentScreen from "@/screens/library/payment.screen"
import { Provider } from "react-redux"


export default function LibraryBooking() {
  return (
    <Provider store={store}>

    <PaymentScreen />
  </Provider>
  )
}

