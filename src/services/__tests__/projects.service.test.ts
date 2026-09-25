import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock supabase 模块：链式 builder 模式
const mockFrom = vi.hoisted(() => vi.fn())

vi.mock('@/app/supabase', () => ({
  supabase: { from: mockFrom },
}))

import {
  getProjects,
  getProjectBySlug,
  getProjectById,
  getFeaturedProjects,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../projects.service'

interface MockResult {
  data: unknown
  error: unknown
}

/** 链式 builder mock：中间方法返回 chain 自身；chain 携带 data/error 供 await 解构 */
function buildChain(result: MockResult) {
  const chain = {
    data: result.data,
    error: result.error,
    select: vi.fn(),
    eq: vi.fn(),
    order: vi.fn(),
    single: vi.fn().mockResolvedValue(result),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }
  chain.select.mockReturnValue(chain)
  chain.eq.mockReturnValue(chain)
  chain.order.mockReturnValue(chain)
  chain.insert.mockReturnValue(chain)
  chain.update.mockReturnValue(chain)
  chain.delete.mockReturnValue(chain)
  return chain
}

const sampleProject = {
  id: 'p1',
  slug: 'developer-portfolio-lab',
  title: 'Developer Portfolio Lab',
  summary: 'Test summary',
  tech_stack: ['Vue 3', 'TypeScript'],
  status: 'published',
  featured: true,
  order_index: 0,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('projects.service', () => {
  it('getProjects queries published projects ordered by order_index', async () => {
    const chain = buildChain({ data: [sampleProject], error: null })
    mockFrom.mockReturnValue(chain)

    const result = await getProjects()

    expect(result).toEqual([sampleProject])
    expect(mockFrom).toHaveBeenCalledWith('projects')
    expect(chain.eq).toHaveBeenCalledWith('status', 'published')
    expect(chain.order).toHaveBeenCalledWith('order_index', { ascending: true })
  })

  it('getProjects throws when supabase returns error', async () => {
    const chain = buildChain({ data: null, error: new Error('DB down') })
    mockFrom.mockReturnValue(chain)

    await expect(getProjects()).rejects.toThrow('DB down')
  })

  it('getProjectBySlug queries single published project by slug', async () => {
    const chain = buildChain({ data: sampleProject, error: null })
    mockFrom.mockReturnValue(chain)

    const result = await getProjectBySlug('developer-portfolio-lab')

    expect(result).toEqual(sampleProject)
    expect(chain.eq).toHaveBeenCalledWith('slug', 'developer-portfolio-lab')
    expect(chain.eq).toHaveBeenCalledWith('status', 'published')
    expect(chain.single).toHaveBeenCalled()
  })

  it('getFeaturedProjects filters by published + featured', async () => {
    const chain = buildChain({ data: [sampleProject], error: null })
    mockFrom.mockReturnValue(chain)

    const result = await getFeaturedProjects()

    expect(result).toHaveLength(1)
    expect(chain.eq).toHaveBeenCalledWith('featured', true)
  })

  it('getAllProjects includes drafts (no status filter)', async () => {
    const chain = buildChain({ data: [sampleProject, { ...sampleProject, id: 'p2' }], error: null })
    mockFrom.mockReturnValue(chain)

    const result = await getAllProjects()

    expect(result).toHaveLength(2)
    // 不应调用 eq('status', ...)
    expect(chain.eq).not.toHaveBeenCalled()
  })

  it('createProject inserts and selects single', async () => {
    const chain = buildChain({ data: sampleProject, error: null })
    mockFrom.mockReturnValue(chain)

    const result = await createProject({ title: 'New Project' })

    expect(result).toEqual(sampleProject)
    expect(chain.insert).toHaveBeenCalledWith({ title: 'New Project' })
    expect(chain.select).toHaveBeenCalled()
    expect(chain.single).toHaveBeenCalled()
  })

  it('updateProject updates by id and selects single', async () => {
    const chain = buildChain({ data: sampleProject, error: null })
    mockFrom.mockReturnValue(chain)

    const result = await updateProject('p1', { title: 'Updated' })

    expect(result).toEqual(sampleProject)
    expect(chain.update).toHaveBeenCalledWith({ title: 'Updated' })
    expect(chain.eq).toHaveBeenCalledWith('id', 'p1')
  })

  it('deleteProject deletes by id without selecting', async () => {
    const chain = buildChain({ data: null, error: null })
    mockFrom.mockReturnValue(chain)

    await deleteProject('p1')

    expect(chain.delete).toHaveBeenCalled()
    expect(chain.eq).toHaveBeenCalledWith('id', 'p1')
    expect(chain.select).not.toHaveBeenCalled()
  })

  it('deleteProject throws on error', async () => {
    const chain = buildChain({ data: null, error: new Error('forbidden') })
    mockFrom.mockReturnValue(chain)

    await expect(deleteProject('p1')).rejects.toThrow('forbidden')
  })

  it('getProjectById queries single by id', async () => {
    const chain = buildChain({ data: sampleProject, error: null })
    mockFrom.mockReturnValue(chain)

    const result = await getProjectById('p1')

    expect(result).toEqual(sampleProject)
    expect(chain.eq).toHaveBeenCalledWith('id', 'p1')
    expect(chain.single).toHaveBeenCalled()
  })
})
