/**
 * 站点层级设定。
 * 只放全站共用的资料；个人资料在 src/config/profile.ts。
 */
export const SITE = {
  name: 'Tealife',
  /** 正式网域；尚未提供前留空，避免输出错误的 canonical 连结。 */
  url: '',
  /** 站点描述；尚未提供前留空，避免输出错误的 meta description。 */
  description: '',
  lang: 'zh-Hant',
  /** 网站开始运行的日期（YYYY-MM-DD），由站长提供；第六阶段使用。 */
  startDate: '',
} as const;

/** 四个主要内容模组；导览与首页入口共用同一份定义。 */
export const SECTIONS = [
  { label: 'Photography', href: '/photography/' },
  { label: 'Moments', href: '/moments/' },
  { label: 'Articles', href: '/articles/' },
  { label: 'Friends', href: '/friends/' },
] as const;
