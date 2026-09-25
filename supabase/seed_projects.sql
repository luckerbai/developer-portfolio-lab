-- ============================================
-- Seed: 真实项目数据（2 条）
-- 用途：在 Supabase SQL Editor 执行，为 projects 表填充真实项目
-- ============================================

-- 项目 1：Developer Portfolio Lab（平台自身）
INSERT INTO projects (
  slug, title, summary, description, cover_url, role, duration,
  tech_stack, problem, solution, architecture, technical_decisions,
  engineering_checklist, performance_metrics, demo_url, github_url,
  status, featured, order_index
) VALUES (
  'developer-portfolio-lab',
  'Developer Portfolio Lab',
  '面向招聘者、技术面试官和开发者的现代化个人开发者平台，集成在线简历、项目作品集、Frontend Lab、技术文章与后台内容管理能力。',
  '一个以展示完整现代 Web 前端工程能力为目标的个人开发者平台：通过真实的组件交互、异步数据、状态管理、表单、测试、性能优化和 CI/CD 呈现生产级工程实践。前端采用 Vue 3 Composition API、TypeScript、Vite、Vue Router、Pinia、Tailwind CSS、shadcn-vue、VueUse，结合 TanStack Query、Zod、Supabase 构建。',
  NULL,
  '独立全栈开发（Frontend-Focused）',
  '2026 Q3 — 进行中',
  ARRAY['Vue 3', 'TypeScript', 'Vite', 'Vue Router', 'Pinia', 'Tailwind CSS', 'TanStack Query', 'Zod', 'Supabase', 'Vitest', 'VueUse'],
  '个人开发者展示工程能力时，传统简历和静态作品集无法体现真实的现代 Web 工程水平——异步数据、状态管理、测试体系、CI/CD、性能优化这些招聘者真正关心的能力没有地方可验证。',
  '构建一个生产级平台：Feature-based 架构 + 轻量分层；在线简历三视图（Recruiter/Detail/Print）；Frontend Lab 六个真实交互实验（10 万条虚拟滚动、拖拽看板、命令面板等）；Supabase 全栈后台（7 张表 RLS + Auth + CRUD）；i18n 双语；暗色模式；Zod 表单校验；Vitest 单元测试；GitHub Actions CI/CD。',
  'Feature-based 目录 + 轻量分层（Pragmatic Clean）。依赖单向流动：入口 → 页面 → Feature → 共享组件/Composables → Service 层 → Supabase。不上完整 Clean Architecture、不用 MVI，避免过度设计。',
  '[
    {"decision": "Feature-based 目录结构", "reason": "按业务模块聚合，高内聚；新增功能不跨目录散落代码"},
    {"decision": "轻量分层而非完整 Clean Architecture", "reason": "项目规模不需要六边形架构的复杂度，分层太深反而降低开发效率"},
    {"decision": "Pinia + TanStack Query 分离客户端/服务端状态", "reason": "服务端状态缓存、失效、重试交给 TanStack Query，Pinia 只管 UI 状态"},
    {"decision": "Zod 作为 schema 单一事实源", "reason": "表单校验与类型推导共用一份 schema，避免类型漂移"},
    {"decision": "Supabase RLS + Auth 而非自建后端", "reason": "7 张表全部 RLS：公开读 + 认证用户写，安全模型声明式表达"}
  ]',
  '[
    {"item": "ESLint 10 flat config + Prettier，lint/type-check/test/build 全绿"},
    {"item": "35+ 单元测试（Vitest），覆盖 composables/组件/Service 层"},
    {"item": "所有文本 i18n 双语（zh-CN/en-US），浏览器语言自动检测"},
    {"item": "路由级代码分割，全部页面动态 import"},
    {"item": "GitHub Actions CI：lint + test + build"}
  ]',
  '[
    {"metric": "主 bundle", "value": "370KB（gzip 109KB）", "note": "路由级代码分割后各页面按需加载"},
    {"metric": "虚拟列表", "value": "100,000 条数据流畅滚动", "note": "纯手写虚拟滚动，DOM 节点恒定"},
    {"metric": "测试", "value": "35 tests / 6 files", "note": "单元测试全绿"},
    {"metric": "Lighthouse", "value": "≥90 目标", "note": "Phase 5 可访问性 + 性能优化目标"}
  ]',
  NULL,
  'https://github.com/luckerbai/developer-portfolio-lab',
  'published',
  true,
  0
);

