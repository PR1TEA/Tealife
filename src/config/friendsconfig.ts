/** 友鏈資料；新增朋友時只需要修改這個檔案。 */
export interface FriendLink {
  /** 朋友名稱 */
  title: string;
  /** 頭像 URL */
  imgurl: string;
  /** 名稱下方的簡介 */
  desc: string;
  /** 點擊卡片後前往的網址 */
  siteurl: string;
  /** 標籤；目前只用於整理，頁面不顯示 */
  tags?: string[];
  /** 排序權重；數字越大越前面 */
  weight?: number;
  /** 是否顯示；預設 true */
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
