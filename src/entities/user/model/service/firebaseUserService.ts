import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { type UserSettingsEntry } from '../../types';
// TODO: не реактивный auth, при смене юзера, RTK не обновляет данные
import { auth, db } from '@/shared/api/firebase.ts';
import { rtkQueryApi } from '@/shared/api/rtkQuery';
import { CALORIES_LIMIT } from '@/shared/const/entites.ts';

const getUserSettingsValues = (payload: Partial<UserSettingsEntry>) => ({
  uid: auth.currentUser?.uid,
  calories_limit: payload?.calories_limit
});

const userSettingsApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['user_settings'] })
  .injectEndpoints({
    endpoints: build => ({
      getUserSettingsEntry: build.query<UserSettingsEntry, void>({
        async queryFn(_arg, _queryApi, _extraOptions, _fetchWithBQ) {
          try {
            const q = query(
              collection(db, 'user_settings'),
              where('uid', '==', auth.currentUser?.uid)
            );
            const snapshot = await getDocs(q);
            const userSettings = snapshot.docs?.[0];
            if (userSettings) {
              const data = userSettings.data();
              return {
                data: {
                  ...data,
                  id: userSettings.id,
                  uid: data.uid
                }
              };
            }

            return {
              data: {
                calories_limit: CALORIES_LIMIT
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
        providesTags: ['user_settings']
      }),

      addUserSettingsEntry: build.mutation<void, Partial<UserSettingsEntry>>({
        async queryFn(values) {
          try {
            await addDoc(
              collection(db, 'user_settings'),
              getUserSettingsValues(values)
            );
            return { data: undefined };
          } catch (error) {
            console.error(error);
            return { error: { status: 'CUSTOM_ERROR', error } };
          }
        },
        invalidatesTags: ['user_settings']
      }),

      editUserSettingsEntry: build.mutation<void, Partial<UserSettingsEntry>>({
        async queryFn(values) {
          try {
            if (!values.id) {
              return Promise.reject();
            }
            await updateDoc(
              doc(db, 'user_settings', values.id),
              getUserSettingsValues(values)
            );
            return { data: undefined };
          } catch (error) {
            console.error(error);
            return { error: { status: 'CUSTOM_ERROR', error } };
          }
        },
        invalidatesTags: ['user_settings']
      })
    })
  });

export const {
  useGetUserSettingsEntryQuery,
  useAddUserSettingsEntryMutation,
  useEditUserSettingsEntryMutation
} = userSettingsApi;
