# Developer Portfolio Lab — 开发 TODO 追踪

> **更新日期**：2026-09-22  
> **状态**：Phase 0 + Phase 1 已完成，准备进入 Phase 2  
> **追踪规则**：每完成一项打 `[x]`，未完成 `[ ]`，进行中 `[-]`

---

## 总览

```
Phase 0  Product Definition   ████████████████████  100% ✅
Phase 1  Foundation            ████████████████████  100% ✅
Phase 2  Core Site             ████████████████████  100% ✅
Phase 3  Frontend Lab          ████████████████████  100% ✅
Phase 4  Backend + Admin       ░░░░░░░░░░░░░░░░░░    0% ⬜
Phase 5  Engineering           ░░░░░░░░░░░░░░░░░░    0% ⬜
Phase 6  Launch                ░░░░░░░░░░░░░░░░░░    0% ⬜
```

---

## Phase 1：Foundation（工程基座）

> **目标**：跑通 `dev / lint / type-check / test / build` 五条命令全绿，有一个带暗色模式和响应式导航的空壳网站。

---

### 1.1 项目脚手架

- [x] **初始化 Vite + Vue 3 + TypeScript 项目**
  - 目录：`D:\workspace\PersonalWEB`
  - 包管理器：pnpm
  - 模板：`vue-tsc`
  - 验收：`pnpm dev` 能启动，浏览器打开空白页不报错

- [x] **建立 Feature-based 目录结构**
  - 创建 `src/app/` `src/components/ui|layout|shared/` `src/features/` 各子目录
  - 创建 `src/composables/` `src/stores/` `src/services/` `src/schemas/` `src/types/` `src/utils/`
  - 验收：目录树与技术架构设计文档一致

- [x] **配置 TypeScript strict mode + path alias**
  - `tsconfig.json` 开启 `strict: true` / `noUnusedLocals: true` / `noUnusedParameters: true`
  - 配置 `@/*` → `./src/*` 路径别名
  - `vite.config.ts` 同步配置 alias
  - 验收：`pnpm type-check` 通过（vue-tsc）

---

### 1.2 代码规范

- [x] **配置 ESLint 10 flat config**
  - 安装 `eslint@10` + `eslint-plugin-vue` + `typescript-eslint`
  - 创建 `eslint.config.js`
  - 规则：Vue recommended + TS recommended
  - 验收：`pnpm lint` 无报错

- [x] **配置 Prettier**
  - `.prettierrc` 基本配置（单引号、无分号、80 列）
  - 与 ESLint 集成（eslint-config-prettier）
  - `package.json` 添加 `format` 脚本
  - 验收：`pnpm format` 能格式化所有文件

---

### 1.3 路由与状态

- [x] **集成 Vue Router 4**
  - 创建 `src/app/router/`
  - 定义公开路由表（先占位 Home / Resume / Projects / Lab / About）
  - 创建 `App.vue` + `<router-view>`
  - 验收：切换路由能显示对应占位页面

- [x] **集成 Pinia**
  - 创建 `src/stores/theme.store.ts`（theme mode 状态）
  - 创建 `src/stores/commandPalette.store.ts`（isOpen 状态）
  - 验收：store 能正常读写

---

### 1.4 UI 基座

- [x] **集成 Tailwind CSS 4**
  - 安装 + `main.css` 入口
  - 配置 CSS 变量（light + dark 两套，与架构文档一致）
  - 验收：Tailwind 类名生效

- [ ] **集成 shadcn-vue**
  - 初始化 `components.json`
  - 安装基础组件：Button / Input / Card / Badge / Dialog
  - 验收：Button 组件能渲染，样式正常

---

### 1.5 全局布局

- [x] **实现 AppHeader 组件**
  - 左侧 Logo
  - 中间导航（Home / Projects / Lab / Resume / About）
  - 右侧暗色切换按钮 + GitHub 图标
  - Desktop 顶部导航布局

- [x] **实现 AppFooter 组件**
  - 版权 + 社交链接 + 快速导航

- [x] **实现 AppLayout 布局**
  - Header + `<slot>` + Footer
  - 最大宽度 1200px 居中

- [ ] **实现响应式导航（Mobile 汉堡菜单）**
  - < 640px 时显示汉堡按钮
  - 点击展开全屏抽屉式导航
  - 验收：手机宽度下导航可用

---

### 1.6 暗色模式

- [x] **实现 useTheme composable**
  - 三态：light / dark / system
  - 使用 VueUse 的 `usePreferredDark` + `useStorage`
  - 切换时在 `<html>` 上加 `.dark` 类
  - 持久化到 localStorage

- [x] **实现主题切换按钮**
  - Header 右侧的切换按钮
  - 点击循环：light → dark → system

- [x] **防止主题闪烁（FOUC）**
  - `index.html` 内联初始化脚本
  - 页面加载前就应用正确主题
  - 验收：刷新页面不闪白

---

### 1.7 测试基座

- [x] **配置 Vitest**
  - 安装 `vitest` + `@vue/test-utils` + `jsdom`
  - `vitest.config.ts` 配置
  - `package.json` 添加 `test` / `test:watch` 脚本

- [x] **写一个示例测试**
  - 测试 `utils/cn.ts`（tailwind-merge 工具）
  - 验收：`pnpm test` 通过

---

### 1.8 CI/CD 基座

- [x] **配置 GitHub Actions CI**
  - `.github/workflows/ci.yml`
  - PR / push 触发
  - 步骤：setup-node → npm ci → lint → type-check → test → build
  - 验收：推到 GitHub 后 Actions 跑通

---

