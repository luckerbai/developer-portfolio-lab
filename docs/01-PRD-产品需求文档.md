# Developer Portfolio Lab — 产品需求文档（PRD）

> **版本**：v1.0  
> **日期**：2026-09-22  
> **状态**：已批准，进入开发阶段

---

## 一、产品概述

### 1.1 项目名称

**Developer Portfolio Lab** — 一个面向招聘者、技术面试官和开发者的现代化个人开发者平台。

### 1.2 产品定位

这**不是**一个传统意义上的"个人简历网站"，而是一个**能够证明本人具备现代 Web 前端实际开发能力的个人开发者产品**。

简历只是入口，真正有说服力的是招聘方点进去之后，能看到一个完整、真实、可操作、可上线的 Web 产品，并且能继续深入看到代码结构、技术选型、交互设计、状态管理、接口处理、测试、性能与部署。

### 1.3 核心价值主张

最终形成的不是"我会 Vue"，而是一条完整的证据链：

> **"这是我实际做出来并上线的 Web 产品，这是我的代码，这是我的架构，这是我的测试，这是我的工程流程，这是我的在线简历。"**

```
                   Developer Portfolio
                           │
          ┌────────────────┼────────────────┐
          │                │                │
        Resume          Projects            Lab
          │                │                │
       简历证明         项目证明          技术证明
          │                │                │
          └────────────────┼────────────────┘
                           │
                     Engineering
                           │
                  Testing / CI / API
                           │
                         Deploy
```

### 1.4 产品目标

| 目标层级 | 具体内容 |
|---------|---------|
| 招聘可读性 | 30 秒内让招聘者看懂：你是谁、做什么、核心技术是什么、做过什么 |
| 工程可信度 | 让前端负责人能深入验证：组件设计、状态管理、API 处理、测试、性能、CI/CD |
| 产品完整性 | 拥有真实的内容管理后台，而非纯静态模板 |
| 技术展示 | 通过 Frontend Lab 主动展示复杂前端交互与性能优化能力 |

---

## 二、目标用户与使用场景

### 2.1 用户角色

| 角色 | 核心诉求 | 访问路径 |
|------|---------|---------|
| **招聘者 / HR** | 快速判断候选人是否匹配岗位 | 首页 → 在线简历 → 联系方式 |
| **技术面试官 / 前端负责人** | 验证候选人的实际工程能力 | 项目详情 → 架构设计 → 代码仓库 → 测试与 CI |
| **开发者本人（Admin）** | 管理内容、更新简历、发布文章、维护站点 | 登录 /admin → 各内容模块 CRUD |
| **其他开发者 / 同行** | 学习、交流、技术参考 | Frontend Lab → 技术文章 → GitHub |

### 2.2 典型用户场景

**场景 1：HR 快速筛选**
> HR 收到简历，点击个人网站链接。打开首页，30 秒内看到职位头衔、核心技术栈、3 个代表项目、在线简历入口。判断匹配度后，直接打印或导出 PDF 简历存档。

**场景 2：技术面试官深度考察**
> 前端技术负责人收到推荐，点开项目链接。浏览项目详情页，查看架构图、技术选型理由、测试覆盖、Lighthouse 分数。点击 GitHub 仓库，检查目录结构、Commit 历史、CI 状态。

**场景 3：本人日常维护**
> 开发者登录 Admin 后台，更新一个新项目，编辑简历中的工作经历，发布一篇技术文章。所有操作通过表单完成，实时保存草稿，一键发布上线。

---

## 三、信息架构

### 3.1 站点地图

```
/
├── 首页（Home）
│
├── /resume                          # 在线简历
│   └── /resume?mode=print           # 打印 / PDF 视图
│
├── /projects                        # 项目列表
│   └── /projects/:slug              # 项目详情
│
├── /lab                             # Frontend Lab 入口
│   ├── /lab/components              # Component System
│   ├── /lab/data-table              # Data Table
│   ├── /lab/command-palette         # Command Palette
│   ├── /lab/virtual-list            # Virtual List
│   ├── /lab/drag-board              # Drag & Drop Board
│   └── /lab/dashboard               # Dashboard
│
├── /articles                        # 文章列表
│   └── /articles/:slug             # 文章详情
│
├── /about                           # 关于我
│
└── /admin                           # 后台管理（需登录）
    ├── /admin/dashboard             # 数据概览
    ├── /admin/projects              # 项目管理
    ├── /admin/articles              # 文章管理
    ├── /admin/resume                # 简历管理
    ├── /admin/experiments           # Lab 模块管理
    └── /admin/settings              # 站点设置
```

### 3.2 第一阶段 MVP 范围

第一版聚焦 5 个主入口，快速建立核心可信度：

```
Home / Projects / Lab / Resume / About
```

文章与 Admin 后台在后续阶段迭代加入。

---

