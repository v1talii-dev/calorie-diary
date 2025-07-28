import { DiaryPage } from './ui/DiaryPage.tsx';
export { getFilters } from './model/selectors/diarySelector.ts';
export { diaryReducer, setFilters } from './model/slice/diarySlice.tsx';
export { type DiaryFilters } from './types';

export default DiaryPage;
