import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PaymentState {
  transactionId?: string;
  paymentStatus: "PENDING" | "APPROVED" | "CANCELED";
}

const initialState: PaymentState = {
  transactionId: undefined,
  paymentStatus: "PENDING",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction(state, action: PayloadAction<{ transactionId: string }>) {
      state.transactionId = action.payload.transactionId;
      AsyncStorage.setItem("transactionId", action.payload.transactionId);
      console.log("🚀 ~ setTransaction ~ action.payload.transactionId", action.payload.transactionId)
    },
    updatePaymentStatus(state, action: PayloadAction<"PENDING" | "APPROVED" | "CANCELED">) {
      state.paymentStatus = action.payload;
      AsyncStorage.setItem("paymentStatus", action.payload);
    },
    resetTransaction(state) {
      state.transactionId = undefined;
      state.paymentStatus = "PENDING";
      AsyncStorage.removeItem("transactionId");
      AsyncStorage.removeItem("paymentStatus");
    }
  }
});

export const { setTransaction, updatePaymentStatus, resetTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
