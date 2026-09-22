# Developer Portfolio Lab — AI Coding 执行规范

> **版本**：v1.0  
> **日期**：2026-09-22  
> **核心原则**：人主导产品与架构决策，AI 负责高效实现，所有 AI 产出必须经过人工 Review。

---

## 一、人机分工原则

### 1.1 人负责什么（Human-Owned）

| 职责 | 说明 |
|------|------|
| **产品定义** | 确定做什么、不做什么、优先级 |
| **架构决策** | 技术选型、模块划分、目录结构、状态边界 |
| **技术决策** | 为什么选 A 不选 B，记录 ADR |
| **Code Review** | 检查架构合理性、类型安全、边界情况 |
| **质量把控** | 验收标准、测试覆盖、性能要求 |
| **最终合并** | PR 合并决策、上线时机 |

### 1.2 AI 负责什么（AI-Assisted）

| 职责 | 说明 |
|------|------|
| **脚手架生成** | 项目初始化、目录创建、配置文件 |
| **组件实现** | 根据设计规范生成 Vue 组件代码 |
| **代码填充** | Service 函数、Composable、Store 实现 |
| **测试生成** | 单元测试、组件测试、E2E 用例 |
| **重构建议** | 代码优化建议、重复代码提取 |
| **文档撰写** | README、注释、ADR 草稿 |
| **Bug 修复** | 根据报错信息定位并修复 |

### 1.3 核心原则

> **AI 是执行者，人是决策者。**
>
> 面试官问："这个项目是不是 AI 生成的？"
>
> 你的回答：**"AI 参与了实现，但产品结构、技术方案、组件划分、数据模型、测试策略和代码 Review 是我主导的。"**

---

## 二、AI 开发标准工作流

### 2.1 每个 Task 的标准流程

```
Step 1：需求确认
  └─ 人阅读 PRD 对应章节，明确这个 Task 要做什么
  └─ 人确定技术方案（参考架构设计文档）

Step 2：AI 生成代码骨架
  └─ 人提供 Prompt（使用模板）
  └─ AI 输出：文件结构 + 类型定义 + 组件骨架

Step 3：人 Review 架构与类型
  └─ 检查目录是否符合 Feature-based 规范
  └─ 检查 TypeScript 类型是否完整合理
  └─ 确认状态边界（Pinia vs TanStack Query）

Step 4：AI 填充业务实现
  └─ 人确认骨架后，让 AI 补全实现细节
  └─ 逐步推进，不要一次性生成整个文件

Step 5：AI 生成测试
  └─ 为核心逻辑生成单元测试
  └─ 为关键交互生成组件测试

Step 6：人验证
  └─ 运行 dev server 手动验证
  └─ 运行 lint / type-check / test
  └─ 检查响应式与可访问性

Step 7：AI 生成提交信息 + 更新文档
  └─ 按 Conventional Commits 规范生成 commit message
  └─ 如有关键决策，更新 ADR
```

### 2.2 迭代节奏

- **一次只做一个 Task**，不要让 AI 一次生成整个 Phase
- **小步提交**，每个 Task 完成后立即 Commit
- **遇到问题先暂停**，人先判断方向是否正确，再继续让 AI 写代码
- **每天结束时回顾**：今天写了什么、明天做什么、有没有需要调整的

---

## 三、Prompt 模板库

### 3.1 项目脚手架生成

```
请帮我初始化一个 Vue 3 + TypeScript + Vite 项目的基础配置：

技术栈：
- Vue 3 (Composition API + <script setup>)
- TypeScript 6 (strict mode)
- Vite 8
- Tailwind CSS 4
- Vue Router 4
- Pinia
- ESLint 10 (flat config)
- Prettier

目录结构要求（Feature-based）：
src/
├── app/ (router, providers, config)
├── components/ (ui, layout, shared)
├── features/ (各业务模块自包含)
├── composables/
├── stores/
├── services/ (supabase, api)
├── schemas/ (zod)
├── types/
├── utils/
└── main.ts

请生成：
1. vite.config.ts（含 alias、manualChunks）
2. tsconfig.json（strict + path alias）
3. eslint.config.js（flat config）
4. .prettierrc
5. 基础目录结构与占位文件
```

### 3.2 新 Feature 页面生成

