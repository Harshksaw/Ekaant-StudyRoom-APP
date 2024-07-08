
import store from "@/redux/store"

import InvoiceScreen from "@/screens/library/invoice.screen"
import { Provider } from "react-redux"


export default function CheckOutScreen() {
  return (
    <Provider store={store}>

    <InvoiceScreen />
  </Provider>
  )
}

