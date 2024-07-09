
import store from "@/redux/store"
import FriendDetails from "@/screens/friend/friend.details"

import { Provider } from "react-redux"


export default function FriendDetailsScreen() {
  return (
    <Provider store={store}>

    <FriendDetails />
  </Provider>
  )
}

