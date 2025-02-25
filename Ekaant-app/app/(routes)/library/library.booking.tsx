import store from "@/redux/store"
import BookingScreen from "@/screens/library/booking.screen"
import { Provider } from "react-redux"


export default function LibraryBooking() {
  return (
    <Provider store={store}>

    <BookingScreen />
  </Provider>
  )
}

