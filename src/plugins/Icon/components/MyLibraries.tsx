import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Card, Spin } from 'antd';
import classnames from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Link } from 'react-router-dom';
import Icon, { IconLibrary } from '@asany/icons';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { LoadingOutlined } from '@ant-design/icons';

type LibraryCreateProps = {
  onCreated: () => void;
};

function LibraryCreate(props: LibraryCreateProps) {
  const input = useRef<Input>(null);
  const name = useRef<string>();
  const [active, setActive] = useState<boolean>();

  const [createLibrary, { loading }] = useMutation(gql`
    mutation createIconLibrary($name: String!) {
      library: createLibrary(input: { name: $name, type: ICONS }) {
        id
        name
      }
    }
  `);

  const handleChange = useCallback((e) => {
    name.current = e.target.value;
  }, []);

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  const handleBlur = useCallback((e) => {
    setActive(!!e.target.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    await createLibrary({ variables: { name: name.current } });
    props.onCreated();
    handleCancel();
  }, []);

  const handleCancel = useCallback(() => {
    input.current?.blur();
    input.current?.setValue('');
    setActive(false);
    name.current = undefined;
  }, []);

  return (
    <Card className="library-container library-create">
      <div className={classnames('library-create-form', { active })}>
        <Input
          ref={input}
          onChange={handleChange}
          className="library-name-input ant-input-rimless"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Library Name"
        />
        <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <div className="library-action-buttons">
            <Icon name="VectorAlign" onClick={handleCancel} />
            <Icon name="VectorSubtraction" onClick={active ? handleSubmit : undefined} />
          </div>
        </Spin>
      </div>
    </Card>
  );
}

type LibraryCardProps = {
  library: IconLibrary;
};

function LibraryCard({ library }: LibraryCardProps) {
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
          <Link to="/libraries/1">{library.name}</Link>
        </h1>
        <p className="library-item-count-label">{library.total} items</p>
      </div>
    </Card>
  );
}

function MyLibraries() {
  const { data, loading, refetch } = useQuery<{ libraries: IconLibrary[] }>(
    gql`
      query libraries {
        libraries: iconLibraries {
          id
          name
          total
          description
        }
      }
    `,
    { fetchPolicy: 'no-cache' }
  );

  const handleCreated = useCallback(() => {
    refetch();
  }, []);

  return (
    <div className="ie-libraries">
      <OverlayScrollbarsComponent className="libraries-scrollbar" options={{ scrollbars: { autoHide: 'scroll' } }}>
        <Spin spinning={loading}>
          <div className="libraries-header-section">
            <h1 className="libraries-header">Libraries</h1>
          </div>
          <div className="library-list-wrapper">
            <LibraryCreate onCreated={handleCreated} />
            {!loading && data!.libraries.map((library) => <LibraryCard key={library.id} library={library} />)}
          </div>
        </Spin>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default React.memo(MyLibraries);
