import type { TdNavbarProps } from 'tdesign-mobile-vue'

export interface BannerProps extends TdNavbarProps {
  func?: 'back' | 'menu' | 'none'
  border?: boolean
  transparent?: boolean
}
