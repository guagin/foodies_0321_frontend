import moment from 'moment';

export function getDateString(date: Date) {
  return moment(date).format('YYYY-MM-DD');
}

export function getDateTimeString(date: Date) {
  return moment(date).format('YYY-MM-DD HH:mm:ss');
}
