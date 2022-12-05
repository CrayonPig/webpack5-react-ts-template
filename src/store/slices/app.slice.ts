import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppThunk } from '..';
import zhCN from '@/locales/zh_CN/index';
import enUS from '@/locales/en_US/index';
import ls from '@/utils/ls';

export interface IAppState {
  lang: string;
  langMsg: Record<string, string>;
}

const getLangMsg = (lang: string) => {
  let res = null;
  switch (lang) {
    case 'zh-CN':
      res = zhCN;
      break;
    case 'en-US':
      res = enUS;
      break;
    default:
      res = enUS;
  }
  return res;
};

const lsLang = ls.get('lang');

// 存储语言到ls中，防止刷新后丢失
// Store language in LS to prevent loss after refreshing
const initialState: IAppState = lsLang ? {
  lang: lsLang,
  langMsg: getLangMsg(lsLang)
} : {
  lang: 'en-US',
  langMsg: enUS
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
      state.langMsg = getLangMsg(action.payload);
      ls.set('lang', action.payload);
    }
  },
});

export const { changeLang } = appSlice.actions;

export const selectLang = (state: RootState) => state.app.lang;
export const selectLangMsg = (state: RootState) => state.app.langMsg;

export default appSlice.reducer;
