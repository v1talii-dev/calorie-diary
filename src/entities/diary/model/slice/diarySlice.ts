import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import type { DiaryFilters } from '../types';

export interface DiaryState {
  filters: DiaryFilters;
}

const initialState: DiaryState = {
  filters: {
    dateStart: dayjs().toISOString(),
    dateEnd: dayjs().toISOString()
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
