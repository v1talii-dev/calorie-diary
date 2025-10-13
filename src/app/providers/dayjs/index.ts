import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ru';

dayjs.locale('ru');
dayjs.extend(isSameOrBefore);