## 四、功能需求

### 4.1 首页（Home）

#### 4.1.1 Hero 区域

- 展示职位头衔：**前端开发工程师 / Frontend Developer**
- 一句话定位：专注于现代 Web 应用开发
- 技术标签行：Vue 3 · TypeScript · Vite · Web Engineering
- 个人价值主张：正在构建高质量、可维护、响应式的 Web 产品
- CTA 按钮组：`查看项目` / `查看简历` / `GitHub`

#### 4.1.2 Selected Projects（精选项目）

- 展示 3 个精选项目卡片
- 每张卡片包含：项目封面、标题、一句话摘要、技术标签
- 点击跳转项目详情页

#### 4.1.3 Frontend Engineering 能力矩阵

- 分栏展示核心工程能力：
  - Architecture（架构设计）
  - Components（组件工程）
  - State Management（状态管理）
  - Testing（测试体系）
  - Performance（性能优化）
- 每栏配一句话说明 + 跳转入口

#### 4.1.4 Frontend Lab 精选

- 展示 4 个 Lab 模块预览卡片：
  - Virtual List
  - Command Palette
  - Drag & Drop
  - Data Visualization
- 点击跳转对应 Lab 页面

#### 4.1.5 Resume Preview（简历预览）

- 展示工作经历摘要
- 展示教育背景摘要
- 展示核心技能标签云
- 底部"查看完整简历"链接

#### 4.1.6 Footer

- 版权信息
- 社交链接（GitHub / Email / LinkedIn / Twitter）
- 站点地图快速链接

---

### 4.2 在线简历（Resume）

提供三种视图模式：

#### 4.2.1 Recruiter View（招聘者视图）

单栏卡片式布局，一眼看完核心信息：

- 个人简介（姓名 + 职位 + 一句话介绍）
- 核心技能（Frontend / Engineering 分类标签）
- 工作经历（公司 + 职位 + 时间 + 一句话职责）
- 主要项目（3 个代表项目标题 + 一句话描述）
- 联系方式

#### 4.2.2 Detailed View（详细视图）

点击"View full profile"展开完整内容：

- 技术栈详细列表
- 项目职责详细描述
- 技术挑战与解决方案
- 工程实践（测试 / CI / 代码规范等）
- 教育背景详情

#### 4.2.3 Print / PDF View（打印视图）

- 路由：`/resume?mode=print`
- 触发 `Ctrl + P` 直接输出干净的 A4 简历
- 专门的 `@media print` 样式：
  - 隐藏导航栏、按钮、非简历内容
  - A4 纸张尺寸适配
  - 合适的字号与行距
- 页面提供"Download Resume"按钮，调用浏览器打印生成 PDF

---

### 4.3 项目作品集（Projects）

#### 4.3.1 项目列表页

- **搜索功能**：按项目标题 / 描述关键词搜索
- **筛选功能**：按技术栈标签筛选
- **排序功能**：按创建时间 / 更新时间 / 名称排序
- **分页功能**：每页固定数量，支持页码切换
- **项目卡片**：封面图、标题、摘要、技术标签、日期
- **状态处理**：Loading 骨架屏 / Empty 空状态 / Error 错误状态

#### 4.3.2 项目详情页

完整的项目展示结构：

| 区块 | 内容 |
|------|------|
| **Overview** | 项目简介、角色（Role）、周期（Duration）、技术栈（Tech Stack） |
| **Problem** | 解决什么问题？ |
| **Solution** | 怎么解决？ |
| **Architecture** | 架构层级图（Browser → Vue App → Router → Feature Modules → Service Layer → API） |
| **Technical Decisions** | 关键技术选型理由（如：为什么用 Pinia？为什么用 composable？为什么 lazy loading？） |
| **Engineering** | 工程实践清单（TypeScript strict / ESLint / 组件架构 / Unit Tests / E2E / CI/CD） |
| **Performance** | 性能指标（Initial Bundle / Lazy Loading / Image Optimization / Code Splitting / Lighthouse） |
| **CTA** | Live Demo 链接 / Source Code 链接 |

---

### 4.4 Frontend Lab

Lab 是主动展示前端工程能力的核心模块，包含 6 个高质量实验项目，而非零散的小玩具合集。

#### 4.4.1 Lab 入口页

- 6 个实验模块卡片导航
- 每个卡片：图标、标题、一句话说明、技术标签
- 点击进入对应实验页面

#### 4.4.2 Lab 1 — Component System（组件系统）

展示完整的组件库能力，每个组件展示所有状态：

- 组件清单：Button / Input / Select / Modal / Drawer / Tabs / Tooltip / Dropdown / Toast / Pagination / Card / Badge
- 状态展示：Default / Hover / Disabled / Loading / Error / Dark Mode
- 验证能力：Component Design + UI Engineering

#### 4.4.3 Lab 2 — Data Table（复杂数据表格）

