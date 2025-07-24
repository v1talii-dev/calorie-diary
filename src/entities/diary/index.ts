export { type DiaryEntry, type DiaryRecord } from './types/index.ts';
export {
  useGetDiaryEntriesQuery,
  useAddDiaryEntryMutation
} from './model/service/firebaseDiaryService.ts';
