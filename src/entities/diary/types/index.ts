import { type DocumentReference, type Timestamp } from 'firebase/firestore';
import type { ProductEntry } from '@/shared/types/product';

export type DiaryEntry = {
  id: string;
  uid: string;
  weight: number;
  calories: number;
  date: Timestamp;
  product: DocumentReference<ProductEntry>;
};

export type DiaryRecord = { date: string; product?: ProductEntry } & Omit<
  DiaryEntry,
  'date' | 'product'
>;
