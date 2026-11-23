import type { ImageMetadata } from 'astro';
import avatarImage from '../../images/decorative/avatars/pr1tea_avatar.jpg';

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  /** 显示名称或暱称 */
  name: string;
  /** 头像；留空则不显示 */
  avatar?: ImageMetadata;
  /** 一句简短介绍；留空则不显示 */
  bio?: string;
  /** 个人网站、社群平台等连结；留空则不显示 */
  links?: ProfileLink[];
}

/**
 * 个人名片资料。
 * 只填入你愿意公开的内容；没有填的栏位不会显示。
 * 范例：
 *   bio: '一句简短介绍。',
 *   links: [{ label: 'GitHub', href: 'https://github.com/your-name' }],
 */
export const PROFILE: Profile = {
  name: 'PR1TEA',
  avatar: avatarImage,
  bio: 'I may be paranoid,but not an android.',
  links: [],
};