- 功能列表：Search / Filter / Sort / Pagination / Column Toggle / Row Selection / Bulk Action / Loading / Empty / Error
- 真实数据量演示（数百行数据）
- 验证能力：数据处理 + 复杂交互 + 状态管理

#### 4.4.4 Lab 3 — Command Palette（命令面板）

- 快捷键 `⌘K` 全局触发
- 命令列表：Go to Resume / View Projects / Toggle Dark Mode / Open GitHub / Search Articles
- 支持键盘上下选择 + Enter 确认
- 验证能力：Keyboard Events / Focus Management / Accessibility / State Management / Search / Command Pattern

#### 4.4.5 Lab 4 — Virtual List（虚拟滚动）

- 大数据量演示：100,000 条数据
- 虚拟滚动渲染，保持流畅滚动
- 可切换数据量：1,000 / 10,000 / 100,000
- 验证能力：性能思维 + 大规模 DOM 优化

#### 4.4.6 Lab 5 — Drag & Drop Board（拖拽看板）

- 5 列看板：Backlog → Todo → Doing → Review → Done
- 功能：Drag & Drop 拖拽排序 / Create 创建卡片 / Edit 编辑 / Delete 删除 / Filter 过滤
- 验证能力：真实前端产品交互 + 状态持久化

#### 4.4.7 Lab 6 — Dashboard（数据仪表盘）

- KPI 卡片：Visitors / Projects / Articles / GitHub Stats
- 图表区：Line Chart（访问趋势）/ Bar Chart（项目分布）/ Donut Chart（技能占比）
- Activity 时间线
- 验证能力：Data Transformation / Computed State / Async Data / Responsive Layout / Charts

---

### 4.5 技术文章（Articles）

#### 4.5.1 文章列表页

- 文章卡片列表：封面图、标题、摘要、发布日期、阅读时长、标签
- 分类过滤
- 标签云导航
- 分页

#### 4.5.2 文章详情页

- 标题 + 元信息（日期 / 阅读时长 / 标签）
- Markdown 正文渲染
- 上一篇 / 下一篇导航
- 目录大纲（可选）

---

### 4.6 关于我（About）

- 个人简介
- 技术理念
- 联系方式（Email / GitHub / LinkedIn / Twitter）
- （可选）生活照片或兴趣介绍

---

### 4.7 Admin CMS 后台

#### 4.7.1 登录页

- 邮箱 + 密码登录
- 登录状态持久化
- 路由守卫：未登录访问 /admin 自动跳转登录页

#### 4.7.2 Admin Dashboard

- 统计卡片：项目总数 / 文章总数 / 草稿数 / 总访问量
- 最近活动列表
- 快速操作入口

#### 4.7.3 项目管理

- 项目列表：标题 / 状态（Draft / Published）/ 更新时间 / 操作
- 创建 / 编辑项目表单：
  - Title / Slug / Summary / Description
  - Problem / Solution / Architecture / Tech Decisions
  - Tech Stack（标签输入）
  - Cover Image 上传
  - GitHub URL / Demo URL
  - Status（Draft / Published）
  - Featured（是否首页精选）
- 表单校验：Zod Schema 校验
- 草稿保存 / 一键发布

#### 4.7.4 文章管理

- 文章列表：标题 / 状态 / 发布日期 / 操作
- Markdown 编辑器（支持预览）
- 标签管理
- 封面上传

#### 4.7.5 简历管理

- 个人资料编辑（姓名 / 职位 / 简介 / 联系方式）
- 工作经历 CRUD
- 技能标签 CRUD
- 教育背景 CRUD

#### 4.7.6 Lab 模块管理

- 各实验模块内容编辑
- 排序调整
- 启用 / 禁用

#### 4.7.7 站点设置

- 站点名称 / Logo
- SEO 设置（Title / Description / Keywords）
- 社交链接
- 分析 ID 配置

---

### 4.8 Engineering Journal（工程日志）

> （可选模块，建议在 Phase 6 上线）

- 按日期记录开发过程中的关键决策
- 每条日志结构：Problem / Decision / Implementation / Trade-off / Result
- 不是流水账，而是工程决策记录
- 体现真实的工程实践能力

---

## 五、非功能需求

### 5.1 响应式设计

从设计初期即为一级需求，而非后期补充：

| 断点 | 宽度范围 | 布局特征 |
|------|---------|---------|
| Mobile | < 640px | 汉堡菜单导航 / 单列布局 / 底部操作栏 / 触摸交互优化 |
| Tablet | 640px – 1024px | 折叠导航 / 双列布局 |
| Desktop | > 1024px | 完整顶部导航 / 2-3 列网格布局 |

### 5.2 暗色模式

