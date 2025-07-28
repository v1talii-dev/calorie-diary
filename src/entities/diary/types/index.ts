import type { Timestamp } from 'firebase/firestore';
import type { Product } from '@/entities/product';

export type DiaryEntry = {
  id: string;
  uid: string;
  product: Product;
  weight: number;
  calories: number;
  date: Timestamp;
};

export type DiaryRecord = { date: string } & Omit<DiaryEntry, 'date'>;
