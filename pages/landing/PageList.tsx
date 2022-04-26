import { Link } from 'umi';

import { useLandingPagesQuery } from '../../hooks';

import Controls from '@/components/Controls';
import { ContentWrapper } from '@/layouts/components';
import { Button, Card, Empty, Input, Select2, Table } from '@/metronic';

function PageList() {
  const { data } = useLandingPagesQuery({
    fetchPolicy: 'cache-and-network',
  });

  console.log(data);

  const pagination = data?.landingPages || { total: 0 };

  return (
    <ContentWrapper footer={false}>
      {!pagination.total ? (
        <Card className="mb-5 mb-xl-10">
          <Empty
            title="还没有活动"
            description="马上添加一个活动试试"
            image="/assets/media/illustrations/sigma-1/4.png"
          >
            <Button as={Link} variant="primary" to="/website/landing/pages/new">
              新建活动
            </Button>
          </Empty>
        </Card>
      ) : (
        <>
          <div className="d-flex flex-wrap flex-stack pb-7">
            <div className="d-flex flex-wrap align-items-center">
              <h3 className="fw-bolder me-5">活动 (4)</h3>
              <Input.Search placeholder="搜索" className="border-body bg-body w-250px" />
            </div>
            <Controls>
              <div className="d-flex my-0">
                <Select2
                  className="border-body bg-body w-150px me-5"
                  placeholder="状态"
                  options={[
                    { label: '全部', value: 'all' },
                    { label: '草稿', value: 'DRAFT' },
                    { label: '进行中', value: 'PUBLISHED' },
                    { label: '取消', value: 'SUSPEND' },
                    { label: '结束', value: 'COMPLETED' },
                  ]}
                />
                <Button>新增活动</Button>
              </div>
            </Controls>
          </div>
          <Card className="mb-5 mb-xl-10">
            <Card.Body>
              <Table
                columns={[
                  {
                    key: 'name',
                    title: '名称',
                  },
                  {
                    key: 'status',
                    title: '分配给',
                  },
                  {
                    key: 'start',
                    title: '创建时间',
                  },
                  {
                    key: 'end',
                    title: '创建时间',
                  },
                  {
                    key: 'stores',
                    title: '门店',
                    render: () => '',
                  },
                  {
                    key: 'actions',
                    title: '操作',
                  },
                ]}
                dataSource={[]}
              />
            </Card.Body>
          </Card>
        </>
      )}
    </ContentWrapper>
  );
}

export default PageList;
