export { type DiaryEntry, type DiaryRecord } from './types/index.ts';
export {
  useGetDiaryEntriesQuery,
  useAddDiaryEntryMutation,
  useEditDiaryEntryMutation,
  useDeleteDiaryEntryMutation
} from './model/service/firebaseDiaryService.ts';
