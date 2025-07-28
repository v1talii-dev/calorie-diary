import type { RootState } from '@/app/providers/store';

export const getFilters = (state: RootState) => state.diary.filters;
