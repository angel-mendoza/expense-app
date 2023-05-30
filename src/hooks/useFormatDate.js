import moment from 'moment';

const year = moment().year()
const month = moment().month()
// const test = moment().month().format('MM')

const formatRelativeTimeToday = (date) => {
  return moment(date).fromNow();
}

const getDayDate = date => moment(date).format('DD')

var getDaysArray = () =>  {
  let date = new Date(year, month, 1);
  const result = [];
  while (date.getMonth() === month) {
    result.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }
  return result;
}

export {
  year,
  month,
  getDayDate,
  getDaysArray,
  formatRelativeTimeToday
}