import React from 'react';
import classnames from 'classnames';
interface FormFieldsetProps {
  title?: string | false;
  className?: string;
  children: React.ReactNode;
}

function FormFieldset(props: FormFieldsetProps) {
  const { title, children, className } = props;

  // const [collapsed, setCollapsed] = useState(true);
  // const handleClick = useCallback(() => {
  //   setCollapsed(!collapsed);
  // }, [collapsed]);
  // console.log('====', title);

  return (
    <div className={classnames('smart-sidebar-fieldset', className)}>
      {title && (
        <div className="smart-sidebar-fieldset-header">
          <span className="smart-sidebar-fieldset-header-title">{title}</span>
          {/* <a onClick={handleClick} className="smart-sidebar-fieldset-header-expand-icon">
            <Icon name={collapsed ? 'FieldsetExpand' : 'FieldsetCollapsed'} />
          </a> */}
        </div>
      )}
      <div className="smart-sidebar-fieldset-content">{children}</div>
    </div>
  );
}

export default React.memo(FormFieldset);
