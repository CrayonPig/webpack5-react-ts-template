import type { RootState } from '..';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  token: string;
  userInfo: any;
  menuList: Array<any>;
}

export const initialState: IUserState = {
  token: '',
  userInfo: {},
  menuList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectMenuList = (state: RootState) => state.user.menuList;

export default userSlice.reducer;
