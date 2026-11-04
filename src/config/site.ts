/**
 * 站點層級設定。
 * 只放全站共用的資料；個人資料留到第二階段，由實際內容提供後再加入。
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
