import { useCallback, useEffect } from 'react';

import type { RouteComponentProps } from 'react-router';

import {
  useCreateStoreMutation,
  useLandingStoreLazyQuery,
  useUpdateStoreMutation,
} from '../../hooks';

import { ContentWrapper } from '@/layouts/components';
import { AreaPicker, BlockUI, Button, Card, Form, Input, Modal, Toast, Upload } from '@/metronic';

type StoreDetailsProps = RouteComponentProps<{ id: string }>;

function StoreDetails(props: StoreDetailsProps) {
  const { match, history } = props;

  const [loadStore, { data: viewData, loading: getLoading }] = useLandingStoreLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [createStore, { loading: createSubmiting }] = useCreateStoreMutation({});
  const [updateStore, { loading: updateSubmiting }] = useUpdateStoreMutation({});

  const isNew = match.params.id == 'new';

  const form = Form.useForm();

  const handleSave = useCallback(async () => {
    const { detailedAddress, location = [], ...values } = await form.validateFields();

    const [street, district, city, province] = [...location].reverse();

    const _location = {
      detailedAddress,
      street,
      district,
      city,
      province,
    };

    if (isNew) {
      await createStore({
        variables: {
          input: {
            ...values,
            location: _location,
          },
        },
      });
    } else {
      await updateStore({
        variables: {
          id: match.params.id,
          input: {
            ...values,
            location: _location,
          },
        },
      });
    }

    Toast.success(`门店 “${values.name}” ${isNew ? '新增' : '修改'}成功`, 2000, {
      placement: 'bottom-start',
      progressBar: true,
    });

    if (!!history.length) {
      history.goBack();
    } else {
      history.replace('/website/landing/stores');
    }
  }, [createStore, match.params.id, form, history, isNew, updateStore]);

  useEffect(() => {
    if (match.params.id == 'new') {
      return;
    }
    const abortController = new AbortController();
    loadStore({
      variables: { id: match.params.id },
      context: {
        fetchOptions: {
          signal: abortController.signal,
        },
      },
    }).then(async ({ data }) => {
      console.log('loadStore', data?.store);
      const store = data?.store;
      if (!store) {
        await Modal.error({
          content: '门店不存在,可能已经被删除了',
          timer: 3000,
          timerProgressBar: true,
        });
        if (!!history.length) {
          history.goBack();
        } else {
          history.replace('/website/landing/stores');
        }
        return;
      }
      const { province, city, district, street, detailedAddress } = store.location || {};
      const location = store.location
        ? [province, city, district, street].filter((item) => !!item)
        : [];
      form.setFieldsValue({
        ...store,
        location: location,
        detailedAddress,
        qrCode: store.qrCode?.id,
      });
    });
    return () => {
      abortController.abort();
    };
  }, [form, loadStore, history, match.params.id]);

  return (
    <ContentWrapper header={isNew ? { title: '新增门店' } : undefined} footer={false}>
      <Card className="mb-5 mb-xl-10">
        <Card.Header>
          <Card.Title>{isNew ? '新增门店' : viewData?.store?.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <BlockUI overlayClassName="bg-white bg-opacity-25" loading={getLoading}>
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
                <Form.Item className="my-5" name="location" label="门店位置">
                  <AreaPicker solid className="w-400px" placeholder="--请选择--" />
                </Form.Item>
                <Form.Item className="my-5" name="detailedAddress" label="详细地址">
                  <Input solid className="w-400px" />
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
          </BlockUI>
          <Button loading={getLoading || createSubmiting || updateSubmiting} onClick={handleSave}>
            {isNew ? <>添加门店</> : <>修改门店信息</>}
          </Button>
        </Card.Body>
      </Card>
    </ContentWrapper>
  );
}

export default StoreDetails;
