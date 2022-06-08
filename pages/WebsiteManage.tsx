import { useCallback, useEffect, useMemo } from 'react';

import type { RouteComponentProps } from 'react-router';
// import Frame from 'react-frame-component';

import WebsiteSidebar from '../components/WebsiteSidebar';

import { useWebsiteQuery } from '../hooks';
import { ContentWrapper } from '@/layouts/components';
import {
  BlockUI,
  Button,
  Card,
  DatePicker,
  Device,
  Form,
  Input,
  Select2,
  Separator,
  Toast,
  Upload,
} from '@/metronic';
import { MicroApp } from '@/layouts/Demo7';

type PageDetailsProps = RouteComponentProps<{ id: string }> & {
  children: React.ReactNode;
};

function PageDetails(props: PageDetailsProps) {
  const { match, history, children, location } = props;
  /*
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

  const [createPage, { loading: createSubmiting }] = useCreatePageMutation({});
  const [updatePage, { loading: updateSubmiting }] = useUpdatePageMutation({}); */

  const isNew = match.params.id == 'new';

  const form = Form.useForm();

  const handleSave = useCallback(async () => {
    const values = await form.validateFields();
    if (isNew) {
      await createPage({
        variables: {
          input: values,
        },
      });
    } else {
      await updatePage({
        variables: {
          id: match.params.id,
          input: values,
        },
      });
    }

    Toast.success(`活动 “${values.name}” ${isNew ? '新增' : '修改'}成功`, 2000, {
      placement: 'bottom-start',
      progressBar: true,
    });

    if (!history.length || isNew) {
      history.replace('/website/landing/pages');
    } else {
      history.go(-2);
    }
  }, [match.params.id, form, history, isNew]);

  useEffect(() => {
    if (match.params.id == 'new') {
      return;
    }
    // const abortController = new AbortController();
    // loadPage({
    //   variables: { id: match.params.id },
    //   context: {
    //     fetchOptions: {
    //       signal: abortController.signal,
    //     },
    //   },
    // }).then(async ({ data }) => {
    //   const page = data?.page;
    //   if (!page) {
    //     await Modal.error({
    //       content: '活动不存在,可能已经被删除了',
    //       timer: 3000,
    //       timerProgressBar: true,
    //     });
    //     if (!!history.length) {
    //       history.goBack();
    //     } else {
    //       history.replace('/website/landing/pages');
    //     }
    //     return;
    //   }
    //   form.setFieldsValue({
    //     ...page,
    //     metadata: { ...page.metadata, thumb: page.metadata?.thumb?.id },
    //     poster: page.poster?.id,
    //     stores: page.stores?.map((it) => it.id),
    //   });
    // });
    // return () => {
    //   abortController.abort();
    // };
  }, [form, history, match.params.id]);

  /*   const stores = useMemo(() => {
    return storeData?.landingStores.edges.map(({ node }) => ({ value: node.id, label: node.name }));
  }, []); */
  /*
  const posters = useMemo(() => {
    return posterData?.landingPosters.edges.map(({ node }) => ({
      value: node.id,
      label: node.name,
    }));
  }, []); */

  const handleSelectStoresAll = useCallback(() => {
    // form.setFieldsValue({ stores: stores.map((node) => node.value) });
  }, [form]);

  return (
    <MicroApp>
      <MicroApp.Sidebar>
        <WebsiteSidebar location={location} id={match.params.id} />
      </MicroApp.Sidebar>
      {children}
    </MicroApp>
  );
}

export default PageDetails;