- 三态切换：Light / Dark / System
- 基于 CSS Variables 实现
- 偏好持久化到 localStorage
- 支持跟随系统主题（`prefers-color-scheme`）
- 所有组件完整支持暗色模式

### 5.3 可访问性（Accessibility）

最低要求：

- 键盘导航完整可用
- Focus 状态清晰可见
- 语义化 HTML 标签
- ARIA 属性正确使用
- 表单都有 Label
- 支持 `prefers-reduced-motion`
- 颜色对比度符合 WCAG AA 标准

重点组件：Command Palette / Modal / Drawer / Dropdown / Tabs

### 5.4 性能优化

明确纳入项目的性能实践：

- Lazy Route（路由级代码分割）
- Dynamic Import（组件级动态导入）
- Image Lazy Loading（图片懒加载）
- Asset Optimization（资源压缩优化）
- Code Splitting（按需加载）
- Skeleton Loading（骨架屏）
- TanStack Query 缓存策略

项目页面可展示 Performance Dashboard：Initial Load / Bundle Size / Lighthouse 分数

### 5.5 SEO 基础

第一版不做 SSR，保持 SPA 架构：

- Meta 标签（Title / Description / Keywords）
- Open Graph 标签
- Canonical URL
- Sitemap.xml
- robots.txt

---

## 六、完成标准（Definition of Done）

### 6.1 产品层验收

- [ ] 首页完整上线，30 秒内可读懂产品定位
- [ ] 在线简历（Recruiter View + Detailed View）
- [ ] 项目列表页（搜索 / 筛选 / 排序 / 分页）
- [ ] 项目详情页（完整 7 个区块）
- [ ] Frontend Lab 6 个实验模块全部可用
- [ ] About 页
- [ ] 暗色模式（Light / Dark / System 三态）
- [ ] 移动端响应式完整
- [ ] 简历 Print View 可直接打印为 A4 PDF

### 6.2 工程层验收

- [ ] Vue 3 Composition API 全量使用 `<script setup>`
- [ ] TypeScript strict mode 开启
- [ ] Vue Router 路由配置规范，含 lazy loading
- [ ] Pinia 状态管理（客户端状态）
- [ ] Feature-based Architecture 目录结构
- [ ] 类型安全的 Service Layer
- [ ] Zod 表单校验集成
- [ ] 所有异步数据处理 Loading / Error / Empty 三态
- [ ] 响应式设计三断点全覆盖
- [ ] 基础可访问性达标

### 6.3 测试层验收

- [ ] 核心 Utils / Composables 单元测试
- [ ] 关键组件 Component 测试
- [ ] 核心用户路径 E2E 测试

### 6.4 DevOps 层验收

- [ ] ESLint 10 flat config 配置完成
- [ ] Type Check 通过（vue-tsc）
- [ ] GitHub Actions CI 流水线（Lint → Type Check → Test → Build）
- [ ] Production Build 正常
- [ ] 生产环境部署完成，HTTPS 可访问

### 6.5 项目可信度验收

- [ ] GitHub 仓库公开
- [ ] README 完整（产品概览 / 特性 / 架构 / 技术栈 / 目录结构 / 测试 / 部署说明）
- [ ] 架构图（可文本或图片）
- [ ] ADR 关键技术决策记录
- [ ] 在线 Demo 可访问
- [ ] 可打印在线简历可用

---

## 七、项目约束与边界

### 7.1 不做的事情（Out of Scope）

为保证核心价值聚焦，以下内容**明确不纳入第一版**：

- 复杂微前端架构
- GraphQL / WebSocket / Three.js / AI Agent
- 过度的 SEO 优化（不做 SSR）
- 满屏 3D 粒子 / 鼠标跟随 / WebGL 炫技
- 100+ 个零散小 Demo
- 多语言 i18n

### 7.2 视觉设计原则

关键词：**Editorial / Minimal / Technical / Premium / Clean / Responsive**

参考气质：Linear / Vercel / Raycast / Stripe / GitHub / Notion

核心原则：**像一个真正的软件产品，而不是一个"前端作品集模板"。**

---

## 八、里程碑概览

| 阶段 | 名称 | 核心目标 |
|------|------|---------|
| Phase 0 | Product Definition | 完成产品定义与技术方案（本文档套件） |
| Phase 1 | Foundation | 工程基座搭建（Vite / Vue / TS / 路由 / 状态 / UI 基座） |
| Phase 2 | Core Site | 核心公开站点上线（Home / Resume / Projects / About） |
| Phase 3 | Frontend Lab | 6 个 Lab 实验模块全部完成 |
| Phase 4 | Backend + Admin | Supabase 接入 + 后台 CMS 完整可用 |
| Phase 5 | Engineering | 测试体系 + 性能优化 + 可访问性 |
| Phase 6 | Launch | 上线部署 + 文档完善 + 最终验收 |

详细任务拆分见 `05-Git任务拆分与里程碑.md`。
