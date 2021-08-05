import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Card, Spin, Dropdown, Menu, Modal } from 'antd';
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
    if (!name.current) {
      return;
    }
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
          onPressEnter={handleSubmit}
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
// TODO: 尝试添加及删除时的动画
type LibraryCardProps = {
  submiting: boolean;
  library: IconLibrary;
  onClickDelete: (library: IconLibrary) => void;
};

function LibraryCard({ library, submiting, onClickDelete }: LibraryCardProps) {
  const actionsContainer = useRef<HTMLDivElement>(null);
  let history = useHistory();

  function handleClick() {
    history.push('/libraries/1');
  }

  const handleMenuClick = useCallback((e) => {
    if (e.key === 'delete') {
      onClickDelete(library);
    }
  }, []);

  return (
    <Card
      className="library-container"
      hoverable
      cover={
        <Spin spinning={submiting} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <div onClick={handleClick} className="library-image-wrapper empty-library"></div>
        </Spin>
      }
    >
      <div className="lib-description">
        <h1 className="library-name-header">
          <Link to="/libraries/1">{library.name}</Link>
        </h1>
        <p className="library-item-count-label">{library.total} items</p>
      </div>
      <div ref={actionsContainer} className="lib-actions-menu">
        <Dropdown
          transitionName=""
          trigger={['click']}
          placement="bottomRight"
          getPopupContainer={() => actionsContainer.current!}
          overlay={
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="rename">Rename Library</Menu.Item>
              <Menu.Item key="delete">Delete Library</Menu.Item>
            </Menu>
          }
        >
          <Icon onClick={(e) => e.preventDefault()} className="ant-dropdown-link" name="VectorSubtraction" />
        </Dropdown>
      </div>
    </Card>
  );
}

function MyLibraries() {
  const [state, setState] = useState<{ library?: IconLibrary; deleteLibraryLoading?: boolean; visible: boolean }>({
    visible: false,
    deleteLibraryLoading: false,
  });

  const { data, loading, refetch } = useQuery<{ libraries: IconLibrary[] }>(
    gql`
      query libraries {
        libraries: iconLibraries {
          id
          name
          # total
          description
        }
      }
    `,
    { fetchPolicy: 'no-cache' }
  );

  const [deleteLibrary] = useMutation(gql`
    mutation($id: ID!) {
      deleteLibrary(id: $id)
    }
  `);

  const handleCreated = useCallback(() => {
    refetch();
  }, []);

  const handleCloseDeleteFormModel = useCallback(() => {
    setState({ visible: false });
  }, []);

  const handleClickDelete = useCallback((library: IconLibrary) => {
    setState({ visible: true, library });
  }, []);

  const handleDelete = useCallback(async () => {
    setState({ visible: false, library: state.library, deleteLibraryLoading: true });
    await deleteLibrary({ variables: { id: state.library!.id } });
    await refetch();
    setState({ visible: false });
  }, [state.library]);

  return (
    <div className="ie-libraries">
      <OverlayScrollbarsComponent className="libraries-scrollbar" options={{ scrollbars: { autoHide: 'scroll' } }}>
        <Spin spinning={loading}>
          <div className="libraries-header-section">
            <h1 className="libraries-header">Libraries</h1>
          </div>
          <div className="library-list-wrapper">
            <LibraryCreate onCreated={handleCreated} />
            {!loading &&
              data!.libraries.map((library) => (
                <LibraryCard
                  key={library.id}
                  submiting={state.library?.id == library.id && !!state.deleteLibraryLoading}
                  library={library}
                  onClickDelete={handleClickDelete}
                />
              ))}
          </div>
          <Modal
            closable={false}
            title="ASANY"
            visible={state.visible}
            okText="Delete"
            onOk={handleDelete}
            onCancel={handleCloseDeleteFormModel}
          >
            <p>Delete "{state.library?.name}"</p>
            <p>Are you sure you want to delete "{state.library?.name}"?</p>
          </Modal>
        </Spin>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default React.memo(MyLibraries);
