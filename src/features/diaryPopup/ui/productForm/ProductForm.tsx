import {
  Button,
  DatePicker,
  type DatePickerRef,
  Form,
  Input
} from 'antd-mobile';
import dayjs from 'dayjs';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { type RefObject, useCallback, useEffect, useState } from 'react';
import type { ProductValues } from '../../model/types';
import { auth, db } from '@/shared/api/firebase.ts';
import { DATE_FORMAT } from '@/shared/const/common.ts';

interface ProductFormProps {
  onSave: (payload: ProductValues) => void;
}

export const ProductForm = (props: ProductFormProps) => {
  const { onSave } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const setFormDefaultValues = useCallback(() => {
    form.setFieldsValue({
      weight: '',
      date: dayjs().startOf('day').toDate()
    });
  }, [form]);

  const onFinish = async (values: ProductValues) => {
    try {
      setIsLoading(true);
      await addDoc(collection(db, 'diary'), {
        uid: auth.currentUser?.uid,
        weight: Number(values.weight),
        date: Timestamp.fromDate(values.date)
      });
      setFormDefaultValues();
      // TODO
      onSave(values);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormDefaultValues();
  }, [setFormDefaultValues]);

  return (
    <Form
      form={form}
      footer={
        <Button
          block
          type='submit'
          color='primary'
          size='large'
          disabled={isLoading}
          loading={isLoading}
        >
          Сохранить
        </Button>
      }
      onFinish={onFinish}
    >
      <Form.Header>Добавить в дневник</Form.Header>

      <Form.Item name='weight' label='Вес' rules={[{ required: true }]}>
        <Input placeholder='В граммах' type='number' autoFocus={true} />
      </Form.Item>

      <Form.Item
        name='date'
        label='Дата'
        rules={[{ required: true }]}
        trigger='onConfirm'
        onClick={(__, datePickerRef: RefObject<DatePickerRef>) => {
          datePickerRef.current?.open();
        }}
      >
        <DatePicker>
          {value => (value ? dayjs(value).format(DATE_FORMAT) : '')}
        </DatePicker>
      </Form.Item>
    </Form>
  );
};
