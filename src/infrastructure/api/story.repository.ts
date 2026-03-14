import httpClient from './http.client'
import type { IStoryRepository } from '@/core/repository/IStoryRepository'
import type { Story, StoryDetail, StoryFilter, StoryFormPayload } from '@/core/domain/story'
import type { ApiResponse, PaginatedResponse } from '@/core/domain/common'

class StoryRepository implements IStoryRepository {
  async getAll(filter: StoryFilter): Promise<PaginatedResponse<StoryDetail>> {
    const params = new URLSearchParams()
    if (filter.search)      params.set('search', filter.search)
    if (filter.category_id) params.set('category_id', filter.category_id)
    if (filter.status)      params.set('status', filter.status)
    if (filter.page)        params.set('page', String(filter.page))
    if (filter.limit)       params.set('limit', String(filter.limit))

    const res = await httpClient.get(`/stories?${params.toString()}`)
    return res.data
  }

  async getByID(id: string): Promise<ApiResponse<StoryDetail>> {
    const res = await httpClient.get(`/stories/${id}`)
    return res.data
  }

  async create(payload: StoryFormPayload): Promise<ApiResponse<Story>> {
    const form = this.toFormData(payload)
    const res = await httpClient.post('/stories', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  }

  async update(id: string, payload: StoryFormPayload): Promise<ApiResponse<Story>> {
    const form = this.toFormData(payload)
    const res = await httpClient.put(`/stories/${id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const res = await httpClient.delete(`/stories/${id}`)
    return res.data
  }

  private toFormData(payload: StoryFormPayload): FormData {
    const form = new FormData()
    if (payload.category_id)  form.append('category_id', payload.category_id)
    form.append('title', payload.title)
    form.append('author', payload.author)
    if (payload.synopsis)     form.append('synopsis', payload.synopsis)
    form.append('status', payload.status)
    payload.tag_ids?.forEach((id) => form.append('tag_ids', id))
    if (payload.cover)        form.append('cover', payload.cover)
    return form
  }
}

export const storyRepository = new StoryRepository()