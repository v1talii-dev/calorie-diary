import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where
} from 'firebase/firestore';
import { type DiaryEntry, type DiaryRecord } from '../../types';
import { auth, db } from '@/shared/api/firebase.ts';
import { rtkQueryApi } from '@/shared/api/rtkQuery';

const diaryApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['diary'] })
  .injectEndpoints({
    endpoints: build => ({
      getDiaryEntries: build.query<DiaryRecord[], void>({
        async queryFn(_arg, _queryApi, _extraOptions, _fetchWithBQ) {
          try {
            const uid = auth.currentUser?.uid;
            const q = query(
              collection(db, 'diary'),
              where('uid', '==', uid),
              orderBy('date', 'desc')
            );
            const snapshot = await getDocs(q);
            const result = snapshot.docs.map(doc => {
              const data = doc.data() as Omit<DiaryEntry, 'id'>;
              return {
                ...data,
                id: doc.id,
                date: data.date.toDate().toLocaleDateString()
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

      addDiaryEntry: build.mutation<void, { weight: number; date: Date }>({
        async queryFn(values) {
          try {
            const uid = auth.currentUser?.uid;
            await addDoc(collection(db, 'diary'), {
              uid,
              weight: Number(values.weight),
              date: Timestamp.fromDate(values.date)
            });
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

export const { useGetDiaryEntriesQuery, useAddDiaryEntryMutation } = diaryApi;
