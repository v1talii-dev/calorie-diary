import { Button, Form, Input, Space } from 'antd-mobile';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductField } from '../productField/ProductField.tsx';
import {
  type DiaryRecord,
  useAddDiaryEntryMutation,
  useEditDiaryEntryMutation,
  getFilters
} from '@/entities/diary';
import { getCalculatedCalories } from '@/shared/lib/catalog.ts';

interface ProductFormProps {
  value?: DiaryRecord;
  onChange: () => void;
}
type FormProps = Partial<
  { weight?: string; date?: Date } & Omit<DiaryRecord, 'weight' | 'date'>
>;

export const ProductForm = (props: ProductFormProps) => {
  const { value, onChange } = props;
  const filters = useSelector(getFilters);
  const [form] = Form.useForm<FormProps>();
  const [previousWeight, setPreviousWeight] = useState<string>('');
  const [addDiaryEntry, { isLoading: isLoadingAdd }] =
    useAddDiaryEntryMutation();
  const [editDiaryEntry, { isLoading: isLoadingEdit }] =
    useEditDiaryEntryMutation();

  const setFormDefaultValues = useCallback(() => {
    const result = value
      ? {
          ...value,
          weight: String(value.weight),
          date: value.date ? new Date(value.date) : undefined
        }
      : {
          id: undefined,
          product: undefined,
          weight: '',
          calories: undefined,
          date: dayjs(filters.dateStart).startOf('day').toDate()
        };
    form.setFieldsValue(result);
  }, [value, form, filters]);

  const onSaveForm = async () => {
    try {
      const formProps = form.getFieldsValue(true);
      const currentDate = dayjs();
      const payload = {
        id: formProps?.id,
        product: formProps.product,
        weight: Number(formProps.weight),
        calories: formProps.calories,
        date: formProps?.id
          ? formProps.date?.toISOString()
          : dayjs(formProps.date)
              .set('hour', currentDate.hour())
              .set('minute', currentDate.minute())
              .set('second', currentDate.second())
              .set('millisecond', currentDate.millisecond())
              .toISOString()
      };
      const apiMethod = payload.id ? editDiaryEntry : addDiaryEntry;
      await apiMethod(payload).unwrap();
      setFormDefaultValues();
      onChange();
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeWeight = (weight?: number) => {
    form.setFieldValue('weight', weight ?? '');
  };

  const onClickWeight = () => {
    setPreviousWeight(form.getFieldValue('weight'));
    onChangeWeight(undefined);
  };

  const onBlurWeight = () => {
    if (!form.getFieldValue('weight') && previousWeight) {
      onChangeWeight(Number(previousWeight));
    }
  };

  useEffect(() => {
    setFormDefaultValues();
  }, [setFormDefaultValues]);

  return (
    <Form
      form={form}
      footer={
        <Space block direction='vertical' style={{ '--gap': '16px' }}>
          <Button
            block
            type='submit'
            color='primary'
            size='large'
            disabled={isLoadingAdd || isLoadingEdit}
            loading={isLoadingAdd || isLoadingEdit}
          >
            Сохранить
          </Button>
        </Space>
      }
      onFinish={onSaveForm}
    >
      <Form.Header>
        {value?.id ? 'Обновить запись в дневнике' : 'Добавить в дневник'}
      </Form.Header>

      <Form.Item name='product' label='Продукт' rules={[{ required: true }]}>
        <ProductField openOnInit={!value?.id} onChangeWeight={onChangeWeight} />
      </Form.Item>

      <Form.Item name='weight' label='Вес' rules={[{ required: true }]}>
        <Input
          placeholder='В граммах'
          type='number'
          onClick={onClickWeight}
          onBlur={onBlurWeight}
        />
      </Form.Item>

      <Form.Subscribe to={['weight', 'product']}>
        {({ weight, product }, form) => {
          const result = getCalculatedCalories(
            Number(weight),
            product?.nutrients?.energy
          );
          form.setFieldValue('calories', result > 0 ? result : 0);
          return (
            <Form.Item label='Всего калорий'>
              <Input
                value={form.getFieldValue('calories')}
                readOnly={true}
              ></Input>
            </Form.Item>
          );
        }}
      </Form.Subscribe>
    </Form>
  );
};
