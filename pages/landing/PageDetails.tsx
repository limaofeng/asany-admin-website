import { useCallback, useEffect, useMemo } from 'react';

import type { RouteComponentProps } from 'react-router';
import Frame from 'react-frame-component';

import {
  useCreatePageMutation,
  useLandingPageLazyQuery,
  useLandingPostersQuery,
  useLandingStoresQuery,
  useUpdatePageMutation,
} from '../../hooks';

import { ContentWrapper } from '@/layouts/components';
import {
  BlockUI,
  Button,
  Card,
  DatePicker,
  Device,
  Form,
  Input,
  Modal,
  Select2,
  Toast,
} from '@/metronic';

type PageDetailsProps = RouteComponentProps<{ id: string }>;

function PageDetails(props: PageDetailsProps) {
  const { match, history } = props;

  const { data: storeData } = useLandingStoresQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize: 1000,
    },
  });
  const { data: posterData } = useLandingPostersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize: 1000,
    },
  });

  const [loadPage, { data: viewData, loading: getLoading }] = useLandingPageLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [createPage, { loading: createSubmiting }] = useCreatePageMutation({});
  const [updatePage, { loading: updateSubmiting }] = useUpdatePageMutation({});

  const isNew = match.params.id == 'new';

  const form = Form.useForm();

  const handleSave = useCallback(async () => {
    const { start, end, ...values } = await form.validateFields();
    if (isNew) {
      await createPage({
        variables: {
          input: {
            ...values,
            start: start && start.isValid() ? start.toString() : undefined,
            end: end && end.isValid() ? end.toString() : undefined,
          },
        },
      });
    } else {
      await updatePage({
        variables: {
          id: match.params.id,
          input: {
            ...values,
            start: start && start.isValid() ? start.toString() : undefined,
            end: end && end.isValid() ? end.toString() : undefined,
          },
        },
      });
    }

    Toast.success(`活动 “${values.name}” ${isNew ? '新增' : '修改'}成功`, 2000, {
      placement: 'bottom-start',
      progressBar: true,
    });

    if (!!history.length) {
      history.goBack();
    } else {
      history.replace('/website/landing/pages');
    }
  }, [createPage, match.params.id, form, history, isNew, updatePage]);

  useEffect(() => {
    if (match.params.id == 'new') {
      return;
    }
    const abortController = new AbortController();
    loadPage({
      variables: { id: match.params.id },
      context: {
        fetchOptions: {
          signal: abortController.signal,
        },
      },
    }).then(async ({ data }) => {
      const page = data?.page;
      if (!page) {
        await Modal.error({
          content: '活动不存在,可能已经被删除了',
          timer: 3000,
          timerProgressBar: true,
        });
        if (!!history.length) {
          history.goBack();
        } else {
          history.replace('/website/landing/pages');
        }
        return;
      }
      form.setFieldsValue({
        ...page,
        poster: page.poster?.id,
        stores: page.stores?.map((it) => it.id),
      });
    });
    return () => {
      abortController.abort();
    };
  }, [form, loadPage, history, match.params.id]);

  const stores = useMemo(() => {
    return storeData?.landingStores.edges.map(({ node }) => ({ value: node.id, label: node.name }));
  }, [storeData]);

  const posters = useMemo(() => {
    return posterData?.landingPosters.edges.map(({ node }) => ({
      value: node.id,
      label: node.name,
    }));
  }, [posterData]);

  return (
    <ContentWrapper header={isNew ? { title: '新增活动' } : undefined} footer={false}>
      <Card className="mb-5 mb-xl-10">
        <Card.Header>
          <Card.Title>{isNew ? '新增活动' : viewData?.page?.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <BlockUI zIndex={10} overlayClassName="bg-white bg-opacity-25" loading={getLoading}>
            <Form
              form={form}
              className="w-800px row d-flex flex-shrink-0 flex-column-reverse flex-md-row"
            >
              <div className="col-12 col-md-8">
                <Form.Item
                  className="mb-5"
                  name="name"
                  label="名称"
                  rules={[{ required: true, message: '名称不能为空' }]}
                >
                  <Input solid className="w-400px" />
                </Form.Item>
                <Form.Item className="my-5" name="poster" label="海报">
                  <Select2 solid className="w-400px" options={posters} />
                </Form.Item>
                <Form.Item className="my-5" name="stores" label="参加活动的门店">
                  <Select2 solid multiple className="w-400px" options={stores} />
                </Form.Item>
                <Form.Item className="my-5" name="start" label="开始时间">
                  <DatePicker solid className="w-400px" />
                </Form.Item>
                <Form.Item dependencies={['start']} noStyle={true}>
                  {() => {
                    console.log('start', form.getFieldValue('start'), form.getFieldsValue());
                    return (
                      <Form.Item className="my-5" name="end" label="截止时间">
                        <DatePicker
                          solid
                          minDate={form.getFieldValue('start')}
                          className="w-400px"
                        />
                      </Form.Item>
                    );
                  }}
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
                    <span>123123123</span>
                  </Frame>
                </Device.iPhoneX>
              </div>
            </Form>
          </BlockUI>
          <Button loading={getLoading || createSubmiting || updateSubmiting} onClick={handleSave}>
            {isNew ? <>添加活动</> : <>修改活动</>}
          </Button>
        </Card.Body>
      </Card>
    </ContentWrapper>
  );
}

export default PageDetails;
