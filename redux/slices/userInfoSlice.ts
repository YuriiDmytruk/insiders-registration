import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfoState {
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  role: 'user' | 'admin';
}

const initialState: UserInfoState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  image: '',
  role: 'user',
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.image = action.payload.image;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updatePhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    updateImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

export const {
  setUserInfo,
  updateName,
  updateEmail,
  updatePassword,
  updatePhone,
  updateImage,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
