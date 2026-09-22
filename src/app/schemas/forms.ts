import { z } from 'zod'

// Project 表单 Schema
export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers and hyphens only'),
  summary: z.string().max(200).optional(),
  description: z.string().optional(),
  role: z.string().optional(),
  duration: z.string().optional(),
  tech_stack: z.array(z.string()).default([]),
  problem: z.string().optional(),
  solution: z.string().optional(),
  architecture: z.string().optional(),
  demo_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  github_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  status: z.enum(['draft', 'published']).default('draft'),
  featured: z.boolean().default(false),
  order_index: z.number().default(0),
})

export type ProjectForm = z.infer<typeof projectSchema>

// Article 表单 Schema
export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers and hyphens only'),
  excerpt: z.string().max(200).optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']).default('draft'),
  published_at: z.string().optional(),
})

export type ArticleForm = z.infer<typeof articleSchema>

// Experience 表单 Schema
export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  period: z.string().min(1, 'Period is required'),
  tech_stack: z.array(z.string()).default([]),
})

export type ExperienceForm = z.infer<typeof experienceSchema>

// Skill 表单 Schema
export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  level: z.number().min(1).max(5).default(3),
})

export type SkillForm = z.infer<typeof skillSchema>

// Login 表单 Schema
export const loginSchema = z.object({
  email: z.string().email('Must be a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginForm = z.infer<typeof loginSchema>
