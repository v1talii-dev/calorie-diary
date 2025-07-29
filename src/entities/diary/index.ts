export { type DiaryEntry, type DiaryRecord } from './types/index.ts';
export {
  useGetDiaryEntriesQuery,
  useGetRecentDiaryEntriesQuery,
  useAddDiaryEntryMutation,
  useEditDiaryEntryMutation,
  useDeleteDiaryEntryMutation
} from './model/service/firebaseDiaryService.ts';
