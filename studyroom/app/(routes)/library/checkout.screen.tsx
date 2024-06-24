
import store from "@/redux/store"
import CheckoutScreen from "@/screens/library/checkout.screen"
import { Provider } from "react-redux"


export default function CheckOutScreen() {
  return (
    <Provider store={store}>

    <CheckoutScreen />
  </Provider>
  )
}

