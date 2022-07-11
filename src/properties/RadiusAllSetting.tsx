import React, { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';

import Icon from '@asany/icons';
import { Input } from 'antd';
import isEqual from 'lodash/isEqual';

import { onlyNumber } from './utils';
import { RadiusAllSettingProps } from './typings';

const icons = ['TopLeftCornerRadius', 'TopRightCornerRadius', 'BottomRightCornerRadius', 'BottomLeftCornerRadius'];

const RadiusAllSetting = (props: RadiusAllSettingProps) => {
  const { onChange, value: [tl = 0, tr = 0, br = 0, bl = 0] = [0, 0, 0, 0] } = props;

  // 记录输入位置
  const [index, setIndex] = useState(0);
  // 内部存储 Value, 在失去焦点时，触发 props.onChange 通知外部
  const [value, setValue] = useState([tl, tr, br, bl]);

  // 如果 props.value 改变, 修改 value
  useEffect(() => {
    const [tl = 0, tr = 0, br = 0, bl = 0] = value;
    setValue([tl, tr, br, bl]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tl, tr, br, bl]);

  // 输入框失去焦点时的操作
  const handleBlur = useCallback(() => {
    // 重置图标
    setIndex(0);
    // 如果 value 与 props.value 一直，不触发外部
    if (!onChange || isEqual(props.value, value)) {
      return;
    }
    onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, value]);

  // 更新内部数据
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const index = parseInt(event.target.getAttribute('data-id')!);
      const newValue = [...value];
      newValue[index] = onlyNumber(event.target.value);
      setValue(newValue);
    },
    [value]
  );

  // 设置图标及文本选中
  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const index = parseInt(event.target.getAttribute('data-id')!);
    setIndex(index);
    event.target.select();
  }, []);

  return (
    <div className="raidus-change-box design-colums ">
      <div className="change-input ">
        <div className="icons-pane">
          <Icon name={icons[index]} />
        </div>
        {icons.map((_, i) => {
          return (
            <div className="input-box" key={i}>
              <Input data-id={i} onFocus={handleFocus} value={value[i]} onBlur={handleBlur} onChange={handleChange} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(RadiusAllSetting);
