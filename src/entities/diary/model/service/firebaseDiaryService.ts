import dayjs from 'dayjs';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { type DiaryEntry, type DiaryRecord } from '../../types';
// TODO: не реактивный auth, при смене юзера, RTK не обновляет данные
import { auth, db } from '@/shared/api/firebase.ts';
import { rtkQueryApi } from '@/shared/api/rtkQuery';

const getDiaryValues = (payload: Partial<DiaryRecord>) => ({
  uid: auth.currentUser?.uid,
  product: payload.product,
  weight: payload.weight,
  calories: payload.calories,
  date: payload.date ? Timestamp.fromDate(new Date(payload.date)) : undefined
});

const diaryApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['diary'] })
  .injectEndpoints({
    endpoints: build => ({
      getDiaryEntries: build.query<
        {
          entries: DiaryRecord[];
          totalCalories: number;
          totalByDay: { days: string[]; calories: number[] };
        },
        { dateStart: string; dateEnd: string }
      >({
        async queryFn(
          { dateStart, dateEnd },
          _queryApi,
          _extraOptions,
          _fetchWithBQ
        ) {
          try {
            const startOfDay = dayjs(dateStart).startOf('day').toDate();
            const endOfDay = dayjs(dateEnd).endOf('day').toDate();
            const startTimestamp = Timestamp.fromDate(startOfDay);
            const endTimestamp = Timestamp.fromDate(endOfDay);

            const q = query(
              collection(db, 'diary'),
              where('uid', '==', auth.currentUser?.uid),
              where('date', '>=', startTimestamp),
              where('date', '<=', endTimestamp),
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

            const totalCalories = snapshot.docs.reduce((result, doc) => {
              const data = doc.data() as DiaryEntry;
              return result + (data.calories || 0);
            }, 0);

            const totalByDay = snapshot.docs.reduce((result, doc) => {
              const data = doc.data() as DiaryEntry;
              const date = data.date.toDate().toISOString().split('T')[0];
              if (!result.has(date)) {
                result.set(date, 0);
              }
              result.set(date, result.get(date) + (data.calories || 0));
              return result;
            }, new Map());
            return {
              data: {
                entries: result,
                totalCalories,
                totalByDay: {
                  days: Array.from(totalByDay.keys()).reverse(),
                  calories: Array.from(totalByDay.values()).reverse()
                }
              }
            };
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

      getRecentDiaryEntries: build.query<{ entries: DiaryRecord[] }, void>({
        async queryFn(_, _queryApi, _extraOptions, _fetchWithBQ) {
          try {
            const q = query(
              collection(db, 'diary'),
              where('uid', '==', auth.currentUser?.uid),
              orderBy('date', 'desc'),
              limit(100)
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

            return { data: { entries: result } };
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
  useGetRecentDiaryEntriesQuery,
  useAddDiaryEntryMutation,
  useEditDiaryEntryMutation,
  useDeleteDiaryEntryMutation
} = diaryApi;
