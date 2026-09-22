# Developer Portfolio Lab — Git 任务拆分与里程碑

> **版本**：v1.0  
> **日期**：2026-09-22  
> **说明**：本文档定义开发分支策略、阶段里程碑、任务拆分规范和 Git 提交规范。

---

## 一、分支策略

### 1.1 分支模型

```
main (生产)
  │
  └── develop (集成)
        │
        ├── feature/project-detail       # 功能分支
        ├── feature/dark-mode
        ├── fix/query-cache-bug
        └── chore/eslint-flat-config
```

### 1.2 分支命名规范

| 类型 | 命名格式 | 示例 |
|------|---------|------|
| 新功能 | `feature/<模块>-<简述>` | `feature/project-detail-page` |
| 修复 | `fix/<模块>-<问题简述>` | `fix/query-cache-invalidation` |
| 重构 | `refactor/<模块>-<简述>` | `refactor/service-layer-types` |
| 性能优化 | `perf/<模块>-<简述>` | `perf/lazy-load-images` |
| 测试 | `test/<模块>-<简述>` | `test/project-filter-coverage` |
| 工程化 | `chore/<简述>` | `chore/eslint-flat-config` |
| 文档 | `docs/<简述>` | `docs/architecture-overview` |

### 1.3 分支操作规则

- **main**：受保护分支，仅通过 PR 合并，始终保持可部署状态
- **develop**：集成分支，日常开发从这里拉出 feature 分支
- **feature / fix 分支**：完成后发 PR 到 develop，Code Review 通过后合并
- 每个 PR 只做一件事，大小控制在合理范围（建议 < 800 行变更）

---

## 二、里程碑规划（Phase 0 - Phase 6）

### Phase 0：Product Definition（产品定义）

**目标**：完成全部产品定义与技术方案，可直接进入开发。

| Task ID | 任务 | 产出物 | 预估工作量 |
|---------|------|--------|-----------|
| 0.1 | 编写正式 PRD | `docs/01-PRD-产品需求文档.md` | ✅ 已完成 |
| 0.2 | 编写页面原型结构 | `docs/02-页面原型结构.md` | ✅ 已完成 |
| 0.3 | 编写技术架构设计 | `docs/03-技术架构设计.md` | ✅ 已完成 |
| 0.4 | 编写数据库设计 | `docs/04-数据库设计.md` | ✅ 已完成 |
| 0.5 | 编写 Git 任务拆分 | `docs/05-Git任务拆分与里程碑.md` | ✅ 已完成 |
| 0.6 | 编写 AI Coding 执行规范 | `docs/06-AI-Coding执行规范.md` | ✅ 已完成 |
| 0.7 | 创建 GitHub 仓库 + 初始化 README | 公开仓库 + 基础 README | 0.5h |
| 0.8 | 创建 ADR 目录与初始模板 | `docs/adr/` | 0.5h |

---

### Phase 1：Foundation（工程基座）

**目标**：搭建完整的前端工程基础设施，跑通从开发到构建的全流程。

| Task ID | 任务 | 关键产出 | 依赖 |
|---------|------|---------|------|
| 1.1 | 项目脚手架初始化 | Vite + Vue 3 + TypeScript + 目录结构 | — |
| 1.2 | 配置 ESLint 10 flat config + Prettier | `.eslint.config.js` + `.prettierrc` | 1.1 |
| 1.3 | 集成 Vue Router + 基础路由表 | `app/router/` + 基础路由 | 1.1 |
| 1.4 | 集成 Pinia + 主题 Store | `stores/theme.store.ts` | 1.1 |
| 1.5 | 集成 Tailwind CSS + shadcn-vue | 设计系统基础 + 核心 UI 组件 | 1.1 |
| 1.6 | 实现 App Shell + 全局布局 | AppHeader / AppFooter / AppLayout | 1.3, 1.5 |
| 1.7 | 实现暗色模式（Light/Dark/System） | `useTheme` composable + CSS 变量 | 1.4, 1.5 |
| 1.8 | 响应式导航（Mobile 汉堡菜单） | 移动端导航抽屉 | 1.6 |
| 1.9 | 配置 Vitest + 基础测试用例 | 测试框架 + 示例测试 | 1.1 |
| 1.10 | 配置 GitHub Actions CI 基础流水线 | lint + type-check + test + build | 1.2, 1.9 |
| 1.11 | 配置环境变量与 Vite 配置 | `.env.example` + `vite.config.ts` | 1.1 |
| 1.12 | 完成 README 骨架 | 项目基本说明 + 本地开发指引 | 全部 |

