import { AccountTableRow } from 'types/interfaces';
import { expenseEnums as EXPENSE, incomeEnums as INCOME, clsEnums as MONEY, emotionEnums } from 'types/enums';
import { getCurrentDate } from './getCurrentDate';

const INITIAL_TODAY_DIARY = {
  title: '',
  diaryContent: '',
};

const INITIAL_CONTENT_OPTIONS = {
  TODO_LIST: false,
  TODAY_QUESTION: false,
  EMOTION: false,
  DIARY: false,
  ACCOUNT_BOOK: false,
};

const INITIAL_DIARY_INFO = {
  _id: '',
  selectedDate: '',
  todo: [],
  qna: {
    question: '',
    tag: '',
    answer: '',
  },
  emotion: emotionEnums.SO_SO,
  diary: INITIAL_TODAY_DIARY,
  account: [],
  contentOptions: INITIAL_CONTENT_OPTIONS,
};

const INITIAL_ACCOUNT_INFO: AccountTableRow = {
  id: getCurrentDate(),
  cls: MONEY.EXPENSE,
  category: EXPENSE.FOOD,
  amount: 0,
  memo: '',
};

export { INITIAL_DIARY_INFO, INITIAL_TODAY_DIARY, INITIAL_CONTENT_OPTIONS, INITIAL_ACCOUNT_INFO };
