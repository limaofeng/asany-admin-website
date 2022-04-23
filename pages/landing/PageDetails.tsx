import type { RouteComponentProps } from 'react-router';
import Frame from 'react-frame-component';

import { ContentWrapper } from '@/layouts/components';
import { Button, Card, DatePicker, Device, Form, Input, Select } from '@/components/Metronic';

type PageDetailsProps = RouteComponentProps<{ id: string }>;

function PageDetails(props: PageDetailsProps) {
  const { match } = props;

  console.log(match.params.id);

  const isNew = match.params.id == 'new';

  return (
    <ContentWrapper header={isNew ? { title: '新增活动' } : undefined} footer={false}>
      <Card className="mb-5 mb-xl-10">
        <Card.Header>
          <Card.Title>新增活动</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form className="w-800px row d-flex flex-shrink-0 flex-column-reverse flex-md-row">
            <div className="col-12 col-md-8">
              <Form.Item className="mb-5" name="name" label="名称">
                <Input solid className="w-400px" />
              </Form.Item>
              <Form.Item className="my-5" name="stores" label="海报">
                <Select solid className="w-400px" options={[]} />
              </Form.Item>
              <Form.Item className="my-5" name="stores" label="参加活动的门店">
                <Select solid className="w-400px" options={[]} />
              </Form.Item>
              <Form.Item className="my-5" name="start" label="开始时间">
                <DatePicker solid className="w-400px" />
              </Form.Item>
              <Form.Item className="my-5" name="end" label="截止时间">
                <DatePicker solid className="w-400px" />
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
              <Device.iPhoneX>
                <Frame
                  style={{ width: '100%' }}
                  initialContent='<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>'
                  mountTarget="#root"
                >
                  123123123
                </Frame>
              </Device.iPhoneX>
            </div>
          </Form>
          <Button>添加活动</Button>
        </Card.Body>
      </Card>
    </ContentWrapper>
  );
}

export default PageDetails;
