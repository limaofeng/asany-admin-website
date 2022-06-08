import { component, library } from 'sunmao';
import { dynamic } from 'umi';

import LoadingComponent from '@/components/PageLoading';

import './style/Landing.scss';

@library({
  name: 'website',
  description: '',
  namespace: 'cn.asany.ui.admin.website',
})
class Website {
  @component()
  WebsiteList = dynamic({
    loader: () => import('./pages/WebsiteList'),
    loading: LoadingComponent,
  });
  @component()
  WebsiteManage = dynamic({
    loader: () => import('./pages/WebsiteManage'),
    loading: LoadingComponent,
  });
}

export default new Website();
