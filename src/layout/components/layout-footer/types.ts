import type { Component, VNode } from 'vue'

export interface FooterMenuProp {
  path: string
  icon: VNode | Component
  label: string
  badge?: number
}
