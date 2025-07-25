import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { type DiaryEntry, type DiaryRecord } from '../../types';
import { auth, db } from '@/shared/api/firebase.ts';
import { rtkQueryApi } from '@/shared/api/rtkQuery';

const getDiaryValues = (payload: Partial<DiaryRecord>) => ({
  uid: auth.currentUser?.uid,
  weight: Number(payload.weight),
  date: payload.date ? Timestamp.fromDate(new Date(payload.date)) : undefined
});

const diaryApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['diary'] })
  .injectEndpoints({
    endpoints: build => ({
      getDiaryEntries: build.query<DiaryRecord[], void>({
        async queryFn(_arg, _queryApi, _extraOptions, _fetchWithBQ) {
          try {
            const q = query(
              collection(db, 'diary'),
              where('uid', '==', auth.currentUser?.uid),
              orderBy('date', 'desc')
            );
            const snapshot = await getDocs(q);
            const result = snapshot.docs.map(doc => {
              const data = doc.data() as Omit<DiaryEntry, 'id'>;
              return {
                ...data,
                id: doc.id,
                date: data.date.toDate().toISOString()
              };
            });
            return { data: result };
          } catch (error) {
            console.error(error);
            return {
              error: {
                status: 'CUSTOM_ERROR',
                error: (error as Error).message || error
              }
            };
          }
        },
        providesTags: ['diary']
      }),

      addDiaryEntry: build.mutation<void, Partial<DiaryRecord>>({
        async queryFn(values) {
          try {
            await addDoc(collection(db, 'diary'), getDiaryValues(values));
            return { data: undefined };
          } catch (error) {
            console.error(error);
            return { error: { status: 'CUSTOM_ERROR', error } };
          }
        },
        invalidatesTags: ['diary']
      }),

      editDiaryEntry: build.mutation<void, Partial<DiaryRecord>>({
        async queryFn(values) {
          try {
            if (!values.id) {
              return Promise.reject();
            }
            await updateDoc(
              doc(db, 'diary', values.id),
              getDiaryValues(values)
            );
            return { data: undefined };
          } catch (error) {
            console.error(error);
            return { error: { status: 'CUSTOM_ERROR', error } };
          }
        },
        invalidatesTags: ['diary']
      }),

      deleteDiaryEntry: build.mutation<void, string>({
        async queryFn(id) {
          try {
            await deleteDoc(doc(db, 'diary', id));
            return { data: undefined };
          } catch (error) {
            console.error(error);
            return { error: { status: 'CUSTOM_ERROR', error } };
          }
        },
        invalidatesTags: ['diary']
      })
    })
  });

export const {
  useGetDiaryEntriesQuery,
  useAddDiaryEntryMutation,
  useEditDiaryEntryMutation,
  useDeleteDiaryEntryMutation
} = diaryApi;
