import { InputText, MIXED, radiusArr } from './typings';

export const radiusSize = (arr: radiusArr) => new Set(arr).size === 1;

export const onlyNumber = (value: string | number) => (value + '').replace(/[^0-9]/gi, '');

// 用于圆角的过滤样式
export const radiusFormat = {
  input: (value: InputText) => {
    if (Array.isArray(value)) {
      console.log(value);
      if (radiusSize(value)) {
        return onlyNumber(value[0]);
      } else {
        return MIXED;
      }
    }
    return onlyNumber(value);
  },
  output: (value: string) => {
    const num = parseInt(value);
    return [num, num, num, num];
  },
};
// 用于角度的过滤
export const rotateFormat = {
  input: (value: InputText): string => {
    const num = onlyNumber(value) || 0;
    return `${num}°`;
  },
};
// 用于一般输入框的过滤
export const inputFormat = {
  input: (value: InputText): string => {
    return onlyNumber(value) || '0';
  },
};
export const numberFormat = {
  input: (value: InputText): string => {
    return onlyNumber(value) || '0';
  },
  output: (value: string) => {
    return parseInt(value);
  },
};