**验收标准**：
- `npm run dev` 启动正常，首页有基础布局
- `npm run lint` / `npm run type-check` / `npm run test` / `npm run build` 全部通过
- GitHub PR 能触发 CI 流水线

---

### Phase 2：核心公开站点

**目标**：完成 5 个核心页面，让网站成为一个优秀的个人主页。

| Task ID | 任务 | 关键产出 | 依赖 |
|---------|------|---------|------|
| 2.1 | 首页 Hero 区域 | Hero 组件 + CTA 按钮组 | 1.6 |
| 2.2 | 首页 Selected Projects 区块 | ProjectCard 组件 + 网格布局 | 2.1 |
| 2.3 | 首页 Engineering 能力矩阵 | 能力矩阵区块 | 2.1 |
| 2.4 | 首页 Lab 预览 + Resume 预览 | 两个底部区块 | 2.1 |
| 2.5 | 在线简历 Recruiter View | 简历主视图（静态数据） | 1.6 |
| 2.6 | 简历 Detailed View 展开 | 点击展开详细内容 | 2.5 |
| 2.7 | 简历 Print View + @media print | 打印样式 + 打印按钮 | 2.5 |
| 2.8 | 项目列表页（静态数据版） | 卡片列表 + 搜索 + 筛选 + 分页 | 1.6 |
| 2.9 | 项目详情页布局 | 完整 7 个区块静态展示 | 2.8 |
| 2.10 | About 页 | 个人简介 + 联系方式 | 1.6 |
| 2.11 | 404 页面 | 友好的 404 页 | 1.3 |
| 2.12 | SEO Meta 基础 | 每个页面的 title/description | 全部页面 |

**验收标准**：
- 5 个主入口页面全部可访问
- 简历打印输出干净的 A4 效果
- 移动端响应式正常

---

### Phase 3：Frontend Lab 工程展示

**目标**：完成 6 个高质量实验模块，展示前端工程深度。

| Task ID | 任务 | 关键产出 | 依赖 |
|---------|------|---------|------|
| 3.1 | Lab 入口页 | 6 个实验卡片导航页 | Phase 2 |
| 3.2 | Lab 3 — Command Palette（全局 ⌘K） | 全局命令面板 + 快捷键 + 键盘导航 | 3.1 |
| 3.3 | Lab 1 — Component System 展示页 | 所有组件状态展示 | 3.1 |
| 3.4 | Lab 4 — Virtual List（10 万条） | 高性能虚拟滚动列表 | 3.1 |
| 3.5 | Lab 2 — Data Table（完整交互） | 搜索/筛选/排序/分页/选择 | 3.1, 3.3 |
| 3.6 | Lab 5 — Drag & Drop 看板 | 5 列可拖拽看板 | 3.1 |
| 3.7 | Lab 6 — Dashboard + Charts | KPI 卡片 + 3 种图表 | 3.1 |
| 3.8 | Lab 各模块移动端适配 | 所有 Lab 页面响应式 | 3.2-3.7 |

**验收标准**：
- 6 个 Lab 模块全部可交互使用
- Command Palette 全局可用
- Virtual List 滚动 60fps
- 所有 Lab 模块在移动端可用

---

### Phase 4：Backend + Admin CMS

**目标**：接入 Supabase，实现真实数据驱动和后台内容管理。

| Task ID | 任务 | 关键产出 | 依赖 |
|---------|------|---------|------|
| 4.1 | Supabase 项目初始化 + Schema 建表 | 全部数据表 + RLS 策略 + 迁移文件 | Phase 3 |
| 4.2 | Supabase Auth + Admin 登录页 | 邮箱密码登录 + Session 持久化 | 4.1 |
| 4.3 | TanStack Query 集成 + QueryClient 配置 | 全局 Query Provider | 4.1 |
| 4.4 | Service Layer 封装（Projects / Articles / Resume） | 类型安全的 API 函数 | 4.1, 4.3 |
| 4.5 | 公开站点数据接入（Projects 列表/详情） | 从 Supabase 拉取真实数据 | 4.4 |
| 4.6 | 公开站点数据接入（Resume 简历数据） | 简历从数据库读取 | 4.4 |
| 4.7 | Admin Layout（侧边栏 + 路由守卫） | 后台布局 + 鉴权守卫 | 4.2 |
| 4.8 | Admin Dashboard | 统计概览页 | 4.7 |
| 4.9 | Admin Projects CRUD（列表 + 编辑器） | 项目完整增删改查 | 4.7, 4.4 |
| 4.10 | Zod 表单校验集成 | 项目/文章表单 Zod Schema | 4.9 |
| 4.11 | Admin Articles CRUD（Markdown 编辑器） | 文章增删改查 + 预览 | 4.7, 4.4 |
| 4.12 | Admin Resume 管理（Experiences / Skills CRUD） | 简历内容编辑 | 4.7, 4.4 |
| 4.13 | Admin Settings | 站点设置编辑 | 4.7 |
| 4.14 | 图片上传（Supabase Storage） | 封面图 / 头像上传 | 4.9, 4.11 |
| 4.15 | TanStack Query Mutation + 缓存失效 | 操作后自动刷新数据 | 4.9-4.13 |

