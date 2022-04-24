import type { RouteComponentProps } from 'react-router';

import { ContentWrapper } from '@/layouts/components';
import { Button, Card, Form, Input, Select, Upload } from '@/components/Metronic';

type StoreDetailsProps = RouteComponentProps<{ id: string }>;

function StoreDetails(props: StoreDetailsProps) {
  const { match } = props;

  const isNew = match.params.id == 'new';

  return (
    <ContentWrapper header={isNew ? { title: '新增门店11' } : undefined} footer={false}>
      <Card className="mb-5 mb-xl-10">
        <Card.Header>
          <Card.Title>新增门店</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form className="w-800px row d-flex flex-shrink-0 flex-column-reverse flex-md-row">
            <div className="col-12 col-md-8">
              <Form.Item className="mb-5" name="name" label="名称">
                <Input solid className="w-400px" />
              </Form.Item>
              <Form.Item className="my-5" name="location" label="门店位置">
                <Select solid className="w-400px" options={[]} />
              </Form.Item>
              <Form.Item className="my-5" name="leader" label="负责人">
                <Input solid className="w-400px" />
              </Form.Item>
              <Form.Item
                className="my-5"
                name="description"
                label="描述"
                help="请用少于250字符描述"
              >
                <Input.TextArea
                  solid
                  autoSize={{ minRows: 4, maxRows: 8 }}
                  showCount
                  maxLength={250}
                  className="w-400px"
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item className="mb-5" name="qrCode" label="门店二维码">
                <Upload.Image
                  width={250}
                  height={250}
                  space="orX8kLOV"
                  crop={{ height: 450, zoomable: false, aspectRatio: 1 }}
                  backgroundImage="/assets/media/background/qrcode_icon.png"
                />
              </Form.Item>
            </div>
          </Form>
          <Button>添加门店</Button>
        </Card.Body>
      </Card>
    </ContentWrapper>
  );
}

export default StoreDetails;