-- 项目 2：Weekly Digest CLI
INSERT INTO projects (
  slug, title, summary, description, cover_url, role, duration,
  tech_stack, problem, solution, architecture, technical_decisions,
  engineering_checklist, performance_metrics, demo_url, github_url,
  status, featured, order_index
) VALUES (
  'weekly-digest-cli',
  'Weekly Digest CLI',
  '把你想关注的 GitHub 仓库和 Hacker News 关键词，变成一份干净 Markdown 摘要的命令行工具。',
  '开发者的信息获取痛点：每天被动刷 GitHub / Hacker News 找信息。Weekly Digest CLI 让用户配置一次关注列表，之后每周自动收到摘要——仓库 Star 趋势、最新 Release、最近提交、关键词命中的 HN 热帖。四条命令：init（交互式配置）、run（生成摘要）、preview（终端预览）、schedule（生成 GitHub Actions 定时任务）。',
  NULL,
  '独立开发者',
  '2026 Q3 — 1 周交付',
  ARRAY['Node.js', 'TypeScript', '@clack/prompts', 'Commander', 'Zod', 'undici', 'Vitest', 'GitHub Actions'],
  '开发者每天在 GitHub / Hacker News 上被动刷信息，浪费时间。手动跟踪仓库更新、Release、热帖既繁琐又容易漏掉重点。',
  '一条命令生成摘要：digest init 交互式配置 → digest run 抓取 GitHub REST API + HN Firebase API → 输出结构化 Markdown。支持 HTTPS_PROXY 环境变量（国内开发者必需）、GitHub Actions 定时自动生成、npm 可发布。',
  '入口 → 命令层 → 服务层 → 配置层，依赖单向流动。配置层用 Zod 4 作为单一事实源，类型由 schema 推导。',
  '[
    {"decision": "undici 统一 fetch 出口", "reason": "setGlobalDispatcher 与 fetch 同实例，代理配置才能真正生效（Node 全局 fetch 与 undici 实例独立）"},
    {"decision": "Zod 4 配置 schema 单一事实源", "reason": "digest.config.json 校验失败时给出可读错误路径，类型与校验不漂移"},
    {"decision": "@clack/prompts 交互层", "reason": "现代 CLI 体验（类似 Raycast），比手写 readline 更专业"},
    {"decision": "GitHub API 并发批次限制为 4", "reason": "无认证限流 60 次/小时，批次并发避免触发 403"},
    {"decision": "代理支持识别 HTTPS_PROXY/HTTP_PROXY/ALL_PROXY", "reason": "国内开发者访问 GitHub/HN 的真实需求，开箱即用"}
  ]',
  '[
    {"item": "35 个单元测试（Vitest），mock 网络层验证抓取逻辑"},
    {"item": "tsc 严格模式（noUncheckedIndexedAccess）"},
    {"item": "GitHub Actions CI：type-check + test + build"},
    {"item": "npm 可发布（bin 入口 + files 白名单 + dist 产物）"}
  ]',
  '[
    {"metric": "抓取并发", "value": "批次 4 请求", "note": "平衡速度与 GitHub 限流"},
    {"metric": "测试", "value": "35 tests / 6 files", "note": "schema/loader/service/digest/format 全覆盖"},
    {"metric": "命令数", "value": "5 条（init/run/preview/schedule/config）", "note": "单文件命令，高内聚"}
  ]',
  NULL,
  'https://github.com/luckerbai/weekly-digest-cli',
  'published',
  true,
  1
);
