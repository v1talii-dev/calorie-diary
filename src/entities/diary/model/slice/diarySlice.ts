import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { DiaryFilters } from '../types';

export interface DiaryState {
  filters: DiaryFilters;
}

const initialState: DiaryState = {
  filters: {
    date: new Date().toISOString()
  }
};

export const diarySlice = createSlice({
  name: 'diary',

  initialState,

  reducers: {
    setFilters: (state, action: PayloadAction<DiaryFilters>) => {
      state.filters = action.payload;
    }
  }
});

export const { setFilters } = diarySlice.actions;

export const diaryReducer = diarySlice.reducer;
