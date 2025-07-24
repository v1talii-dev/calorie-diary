import {
  Button,
  DatePicker,
  type DatePickerRef,
  Form,
  Input
} from 'antd-mobile';
import dayjs from 'dayjs';
import { type RefObject, useCallback, useEffect } from 'react';
import type { ProductValues } from '../../model/types';
import { useAddDiaryEntryMutation } from '@/entities/diary';
import { DATE_FORMAT } from '@/shared/const/common.ts';

interface ProductFormProps {
  onSave: (payload: ProductValues) => void;
}

export const ProductForm = (props: ProductFormProps) => {
  const { onSave } = props;
  const [form] = Form.useForm();
  const [addDiaryEntry, { isLoading }] = useAddDiaryEntryMutation();

  const setFormDefaultValues = useCallback(() => {
    form.setFieldsValue({
      weight: '',
      date: dayjs().startOf('day').toDate()
    });
  }, [form]);

  const onFinish = async (values: ProductValues) => {
    try {
      await addDiaryEntry({
        weight: Number(values.weight),
        date: values.date
      }).unwrap();

      setFormDefaultValues();
      // TODO
      onSave(values);
    } catch (e) {
      console.error(e);
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
