export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  /** 顯示名稱或暱稱 */
  name: string;
  /** 頭像；留空則不顯示 */
  avatar?: string;
  /** 一句簡短介紹；留空則不顯示 */
  bio?: string;
  /** 個人網站、社群平台等連結；留空則不顯示 */
  links?: ProfileLink[];
}

/**
 * 個人名片資料。
 * 只填入你願意公開的內容；沒有填的欄位不會顯示。
 * 範例：
 *   bio: '一句簡短介紹。',
 *   links: [{ label: 'GitHub', href: 'https://github.com/your-name' }],
 */
export const PROFILE: Profile = {
  name: '',
  avatar: '',
  bio: '',
  links: [],
};
