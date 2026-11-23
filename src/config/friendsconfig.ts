/** 友链资料；新增朋友时只需要修改这个档案。 */
export interface FriendLink {
  /** 朋友名称 */
  title: string;
  /** 头像 URL */
  imgurl: string;
  /** 名称下方的简介 */
  desc: string;
  /** 点击卡片后前往的网址 */
  siteurl: string;
  /** 标签；目前只用于整理，页面不显示 */
  tags?: string[];
  /** 排序权重；数字越大越前面 */
  weight?: number;
  /** 是否显示；预设 true */
  enabled?: boolean;
}

export const friendsConfig: FriendLink[] = [
  {
    title: '鼠子',
    imgurl: 'https://blog.miomoe.cn/favicon.ico',
    desc: '欢迎来到鼠子YuiNijika的朋友圈！',
    siteurl: 'https://blog.miomoe.cn/',
    tags: ['Blog'],
    weight: 10,
    enabled: true,
  },
];
