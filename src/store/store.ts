import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import candidateCreateReducer from "./candidateCreateSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    CandidateCreate: candidateCreateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
