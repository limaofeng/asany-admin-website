import { useCallback, useMemo } from 'react';

import type { History } from 'history';
import { Link } from 'umi';
import { Icon } from '@asany/icons';
import type { RouteComponentProps } from 'react-router';
import qs from 'qs';

import { LandingStoresDocument, useDeleteStoreMutation, useLandingStoresQuery } from '../../hooks';

import { Controls } from '@/components';
import { ContentWrapper } from '@/layouts/components';
import {
  Badge,
  BlockUI,
  Button,
  Card,
  Dropdown,
  Empty,
  Input,
  Menu,
  Modal,
  Table,
  Toast,
} from '@/metronic';
import type { LandingStore } from '@/types';
import type { Sorter } from '@/metronic/typings';

type ActionsProps = {
  history: History;
  data: LandingStore;
};

function Actions({ data, history }: ActionsProps) {
  const [deleteStore] = useDeleteStoreMutation({
    refetchQueries: [LandingStoresDocument],
  });

  const handleDelete = useCallback(
    async (_data: LandingStore) => {
      const message = `确定删除门店 “${_data.name}” 吗？`;

      const result = await Modal.confirm({
        title: '确定删除',
        content: (
          <>
            <p className="tip-confirm">{message}</p>
            <p>删除的操作不可逆,请谨慎操作</p>
          </>
        ),
        okText: '删除',
      });
      if (!result.isConfirmed) {
        return;
      }
      await deleteStore({ variables: { ids: [_data.id] } });
      Toast.success(`门店 “${_data.name}” 删除成功`, 2000, {
        placement: 'bottom-start',
        progressBar: true,
      });
    },
    [deleteStore],
  );

  const handleMenuClick = useCallback(
    (event) => {
      if (event.key == 'view') {
        history.push(`/website/landing/stores/${data.id}`);
      } else if (event.key == 'delete') {
        handleDelete(data);
      }
    },
    [data, handleDelete, history],
  );

  return (
    <Dropdown
      overlay={
        <Menu
          onClick={handleMenuClick}
          className="menu-sub menu-sub-dropdown menu-gray-600 menu-state-bg-light-primary fw-bold fs-8 w-125px py-4"
        >
          <Menu.Item key="view" className="px-3">
            编辑
          </Menu.Item>
          <Menu.Item key="delete" className="px-3 actions-delete">
            删除
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
    >
      <Button className="fs-8" variant="light" activeColor="light-primary">
        操作
        <Icon className="svg-icon-5 ms-2 me-n1" name="Duotune/arr072" />
      </Button>
    </Dropdown>
  );
}

type StoreListProps = RouteComponentProps<any>;

function StoreList(props: StoreListProps) {
  const { history, location } = props;

  const variables = useMemo(() => {
    const { q, ...query } = (props.location as any).query;
    if (q) {
      query.filter = { name_contains: q };
    }
    return query;
  }, [props.location]);

  const sorter = useMemo<Sorter>(() => {
    if (!variables.orderBy) {
      return {
        order: 'descend',
        field: 'createdAt',
      };
    }
    const [field, order] = variables.orderBy.split('_');
    return {
      order: order == 'desc' ? 'descend' : 'ascend',
      field,
    };
  }, [variables.orderBy]);

  const { data, loading } = useLandingStoresQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const pagination = data?.landingStores || { total: 0, current: 1 };

  const stores = useMemo(() => {
    if (!data?.landingStores) {
      return [];
    }
    return data?.landingStores.edges.map((item) => item.node);
  }, [data?.landingStores]);

  const handleSearch = useCallback(
    (text) => {
      history.replace(location.pathname + '?' + qs.stringify({ q: text }));
    },
    [history, location.pathname],
  );

  const handleChange = useCallback(
    (_pagination, _filters, _sorter) => {
      const _query: any = {};
      if (variables.filter?.name_contains) {
        _query.q = variables.filter?.name_contains;
      }
      if (!!_sorter) {
        _query.orderBy = _sorter.field + '_' + (_sorter.order == 'ascend' ? 'asc' : 'desc');
      }
      _query.page = _pagination.current;
      history.replace(location.pathname + '?' + qs.stringify(_query));
    },
    [history, location.pathname, variables.filter?.name_contains],
  );

  return (
    <ContentWrapper footer={false}>
      {!pagination.total && !loading ? (
        <Card className="mb-5 mb-xl-10">
          <Empty
            title="还没有门店"
            description="马上添加一个门店试试"
            image="/assets/media/illustrations/sigma-1/4.png"
          >
            <Button as={Link} variant="primary" to="/website/landing/stores/new">
              新增门店
            </Button>
          </Empty>
        </Card>
      ) : (
        <>
          <div className="d-flex flex-wrap flex-stack pb-7">
            <div className="d-flex flex-wrap align-items-center">
              <h3 className="fw-bolder me-5">门店 ({pagination.total})</h3>
              <Input.Search
                onSearch={handleSearch}
                defaultValue={variables.filter?.name_contains}
                placeholder="搜索"
                className="border-body bg-body w-250px"
              />
            </div>
            <Controls>
              <div className="d-flex my-0">
                <Button as={Link} to="/website/landing/stores/new">
                  新增门店
                </Button>
              </div>
            </Controls>
          </div>
          <Card className="mb-5 mb-xl-10">
            <Card.Body>
              <BlockUI overlayClassName="bg-white bg-opacity-25" loading={loading}>
                <Table
                  hover
                  rowKey="id"
                  columns={[
                    {
                      key: 'name',
                      title: '名称',
                      sorter: true,
                      sortOrder: sorter.field == 'name' ? sorter.order : undefined,
                      render(name, record) {
                        return (
                          <div className="ps-2">
                            <Link
                              className="text-gray-700"
                              to={`/website/landing/stores/${record.id}`}
                            >
                              {name}
                            </Link>
                            {record.qrCode && (
                              <Badge className="ms-3" size="sm" color="success">
                                已上传二维码
                              </Badge>
                            )}
                          </div>
                        );
                      },
                    },
                    {
                      key: 'leader',
                      title: '负责人',
                      className: 'w-200px',
                    },
                    {
                      key: 'location.street',
                      dataIndex: 'location.fullAddress',
                      title: '门店地址',
                      className: 'w-300px',
                      sorter: true,
                      sortOrder: sorter.field == 'location.street' ? sorter.order : undefined,
                    },
                    {
                      key: 'createdAt',
                      title: '创建时间',
                      className: 'w-150px',
                      sorter: true,
                      sortOrder: sorter.field == 'createdAt' ? sorter.order : undefined,
                    },
                    {
                      key: 'actions',
                      title: '操作',
                      className: 'w-150px',
                      render: (_, record) => {
                        return <Actions history={props.history} data={record} />;
                      },
                    },
                  ]}
                  pagination={pagination}
                  onChange={handleChange}
                  dataSource={stores}
                />
              </BlockUI>
            </Card.Body>
          </Card>
        </>
      )}
    </ContentWrapper>
  );
}

export default StoreList;
