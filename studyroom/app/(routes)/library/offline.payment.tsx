
import store from "@/redux/store"

import { Provider } from "react-redux"
import OfflineScreen from '../../../screens/library/offline.screen';


export default function OfflinePayment() {
  return (
    <Provider store={store}>

    <OfflineScreen/>
  </Provider>
  )
}