```
请帮我实现 [Feature 名称] 页面，位于 /[路由路径]。

需求描述：
[从 PRD 中提取的具体需求]

技术要求：
- 使用 Vue 3 Composition API + <script setup lang="ts">
- Feature-based 目录结构：
  src/features/[feature-name]/
    ├── components/
    ├── composables/
    ├── services/
    ├── types/
    └── views/[ViewName].vue
- 数据获取使用 TanStack Query
- 表单校验使用 Zod
- UI 使用 shadcn-vue + Tailwind CSS
- 必须处理 Loading / Error / Empty 三态
- 响应式设计（Mobile / Tablet / Desktop）

请输出：
1. 完整的目录结构
2. 类型定义（types/）
3. Service 函数签名（services/）
4. Composable（如需要）
5. View 组件
6. 子组件（拆分到 components/）
```

### 3.3 新组件生成

```
请帮我实现一个 [组件名称] 组件。

组件用途：[一句话说明]

Props 定义：
- prop1: type, 说明
- prop2: type, 说明

Emits 定义：
- emit1: (value: Type) => void

视觉规范：
- 使用 Tailwind CSS 类名
- 支持暗色模式（CSS 变量）
- 尺寸符合设计系统
- 所有交互状态（hover/active/disabled/loading）

可访问性要求：
- 语义化 HTML
- 正确的 ARIA 属性
- 键盘可用

输出：
[组件名].vue 完整代码 + 使用示例
```

### 3.4 Composable 生成

```
请帮我实现一个 use[功能名称] composable。

功能描述：[需要复用的业务逻辑]

输入参数：
- param1: Type, 说明
- param2: Type, 说明

返回值：
- value1: Type, 说明
- action1: () => void, 说明
- action2: (arg: Type) => void, 说明

技术要求：
- 使用 VueUse 工具函数（如有合适的）
- 完整的 TypeScript 类型
- 合理的错误处理
- 自包含，无外部依赖（除了 Vue 核心）

输出：use[名称].ts 完整代码 + 使用示例
```

### 3.5 Service 层生成

```
请帮我实现 [实体名称] 的 Service 层函数。

数据库表：[表名]
表结构：
[从数据库设计文档复制字段列表]

需要实现的函数：
1. fetch[实体]List(filters): Promise<[]>
   - 支持分页
   - 支持按状态筛选（仅 published）
   - 支持按创建时间排序
2. fetch[实体]BySlug(slug): Promise<Type>
3. create[实体](input): Promise<Type>
4. update[实体](id, input): Promise<Type>
5. delete[实体](id): Promise<void>

技术要求：
- 使用 Supabase Client
- 完整的 TypeScript 类型
- 统一错误处理
- 所有函数为 async/await 风格

输出：[entity].service.ts 完整代码 + 类型定义
```

### 3.6 测试用例生成

```
请为以下函数/组件编写测试用例：

被测对象：[函数名/组件名]
文件路径：[路径]

测试要求：
- 使用 Vitest
- 单元测试：覆盖正常路径 + 边界情况 + 错误情况
- 组件测试：使用 @vue/test-utils，模拟用户交互
- 测试命名清晰：describe/it 结构

请输出完整的测试文件代码。
```

### 3.7 代码 Review Prompt

```
请 Review 以下代码，重点检查：

1. TypeScript 类型完整性：有没有 any？类型是否准确？
2. 组件设计：Props/Emits 设计是否合理？有没有过度耦合？
3. 状态管理：是否正确使用了 Pinia / TanStack Query？
4. 错误处理：异步操作有没有处理 Error / Loading？
5. 可访问性：语义化 HTML？ARIA？键盘导航？
6. 性能：有没有不必要的重渲染？大列表？
7. 代码规范：命名？注释？结构？

代码如下：
[粘贴代码]

请按严重程度分级输出问题（Critical / Major / Minor / Suggestion）。
```

---

## 四、代码生成规范

### 4.1 Vue 组件规范

**强制要求：**

```vue
<!-- 所有组件必须使用 <script setup lang="ts"> -->
<script setup lang="ts">
// 1. Props 类型定义
interface Props {
  title: string
  loading?: boolean
  items?: Item[]
}

// 2. 使用 withDefaults（如需要默认值）
withDefaults(defineProps<Props>(), {
  loading: false,
  items: () => [],
})

// 3. Emits 类型定义
const emit = defineEmits<{
  (e: 'select', item: Item): void
  (e: 'delete', id: string): void
}>()

// 4. 导入按顺序：Vue 核心 → 第三方 → 内部
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { ProjectCard } from '@/components/shared'

// 5. 响应式状态
const selectedId = ref<string | null>(null)

// 6. Computed
const hasItems = computed(() => items.value.length > 0)
</script>

<template>
  <!-- 语义化 HTML -->
  <!-- Tailwind 类名 -->
</template>
```

