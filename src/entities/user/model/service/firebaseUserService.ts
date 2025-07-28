import { collection, getDocs, query, where } from 'firebase/firestore';
import { type UserSettingsEntry } from '../../types';
import { auth, db } from '@/shared/api/firebase.ts';
import { rtkQueryApi } from '@/shared/api/rtkQuery';

const userSettingsApi = rtkQueryApi
  .enhanceEndpoints({ addTagTypes: ['user_settings'] })
  .injectEndpoints({
    endpoints: build => ({
      getUserSettings: build.query<UserSettingsEntry | null, void>({
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

            return { data: null };
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
      })
    })
  });

export const { useGetUserSettingsQuery } = userSettingsApi;
