import {
  Button,
  DatePicker,
  type DatePickerRef,
  Dialog,
  Form,
  Input,
  Space
} from 'antd-mobile';
import dayjs from 'dayjs';
import { type RefObject, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProductField } from '../productField/ProductField.tsx';
import {
  type DiaryRecord,
  useAddDiaryEntryMutation,
  useDeleteDiaryEntryMutation,
  useEditDiaryEntryMutation
} from '@/entities/diary';
import { getFilters } from '@/pages/diary';
import { DATE_FORMAT } from '@/shared/const/common.ts';
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
  const [addDiaryEntry, { isLoading: isLoadingAdd }] =
    useAddDiaryEntryMutation();
  const [editDiaryEntry, { isLoading: isLoadingEdit }] =
    useEditDiaryEntryMutation();
  const [deleteDiaryEntry, { isLoading: isLoadingDelete }] =
    useDeleteDiaryEntryMutation();

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
          date: dayjs(filters.date).startOf('day').toDate()
        };
    form.setFieldsValue(result);
  }, [value, form, filters]);

  const onSaveForm = async () => {
    try {
      const formProps = form.getFieldsValue(true);
      const payload = {
        id: formProps?.id,
        product: formProps.product,
        weight: Number(formProps.weight),
        calories: formProps.calories,
        date: formProps.date?.toISOString()
      };
      const apiMethod = payload.id ? editDiaryEntry : addDiaryEntry;
      await apiMethod(payload).unwrap();
      setFormDefaultValues();
      onChange();
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async () => {
    try {
      if (!value?.id) {
        return;
      }
      await deleteDiaryEntry(value.id).unwrap();
      setFormDefaultValues();
      onChange();
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

          {value?.id && (
            <Button
              block
              color='danger'
              size='large'
              disabled={isLoadingDelete}
              loading={isLoadingDelete}
              onClick={() => {
                Dialog.show({
                  content: 'Вы действительно хотите удалить запись в дневнике?',
                  closeOnAction: true,
                  actions: [
                    [
                      {
                        key: 'cancel',
                        text: 'Нет'
                      },
                      {
                        key: 'delete',
                        text: 'Удалить',
                        danger: true,
                        bold: true,
                        onClick: () => onDelete()
                      }
                    ]
                  ]
                });
              }}
            >
              Удалить
            </Button>
          )}
        </Space>
      }
      onFinish={onSaveForm}
    >
      <Form.Header>
        {value?.id ? 'Обновить запись в дневнике' : 'Добавить в дневник'}
      </Form.Header>

      <Form.Item name='product' label='Продукт' rules={[{ required: true }]}>
        <ProductField />
      </Form.Item>

      <Form.Item name='weight' label='Вес' rules={[{ required: true }]}>
        <Input
          placeholder='В граммах'
          type='number'
          autoFocus={true}
          clearable
        />
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

      <Form.Subscribe to={['weight', 'product']}>
        {({ weight, product }, form) => {
          const result = getCalculatedCalories(
            Number(weight),
            product?.nutriments?.['energy-kcal_100g']
          );
          form.setFieldValue('calories', result);
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
