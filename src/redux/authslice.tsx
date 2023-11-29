import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ApiStatusType {
  type:
    | "Awaiting Payment"
    | "On Hold"
    | "Awaiting Fulfillment"
    | "Shipped"
    | "Cancelled"
    | "NONE";
}

export interface AuthState {
  value: boolean;
  showLeft: boolean;
  showRight: boolean;
  accountNumber: string;
  upsAccounts: any;
  subscriptionCount: number;
  apiStatus: ApiStatusType["type"];
  settingPanel: boolean;
}
const token = localStorage.getItem("token");
const initialState: AuthState = {
  value: Boolean(token),
  accountNumber: "",
  showLeft: false,
  showRight: false,
  upsAccounts: [],
  subscriptionCount: 0,
  apiStatus: "Awaiting Fulfillment",
  settingPanel: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAuth: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true;
    },
    setUnAuth: (state) => {
      state.value = false;
    },
    setByState: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    setAccountNumber: (state, action: PayloadAction<string>) => {
      state.accountNumber = action.payload;
    },
    setUpsAccounts: (state, action: PayloadAction<any>) => {
      state.upsAccounts = action.payload;
    },
    setShowLeft: (state, action: PayloadAction<boolean>) => {
      state.showLeft = action.payload;
    },
    setShowRight: (state, action: PayloadAction<boolean>) => {
      state.showRight = action.payload;
    },
    setSubscriptionCount: (state, action: PayloadAction<number>) => {
      state.subscriptionCount = action.payload;
    },
    setApiStatus: (state, action: PayloadAction<ApiStatusType["type"]>) => {
      state.apiStatus = action.payload;
    },
    setSettingPanel: (state, action: PayloadAction<boolean>) => {
      state.settingPanel = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuth,
  setUnAuth,
  setByState,
  setAccountNumber,
  setUpsAccounts,
  setShowLeft,
  setShowRight,
  setApiStatus,
  setSubscriptionCount,
  setSettingPanel,
} = authSlice.actions;

export default authSlice.reducer;