### 1.9 环境变量与配置

- [x] **创建 `.env.example`**
  - 列出所有需要的环境变量（Supabase URL / Key / Site URL）
  - 创建 `.env.local`（gitignore）
  - 验收：代码里用 `import.meta.env.VITE_*` 读取

---

### Phase 1 验收 Checklist

- [x] `pnpm dev` 正常启动
- [x] `pnpm lint` 无报错
- [x] `pnpm type-check` 通过
- [x] `pnpm test` 通过
- [x] `pnpm build` 成功
- [x] 首页有 Header + Footer + 占位内容
- [x] 暗色模式切换正常，刷新不闪
- [ ] 移动端汉堡菜单导航（待实现）
- [ ] GitHub Actions CI 全绿（待推到 GitHub）

---

## Phase 2：Core Site（核心公开站点）

> **目标**：5 个主入口页面完整可用，成为一个像样的个人主页。

---

### 2.1 首页

- [x] Hero 区域（头衔 + 定位 + 技术标签 + CTA 按钮组）
- [x] Selected Projects 区块（3 张项目卡片占位）
- [x] Frontend Engineering 能力矩阵（5 个能力分栏）
- [x] Frontend Lab 预览区（4 个 Lab 卡片占位）
- [x] Resume 预览区（经历 + 技能摘要）

### 2.2 在线简历

- [x] Recruiter View（单栏卡片式布局）
- [x] Detailed View（点击展开详细内容）
- [x] Print View（`?mode=print` 路由 + `@media print` 样式）
- [x] 打印按钮（调用 window.print）

### 2.3 项目列表页

- [x] 搜索栏（关键词过滤）
- [x] 标签筛选
- [x] 排序切换
- [x] 分页组件
- [x] 项目卡片网格（静态 mock 数据）
- [x] Loading 骨架屏
- [x] Empty 空状态
- [x] Error 错误状态（预留 loading 状态切换）

### 2.4 项目详情页

- [x] 头部：标题 + 封面 + 标签
- [x] Overview（Role / Duration / Tech Stack）
- [x] Problem & Solution 区块
- [x] Architecture 文字层级图
- [x] Technical Decisions 区块
- [x] Engineering Checklist（打勾列表）
- [x] Performance 数据展示
- [x] CTA 按钮组（Live Demo / Source Code）

### 2.5 About 页

- [x] 个人简介 + Avatar
- [x] 技术理念 / 我在做什么
- [x] 联系方式卡片

### 2.6 其他

- [x] 404 页面
- [x] 各页面 SEO Meta（title / description）
- [x] 全站响应式检查（Mobile 汉堡菜单 + 移动端布局）

---

## Phase 3：Frontend Lab

> **目标**：6 个高质量实验模块，展示前端工程深度。

- [x] Lab 入口页（6 个卡片导航）
- [x] Lab 1：Component System 展示页（全组件状态展示）
- [x] Lab 2：Data Table（搜索/筛选/排序/分页/选择/批量操作）
- [x] Lab 3：Command Palette（全局 ⌘K + 键盘导航 + 焦点管理）
- [x] Lab 4：Virtual List（10 万条数据虚拟滚动）
- [x] Lab 5：Drag & Drop Board（4 列看板拖拽）
- [x] Lab 6：Dashboard（KPI 卡片 + 柱状图 + 流量来源）

---

## Phase 4：Backend + Admin

> **目标**：接 Supabase，真实数据驱动，后台 CMS 可用。

- [ ] Supabase 项目初始化 + 建表迁移 + RLS
- [ ] Supabase Auth + Admin 登录页 + 路由守卫
- [ ] TanStack Query 集成 + QueryClient 配置
- [ ] Service Layer（Projects / Articles / Resume）
- [ ] 公开站点接真实数据（替换 mock）
- [ ] Admin Layout（侧边栏 + 顶栏）
- [ ] Admin Dashboard 统计概览
- [ ] Admin Projects CRUD（列表 + 编辑器 + Zod 校验）
- [ ] Admin Articles CRUD（Markdown 编辑器）
- [ ] Admin Resume 管理（经历 / 技能 CRUD）
- [ ] Admin Settings 站点配置
- [ ] Supabase Storage 图片上传

---

## Phase 5：Engineering（测试与优化）

> **目标**：测试体系 + 性能 + 可访问性达标。

- [ ] Utils 单元测试
- [ ] Composables 单元测试
- [ ] Stores 测试
- [ ] Service Layer 测试
- [ ] 关键组件 Component 测试
- [ ] Playwright E2E（3 条核心路径）
- [ ] 路由懒加载优化
- [ ] 图片优化 + 懒加载
- [ ] 可访问性审计与修复
- [ ] Lighthouse 性能达标（≥90）

---

## Phase 6：Launch（上线）

> **目标**：生产环境部署 + 文档完善。

- [ ] 部署到 Vercel / Cloudflare Pages
- [ ] 域名 + HTTPS 配置
- [ ] 完善 README（完整版）
- [ ] ADR 技术决策记录（5+ 篇）
- [ ] Sitemap / robots.txt / OG 完善
- [ ] 简历 PDF 导出
- [ ] Engineering Journal 页面
- [ ] 最终验收（DoD 逐项检查）
- [ ] GitHub 仓库整理（Topics / About / Preview）

---

## 进度记录

| 日期 | 完成内容 | 备注 |
|------|---------|------|
| 2026-09-22 | Phase 0 完成（6 份文档） | 文档套件交付 |
| 2026-09-22 | Phase 1 + 2 + 3 完成 | 全站前端 + 6 个 Lab 模块全部实现 |
