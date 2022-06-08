import { useCallback, useEffect, useMemo, useState } from 'react';

import { Icon } from '@asany/icons';
import { matchPath, useHistory } from 'react-router';
import type * as H from 'history';

import { useWebsiteArticleChannelAllLazyQuery, useWebsiteQuery } from '../hooks';

import { BlockUI, Button, Menu } from '@/metronic';
import type { ArticleChannel } from '@/types';
import { tree } from '@/utils';

function renderChannel(item: ArticleChannel, sid: string) {
  if (item.children && item.children.length) {
    return (
      <Menu.SubMenu
        url={`/websites/${sid}/channels/${item.id}`}
        bullet
        key={`channel_${item.id}`}
        icon={item.icon}
        title={item.name}
      >
        {(item.children || []).map((node) => renderChannel(node, sid))}
      </Menu.SubMenu>
    );
  }
  return (
    <Menu.Item
      key={`channel_${item.id}`}
      url={`/websites/${sid}/channels/${item.id}`}
      bullet
      icon={item.icon}
    >
      {item.name}
    </Menu.Item>
  );
}

type WebsiteSidebarProps = {
  location: H.Location<any>;
  id: string;
};

function WebsiteSidebar(props: WebsiteSidebarProps) {
  const { id, location } = props;

  const history = useHistory();

  const menuKey = useMemo(() => {
    const channelMatch = matchPath<{ sid: string; cid: string }>(location.pathname, {
      path: '/websites/:sid/channels/:cid',
      exact: true,
      strict: true,
    });
    if (channelMatch) {
      return `channel_${channelMatch.params.cid}`;
    }
    return 'my-drive';
  }, [location.pathname]);

  const { data, loading } = useWebsiteQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });

  const website = data?.website;
  const rootChannelId = website?.channel.id;

  const [loadChannels, { data: channeslData = { channels: [] }, loading: channelsLoading }] =
    useWebsiteArticleChannelAllLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

  const channels: ArticleChannel[] = useMemo(() => {
    if (!channeslData.channels || !channeslData.channels.length) {
      return [];
    }
    return tree(
      channeslData.channels.map((item: any) => ({ ...item })),
      {
        idKey: 'id',
        childrenKey: 'children',
        pidKey: 'parent.id',
        sort: (left: any, right: any) => left.index - right.index,
      },
    );
  }, [channeslData.channels]);

  useEffect(() => {
    if (!rootChannelId) {
      return;
    }
    loadChannels({ variables: { id: rootChannelId } });
  }, [loadChannels, rootChannelId]);

  const [selectedKey, setSelectedKey] = useState<string>(menuKey);
  const [openKeys, setOpenKeys] = useState<string[]>(channels.map((item) => item.id));

  useEffect(() => {
    if (!menuKey) {
      return;
    }
    setSelectedKey(menuKey);
  }, [menuKey]);

  const handleSelect = useCallback((e) => {
    console.log('selectedKey', e.key);
    setSelectedKey(e.key);
  }, []);

  const handleNewChannel = useCallback(() => {
    history.push(`/websites/${id}/channels/new`);
  }, [history, id]);

  const handleOpenChange = useCallback((keys) => {
    setOpenKeys(keys);
  }, []);

  useEffect(() => {
    setOpenKeys(channels.map((item) => `channel_${item.id}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels.map((item) => item.id).join(',')]);

  console.log('website', website, loading);

  return (
    <BlockUI
      zIndex={10}
      className="my-5 p-5"
      overlayClassName="bg-white bg-opacity-25"
      loading={false}
    >
      <div>
        <h1 className="text-gray-800 fw-bold mx-5">{website?.name || ' '}</h1>
      </div>
      {/* <AsideWorkspace.MenuBar menus={menu?.routes || []} /> */}
      <Menu
        fit
        accordion={false}
        selectable="AllMenu"
        className="menu-title-gray-600 menu-icon-gray-400 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold fs-6 px-6 my-5 my-lg-0"
        selectedKeys={selectedKey ? [selectedKey] : []}
        onSelect={handleSelect}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
      >
        <Menu.Section className="pt-8 pb-2" key="website-manage-section" title="网站管理" />
        <Menu.Item bullet={true} key="websites" icon="" title="网站列表" url="" />
        <Menu.Section className="pt-8 pb-0 d-flex align-items-center">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1 flex-row-fluid">
            栏目 {channelsLoading && ' - loading...'}
          </span>
          <Button
            icon={<Icon style={{ marginRight: '.2rem' }} name="Duotune/arr087" className="" />}
            size="sm"
            variant="white"
            className="py-1 px-3 me-n4"
            onClick={handleNewChannel}
          >
            新增
          </Button>
        </Menu.Section>
        {channels.map((item) => renderChannel(item, id))}
      </Menu>
    </BlockUI>
  );
}

export default WebsiteSidebar;
