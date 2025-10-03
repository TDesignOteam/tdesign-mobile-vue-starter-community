import type { AreaList } from '../views/edit/types'

export async function loadAreaList(): Promise<AreaList[]> {
  const { getPCA } = await import('lcn')
  const result = getPCA({
    inland: true, // 仅包含大陆地区
    fieldNames: {
      code: 'value',
      name: 'label',
      children: 'children',
    },
  }) as AreaList[]
  return result
}
