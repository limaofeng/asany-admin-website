import { component, library } from 'sunmao';

import WebSiteSidebar from './components/WebSiteSidebar';
import {
  PageDetails,
  PageList,
  PosterDetails,
  PosterList,
  StoreDetails,
  StoreList,
} from './pages/landing';

@library({
  name: 'website',
  description: '',
  namespace: 'cn.asany.ui.admin.website',
})
class Website {
  @component()
  Sidebar = WebSiteSidebar;
  @component({ name: 'landing.PageList' })
  PageList = PageList;
  @component({ name: 'landing.PageDetails' })
  PageDetails = PageDetails;
  @component({ name: 'landing.PosterList' })
  PosterList = PosterList;
  @component({ name: 'landing.PosterDetails' })
  PosterDetails = PosterDetails;
  @component({ name: 'landing.StoreList' })
  StoreList = StoreList;
  @component({ name: 'landing.StoreDetails' })
  StoreDetails = StoreDetails;
}

export default new Website();
