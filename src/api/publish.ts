import type { ApiResponse } from './types'
import { get } from './request'

export interface PublishTagsResponse {
  tags: string[]
}

export function getPublishTags(): Promise<ApiResponse<PublishTagsResponse>> {
  return get('/publish/tags')
}
