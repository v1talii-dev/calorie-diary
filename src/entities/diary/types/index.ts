import type { Timestamp } from 'firebase/firestore';

export type DiaryEntry = {
  id: string;
  date: Timestamp;
  weight: number;
  uid: string;
};

export type DiaryRecord = { date: string } & Omit<DiaryEntry, 'date'>;
