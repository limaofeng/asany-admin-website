import { component, library } from 'sunmao';

@library({
  name: 'website',
  description: '',
  namespace: 'cn.asany.ui.admin.website',
})
class Website {
  @component()
  index = () => '12312313';
}

export default new Website();
