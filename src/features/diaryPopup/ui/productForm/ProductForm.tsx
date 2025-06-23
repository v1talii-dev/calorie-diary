import {
  Button,
  DatePicker,
  type DatePickerRef,
  Form,
  Input
} from 'antd-mobile';
import dayjs from 'dayjs';
import type { RefObject } from 'react';
import type { ProductValues } from '../../model/types';
import { DATE_FORMAT } from '@/shared/const/common.ts';

interface ProductFormProps {
  onSave: (payload: ProductValues) => void;
}

export const ProductForm = (props: ProductFormProps) => {
  const { onSave } = props;

  const onFinish = (values: ProductValues) => {
    onSave(values);
  };

  return (
    <Form
      name='form'
      onFinish={onFinish}
      footer={
        <Button block type='submit' color='primary' size='large'>
          Сохранить
        </Button>
      }
    >
      <Form.Header>Добавить в дневник</Form.Header>

      <Form.Item name='weigth' label='Количество' rules={[{ required: true }]}>
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