### 4.2 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `ProjectCard.vue` |
| Composable | use 前缀 + camelCase | `usePagination.ts` |
| Service 文件 | camelCase + .service.ts | `project.service.ts` |
| Store 文件 | camelCase + .store.ts | `theme.store.ts` |
| 类型定义 | PascalCase | `interface ProjectDetail` |
| 常量 | UPPER_SNAKE_CASE | `MAX_ITEMS_PER_PAGE` |
| CSS 类 | Tailwind 原子类为主 | 避免自定义类名 |

### 4.3 禁止事项

- ❌ 禁止使用 Options API（全部用 Composition API + `<script setup>`）
- ❌ 禁止滥用 `any` 类型（必要时用 `unknown` + 类型守卫）
- ❌ 禁止跨 feature 直接引用另一个 feature 的内部组件
- ❌ 禁止硬编码 API URL / 密钥 / 业务常量
- ❌ 禁止把服务端数据存到 Pinia（用 TanStack Query）
- ❌ 禁止在模板中写复杂逻辑（提取到 computed）

---

## 五、测试生成规范

### 5.1 测试分层

| 层级 | 工具 | 覆盖对象 | 要求 |
|------|------|---------|------|
| **单元测试** | Vitest | utils / composables / stores | 核心函数 100% 覆盖 |
| **组件测试** | Vitest + @vue/test-utils | 关键交互组件 | 主要交互路径覆盖 |
| **E2E 测试** | Playwright | 核心用户路径 | 3-5 条关键流程 |

### 5.2 测试命名规范

```typescript
describe('usePagination', () => {
  describe('initial state', () => {
    it('should start at page 1', () => { ... })
    it('should have default page size', () => { ... })
  })

  describe('goToPage', () => {
    it('should update current page', () => { ... })
    it('should not go below page 1', () => { ... })
  })
})
```

### 5.3 测试文件位置

```
src/
├── utils/
│   └── format.ts
│   └── __tests__/
│       └── format.test.ts
│
├── composables/
│   └── useTheme.ts
│   └── __tests__/
│       └── useTheme.test.ts
│
└── components/
    └── shared/
        └── ProjectCard.vue
        └── ProjectCard.test.ts
```

---

## 六、Review 检查清单

### 6.1 每次 AI 生成代码后，人必须逐项检查

**类型安全：**
- [ ] 所有 Props / Emits 有明确类型
- [ ] 没有 `any` 滥用
- [ ] API 响应类型完整
- [ ] Zod Schema 与 TypeScript 类型一致

**状态管理：**
- [ ] 客户端 UI 状态放 Pinia
- [ ] 服务端数据走 TanStack Query
- [ ] 没有重复存状态
- [ ] Mutation 后正确失效缓存

**用户体验：**
- [ ] 异步操作有 Loading 状态
- [ ] 出错有 Error 提示
- [ ] 空数据有 Empty 状态
- [ ] 表单有校验与错误反馈
- [ ] 成功/失败有 Toast 反馈

**可访问性：**
- [ ] 语义化 HTML 标签
- [ ] 交互元素可键盘操作
- [ ] Focus 状态可见
- [ ] 表单有 Label
- [ ] 图片有 alt

**性能：**
- [ ] 大列表用虚拟滚动
- [ ] 图片有 lazy loading
- [ ] 路由懒加载
- [ ] 没有不必要的重渲染

**代码质量：**
- [ ] ESLint 无报错
- [ ] Type Check 通过
- [ ] 命名清晰有意义
- [ ] 没有注释掉的死代码
- [ ] 目录结构符合 Feature-based 规范

---

## 七、ADR（Architecture Decision Record）规范

### 7.1 ADR 目录

```
docs/
└── adr/
    ├── README.md
    ├── 0001-record-architecture-decisions.md
    ├── 0002-use-pinia-for-client-state.md
    ├── 0003-use-tanstack-query-for-server-state.md
    ├── 0004-use-supabase-as-baas.md
    ├── 0005-use-shadcn-vue-instead-of-element-plus.md
    ├── 0006-use-feature-based-architecture.md
    └── ...
```

### 7.2 ADR 模板

```markdown
# ADR-XXX: [决策标题]

## Status

Accepted

## Context

<!-- 我们遇到了什么问题？有什么约束？ -->

## Decision

<!-- 我们决定怎么做？ -->

## Consequences

### Positive

<!-- 这个决策带来了什么好处？ -->

### Negative

<!-- 这个决策有什么代价 / 限制？ -->

### Neutral

<!-- 有什么中性的影响？ -->

## Alternatives Considered

<!-- 我们还考虑了哪些方案？为什么没选？ -->
```

### 7.3 必须记录的 ADR

