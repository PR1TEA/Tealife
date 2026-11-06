/**
 * 站點層級設定。
 * 只放全站共用的資料；個人資料在 src/config/profile.ts。
 */
export const SITE = {
  name: 'Tealife',
  /** 正式網域；尚未提供前留空，避免輸出錯誤的 canonical 連結。 */
  url: '',
  /** 站點描述；尚未提供前留空，避免輸出錯誤的 meta description。 */
  description: '',
  lang: 'zh-Hant',
  /** 網站開始運行的日期（YYYY-MM-DD），由站長提供；第六階段使用。 */
  startDate: '',
} as const;

/** 三個主要內容模組；導覽與首頁入口共用同一份定義。 */
export const SECTIONS = [
  { label: 'Photography', href: '/photography/' },
  { label: 'Moments', href: '/moments/' },
  { label: 'Articles', href: '/articles/' },
] as const;
