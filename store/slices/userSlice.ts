import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  skillsOffered: string[];
  profileConfigured: boolean;
}

const initialState: UserState = {
  name: "",
  skillsOffered: [],
  profileConfigured: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSkillsOffered(state, action: PayloadAction<string[]>) {
      state.skillsOffered = action.payload;
    },
    setProfileConfigured(state, action: PayloadAction<boolean>) {
      state.profileConfigured = action.payload;
    },
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
  },
});

export const { setName, setSkillsOffered, setProfileConfigured, setUser } =
  userSlice.actions;
export default userSlice.reducer;