| ADR | 决策 |
|-----|------|
| ADR-001 | 使用 Pinia 管理客户端状态 |
| ADR-002 | 使用 TanStack Query 管理服务端状态 |
| ADR-003 | 使用 Supabase 作为 BaaS |
| ADR-004 | 使用 shadcn-vue 而非 Element Plus |
| ADR-005 | 采用 Feature-based 目录架构 |
| ADR-006 | 使用 Zod 做表单校验 |
| ADR-007 | 不做 SSR，保持 SPA |

---

## 八、AI Coding 红线（禁止事项）

### 8.1 绝对禁止

1. **禁止让 AI 一次性生成整个项目**
   - 必须分 Task 逐步执行，每步人工 Review
   - 一次性生成的代码必然存在架构问题

2. **禁止跳过类型定义直接写实现**
   - 先定义 Types / Zod Schema，再写业务代码
   - 类型先行是 TypeScript 项目的核心纪律

3. **禁止生成未经验证的依赖版本**
   - 所有 npm 包版本需确认兼容性
   - 不使用 `latest` 或 `*` 版本号

4. **禁止硬编码任何敏感信息**
   - API URL → `import.meta.env.VITE_*`
   - 密钥 → 环境变量，绝不提交 Git
   - 业务常量 → `utils/constants.ts`

5. **禁止 AI 直接推送到 main 分支**
   - 所有变更走 feature 分支 + PR
   - 人 Review 后再合并

### 8.2 警惕的反模式

| 反模式 | 正确做法 |
|--------|---------|
| 把所有东西都塞进一个组件 | 按职责拆分子组件 |
| 在 setup 里写几百行逻辑 | 提取到 composables |
| 所有数据都放 Pinia | 服务端数据用 TanStack Query |
| 组件直接调 API | 走 Service 层封装 |
| 复制粘贴三段相似代码 | 提取为公共组件或 composable |
| 为了"通用"而过度抽象 | 先用两次再抽象 |

---

## 九、日常开发节奏建议

### 9.1 每日流程

```
上午：
  1. 回顾昨天的 PR，Review AI 生成的代码
  2. 确定今天要完成的 1-2 个 Task
  3. 让 AI 生成第一个 Task 的代码骨架

下午：
  4. Review AI 生成的代码，修改架构/类型问题
  5. 让 AI 补全实现 + 生成测试
  6. 手动验证 + 跑测试
  7. Commit + Push + 发 PR

晚上（可选）：
  8. 写 Engineering Journal：今天遇到了什么问题、做了什么决策
```

### 9.2 每周回顾

- 本周完成了哪些 Task？
- 哪些地方 AI 生成的代码质量好？哪些需要大量修改？
- 有没有需要调整的技术决策？（记录到 ADR）
- 下周计划做什么？

---

## 十、AI 辅助的额外价值

### 10.1 让 AI 参与的额外环节

除了写代码，AI 还可以帮助：

- **生成 README**：根据实际代码自动生成项目文档
- **生成 Changelog**：根据 Commit 历史生成版本更新日志
- **Code Review 工具**：用 AI 做第一轮 Review，人做第二轮
- **测试覆盖率分析**：让 AI 找出未覆盖的边界情况
- **性能分析**：让 AI 审查可能的性能瓶颈
- **文档同步**：代码变更后让 AI 更新相关文档

### 10.2 把 AI 使用过程本身做成证据

在项目的 `docs/ai-development.md` 中记录：

- 哪些部分用了 AI 辅助
- AI 在哪些环节最有效
- 哪些地方需要人介入修正
- AI 生成代码的 Review 成本

> 这本身就是一个工程能力的展示：**你会用 AI 但不依赖 AI，知道什么时候该用、什么时候不该用。**

---

## 十一、快速参考卡

### 开始一个新 Task 时

```
1. 读 PRD 对应章节，明确需求
2. 确认技术方案（参考架构文档）
3. 用 Prompt 模板让 AI 生成骨架
4. Review 架构与类型
5. 让 AI 填充实现
6. 让 AI 生成测试
7. 手动验证 + 跑 lint/type-check/test
8. Commit + Push
```

### AI 生成代码后必查

```
□ TypeScript 类型完整？
□ Loading / Error / Empty 都有？
□ 响应式布局覆盖？
□ 可访问性（语义化 / 键盘）？
□ ESLint 无报错？
□ 测试通过？
```

### 提交前最后检查

```
□ Commit Message 符合 Conventional Commits？
□ 没有硬编码密钥 / URL？
□ 目录结构符合 Feature-based 规范？
□ 相关文档需要更新吗？
```
