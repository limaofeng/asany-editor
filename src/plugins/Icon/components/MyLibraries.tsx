import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Card } from 'antd';
import classnames from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Link } from 'react-router-dom';
import Icon from '@asany/icons';

function LibraryCreate() {
  const [name, setName] = useState<string>();
  const [active, setActive] = useState<boolean>();

  const handleChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  const handleBlur = useCallback((e) => {
    setActive(!!e.target.value);
  }, []);

  return (
    <Card className="library-container library-create">
      <div className={classnames('library-create-form', { active })}>
        <Input
          onChange={handleChange}
          className="library-name-input ant-input-rimless"
          value={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Library Name"
        />
        <div className="library-action-buttons">
          <Icon name="VectorSubtraction" />
          <Icon name="VectorAlign" />
        </div>
      </div>
    </Card>
  );
}

function LibraryCard() {
  let history = useHistory();

  function handleClick() {
    history.push('/libraries/1');
  }
  return (
    <Card
      className="library-container"
      hoverable
      cover={
        <div onClick={handleClick} className="library-image-wrapper empty-library">
          <i className="empty-library-icon icon-creative-cloud-library"></i>
        </div>
      }
    >
      <div className="lib-description">
        <h1 className="library-name-header">
          <Link to="/libraries/1">My Library</Link>
        </h1>
        <p className="library-item-count-label">0 items</p>
      </div>
    </Card>
  );
}

function MyLibraries() {
  return (
    <div className="ie-libraries">
      <OverlayScrollbarsComponent className="libraries-scrollbar" options={{ scrollbars: { autoHide: 'scroll' } }}>
        <div className="libraries-header-section">
          <h1 className="libraries-header">Libraries</h1>
          <div className="library-list-wrapper">
            <LibraryCreate />

            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
              <LibraryCard />
            ))}
          </div>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default React.memo(MyLibraries);
