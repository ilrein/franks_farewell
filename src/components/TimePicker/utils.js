import dayjs from 'dayjs';

export const arrayOfHours = () => {
  const arr = [];

  for (let index = 0; index < 24; index += 1) {
    const time = `${dayjs().format('YYYY-MM-D')} ${index}:00`;
    const day = dayjs(time).format('h:mm A');
    arr.push(day);
  }
  return arr;
};

export const arrayOfHalfHours = () => {
  const arr = [];

  for (let index = 0; index < 24; index += 1) {
    const hour = dayjs().hour(index);
    const time = dayjs().format('YYYY-MM-D');
    const day = dayjs(time).format('h:mm A');
    arr.push(day);
  }
  return arr;
};