**验收标准**：
- 登录后台可完整管理所有内容
- 前端展示与后台数据实时同步
- RLS 策略生效（未登录只能看已发布内容）
- 表单校验正常工作

---

### Phase 5：测试与工程化完善

**目标**：建立完整的测试体系，优化性能与可访问性。

| Task ID | 任务 | 关键产出 | 依赖 |
|---------|------|---------|------|
| 5.1 | 核心 Utils 单元测试 | utils/ 下所有函数测试 | Phase 4 |
| 5.2 | 关键 Composables 单元测试 | useTheme / usePagination 等 | Phase 4 |
| 5.3 | Pinia Stores 测试 | theme / commandPalette store | Phase 4 |
| 5.4 | Service Layer 测试 | API 函数 mock 测试 | Phase 4 |
| 5.5 | 关键组件 Component 测试 | ProjectCard / DataTable 等 | Phase 4 |
| 5.6 | Playwright E2E 核心路径 | 浏览项目 / 查看简历 / Admin 发布 | Phase 4 |
| 5.7 | 性能优化：路由懒加载 + 代码分割 | 构建产物分析 | Phase 4 |
| 5.8 | 图片优化 + 懒加载 | WebP 转换 + 懒加载实现 | Phase 4 |
| 5.9 | 可访问性审计与修复 | 键盘导航 / ARIA / 对比度 | Phase 4 |
| 5.10 | Lighthouse 性能优化达标 | 首页 Lighthouse ≥ 90 | 5.7, 5.8 |

**验收标准**：
- 单元测试覆盖率核心模块 > 80%
- E2E 覆盖 3 条核心用户路径
- Lighthouse 四项分数全部 ≥ 90
- 键盘可完成所有核心操作

---

### Phase 6：上线与文档

**目标**：生产环境部署，完善项目文档，最终验收。

| Task ID | 任务 | 关键产出 | 依赖 |
|---------|------|---------|------|
| 6.1 | 部署到 Vercel / Cloudflare Pages | 生产环境 URL | Phase 5 |
| 6.2 | 域名配置 + HTTPS | 自定义域名 | 6.1 |
| 6.3 | 完善 README（完整版） | 架构图 / 技术栈 / 本地开发 / 部署说明 | 6.1 |
| 6.4 | 编写 ADR 技术决策记录 | 5+ 篇关键 ADR | Phase 5 |
| 6.5 | Sitemap / robots.txt / Open Graph 完善 | SEO 基础完善 | 6.1 |
| 6.6 | 简历 PDF 导出功能 | 一键下载 PDF | Phase 4 |
| 6.7 | Engineering Journal 页面 | 工程日志列表页 | 6.4 |
| 6.8 | 最终验收（按 DoD 清单逐项检查） | 验收报告 | 全部 |
| 6.9 | GitHub 仓库整理（Topics / About / Social Preview） | 仓库展示完善 | 6.1 |

**验收标准**：
- 生产环境可正常访问
- README 完整专业
- GitHub 仓库整洁，Commit 历史清晰
- DoD 全部勾选完成

---

## 三、Commit Message 规范

### 3.1 格式约定

采用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 3.2 Type 类型

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: add project detail page` |
| `fix` | Bug 修复 | `fix: preserve query state on navigation` |
| `perf` | 性能优化 | `perf: lazy load project screenshots` |
| `refactor` | 重构（不影响功能） | `refactor: extract project service layer` |
| `test` | 测试相关 | `test: add project filter coverage` |
| `chore` | 工程化 / 构建 / 配置 | `chore: configure eslint flat config` |
| `docs` | 文档 | `docs: update architecture overview` |
| `style` | 代码格式（不影响逻辑） | `style: format with prettier` |

### 3.3 Scope 可选

标注影响范围：

```
feat(projects): add project detail page
fix(lab): fix virtual list scroll performance
chore(ci): update node version to 24
```

### 3.4 好的 Commit 示例

```
feat: add command palette with keyboard navigation

