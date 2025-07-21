import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

interface DataState {
  user: User | null;
}

export const initialState: DataState = {
  user: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { saveUser } = globalSlice.actions;

export default globalSlice.reducer;
