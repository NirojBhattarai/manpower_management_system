import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CandidateCreateState = {
  jobseekerId: string | null;
};

const initialState: CandidateCreateState = {
  jobseekerId: null,
};

const candidateCreateSlice = createSlice({
  name: "candidateCreate",
  initialState,
  reducers: {
    setJobseekerId: (state, action: PayloadAction<string>) => {
      state.jobseekerId = action.payload;
    },
    resetCandidateCreate: (state) => {
      state.jobseekerId = null;
    },
  },
});

export const { setJobseekerId, resetCandidateCreate } =
  candidateCreateSlice.actions;

export default candidateCreateSlice.reducer;