- Implement ⌘K global shortcut
- Add searchable command list
- Implement focus management and accessibility
- Support keyboard up/down navigation

Closes #12
```

### 3.5 避免的 Commit

```
❌ init
❌ fix
❌ update
❌ test
❌ aaa
❌ final
❌ final2
❌ wip
```

---

## 四、PR 规范

### 4.1 PR 标题格式

```
<type>(<scope>): <简短描述>
```

示例：
- `feat(projects): implement project list with search and filter`
- `fix(resume): fix print layout page break issue`
- `chore(ci): add playwright e2e workflow`

### 4.2 PR 模板

```markdown
## 变更类型

- [ ] 新功能 (feat)
- [ ] Bug 修复 (fix)
- [ ] 性能优化 (perf)
- [ ] 重构 (refactor)
- [ ] 文档 (docs)
- [ ] 工程化 (chore)

## 关联 Issue

Closes #

## 变更说明

<!-- 简述做了什么、为什么这么做 -->

## 测试方式

<!-- 描述如何验证这些变更 -->

- [ ] 本地 `npm run dev` 验证通过
- [ ] `npm run lint` 无报错
- [ ] `npm run type-check` 通过
- [ ] `npm run test` 全部通过
- [ ] 新增了对应的测试

## 截图 / 录屏（如涉及 UI）

<!-- 如有 UI 变更，附上 Before/After 截图 -->

## 备注

<!-- 任何需要 Reviewer 注意的点 -->
```

### 4.3 PR 合并规则

- 至少通过所有 CI 检查（Lint / Type Check / Test / Build）
- 无未解决的 Review 评论
- 合并方式：**Squash Merge**（保持 main 分支历史整洁）

---

## 五、Issue 模板

### 5.1 Feature Issue 模板

```markdown
## 功能描述

<!-- 简述要实现什么功能 -->

## 背景与动机

<!-- 为什么需要这个功能，解决什么问题 -->

## 验收标准

- [ ] 验收点 1
- [ ] 验收点 2
- [ ] 验收点 3

## 技术方案（可选）

<!-- 初步的技术实现思路 -->

## 相关文档

- PRD：
- 原型：
- 架构：
```

### 5.2 Bug Report 模板

```markdown
## 描述

<!-- 清晰简洁地描述 Bug -->

## 复现步骤

1. 到某页面
2. 点击...
3. 滚动到...
4. 看到错误

## 预期行为

<!-- 你期望发生什么 -->

## 实际行为

<!-- 实际发生了什么 -->

## 环境

- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 130]
- 设备: [e.g. Desktop / Mobile]

## 截图 / 录屏

<!-- 如有，附上截图或录屏 -->

## 额外信息

<!-- 任何其他有帮助的信息 -->
```

---

## 六、里程碑时间线参考

> 以下为参考时间线，实际根据开发速度调整。

| 阶段 | 参考周期 | 累计完成 |
|------|---------|---------|
| Phase 0：Product Definition | 已完成 | ✅ |
| Phase 1：Foundation | 2-3 天 | 工程基座就绪 |
| Phase 2：Core Site | 3-5 天 | 个人主页可用 |
| Phase 3：Frontend Lab | 5-7 天 | 技术展示完整 |
| Phase 4：Backend + Admin | 5-7 天 | 全栈应用成型 |
| Phase 5：Engineering | 3-5 天 | 测试与性能达标 |
| Phase 6：Launch | 2-3 天 | 正式上线 |

**总预估**：约 20-30 个工作日完成全部阶段。

---

## 七、Done Definition（每个 Task 完成标准）

每个 Task 标记为完成前，必须满足：

- [ ] 功能实现符合 PRD 描述
- [ ] TypeScript 类型完整，无 `any` 滥用
- [ ] 响应式布局覆盖（至少 Mobile + Desktop）
- [ ] Loading / Error / Empty 状态处理
- [ ] 代码通过 ESLint 检查
- [ ] 新增代码有对应测试（如适用）
- [ ] Commit Message 符合规范
- [ ] 相关文档已更新（如适用）
