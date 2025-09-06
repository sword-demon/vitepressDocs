# Next.js 学习

## 选择 Nextjs 的理由

目前最流行的 React 框架之一，由 Vercel 公司开发维护

- 开箱即用的完整功能：路由系统、构建优化、图像处理等都已集成

- 多种渲染方式：支持服务器渲染 SSR，静态站点生成 SSG 和客户端渲染

- 简化的数据获取：提供简洁的数据加载方式

- 内置 API 支持：可在同一项目中构建前端和后端

- 良好的开发体验：快速刷新 、明确的错误提示

- 强大的生态系统：大量的社区组件和插件

## 安装

```Shell
npx create-next-app@latest

✔ What is your project named? … my-app
✔ Would you like to use TypeScript? … No / Yes
✔ Which linter would you like to use? › None
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack? (recommended) … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in 你的目录


---

等待安装依赖
```

## 文件系统路由：自动 URL 映射

Next.js 的一个核心特点是**文件系统路由。**这意味着你的项目文件结构直接决定了网站的 URL 路径，不需要额外的路由配置。

### 基本路由规则

在`App Router`中， 路由遵循以下规则：

1. 文件命名：特殊文件有特殊用途：

   2. `page.tsx`：定义路由的主要内容

   3. `layout.tsx`：定义共享 UI

   4. `loading.tsx`：加载 UI

   5. `error.tsx`：错误 UI

   6. `not-found.tsx`：404UI

2. 目录映射：目录名直接映射到 URL 路径：

   ```Markdown
   app/page.tsx              → /
   app/about/page.tsx        → /about
   app/blog/page.tsx         → /blog
   app/blog/post/page.tsx    → /blog/post
   ```

3. 嵌套路由：子目录创建嵌套路由，共享父布局：

   ```Markdown
   app/layout.tsx            → 应用于所有页面
   app/blog/layout.tsx       → 应用于所有/blog/*页面
   ```

### 示例

```PowerShell
app/
├── page.tsx         # 首页 (/)
├── layout.tsx       # 根布局
├── about/
│   └── page.tsx     # 关于页 (/about)
└── blog/
    ├── page.tsx     # 博客列表页 (/blog)
    └── [slug]/
        └── page.tsx # 博客文章页 (/blog/article-1)
```

## 页面间导航

Next.js 提供了`Link`组件用于页面导航，它比普通的 HTML 的`<a>`标签更高效

```TypeScript
import Link from 'next/Link';

export default function HomePage() {
  return (
    <div>
      <h1>欢迎来到我的网站</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">首页</Link>
          </li>
          <li>
            <Link href="/about">关于</Link>
          </li>
          <li>
            <Link href="/blog">博客</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
```

`Link`组件的优点：

- 客户端导航，无需完全刷新页面

- 自动代码分割，只加载需要的代码

- 预加载可见链接的页面，提升速度

## 静态资源管理

Next.js 的`public`目录用于存放静态资源，如图片、字体、图表等，这些文件可以直接通过 URL 路径进行访问

### 使用静态资源

```Shell
public/
└── images/
    ├── logo.png
    └── banner.jpg
```

在代码中使用

```TypeScript
// 使用普通img标签
<img src="/images/logo.png" alt="Logo" />

// 使用Next.js优化的Image组件（推荐）
import Image from 'next/image';

<Image
  src="/images/banner.jpg"
  alt="Banner"
  width={800}
  height={400}
  className="rounded"
/>
```

### Next.js Image 组件优势

比普通的`<img>`标签有许多优势：

- 自动优化图像大小

- 延迟加载（图像只在进入视口时加载）

- 防止布局偏移(CLS)

- 支持现代图像格式

### 其他静态资源

- 字体文件：放在`public/fonts/`

- 网站图标：`public/favicon.ico`

- 网站清单：`public/manifest.json`(用于 PWA)

## 组件基础：构建 UI 的积木

什么是组件？

**组件是 React 和 Next.js 应用的基本构建块，它们是可重用的、独立的代码段，用于构建用户界面。**

想象组件就像乐高积木：

- 每个组件有特定的功能和外观（如按钮、卡片、表单）

- 组件可以组合成更大的结构（如整个页面）

- 组件可以接收不同的参数(`props`)，展现不同的样式和行为

### 组件的基本结构

一个基本的 React 组件通常长这样

```TypeScript
// 简单的按钮组件
export default function Button({ text, onClick, color = "blue" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded text-white bg-${color}-500 hover:bg-${color}-600`}
    >
      {text}
    </button>
  );
}
```

使用这个组件

```TypeScript
// 在页面中使用按钮组件
import Button from '@/components/Button';

export default function HomePage() {
  return (
    <div>
      <h1>欢迎访问我的网站</h1>
      <Button text="点击我" onClick={() => alert('你好！')} color="green" />
    </div>
  );
}
```

### **组件带来的优势**

1. 可复用性：我们可以在多个页面中使用相同的组件

2. 可维护性：修改组件会影响所有使用它的页面样式

3. 关注点分离：每个组件专注于特定的功能

4. 团队协作：不同开发者可以处理不同的组件

5. 测试简化：可以单独测试每个组件

### 服务端组件和客户端组件

Next.js 13 引入了 Raect 的服务器组件，这是理解现代 Next.js 应用的关键概念

#### 服务端组件（默认）

在 App Router 中，**所有组件默认都是服务端组件，**除非你明确指定它们是客户端组件。

**服务端组件的特点：**

- 在服务器上渲染，将 HTML 发送给浏览器

- 不包含任何 JavaScript 交互代码

- 可以直接访问服务器资源（数据库、文件系统等）

- 不能使用浏览器 api、事件处理器或 React hooks

**适用场景：**

- 数据获取和处理

- 访问服务器资源

- 保持敏感信息在服务器

- 大型依赖库仅在服务器加载，减小前端包大小

一个简单的服务端组件示例：

```TypeScript
// app/products/page.jsx - 服务端组件
import ProductCard from '@/components/ProductCard';

async function getProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}

export default async function ProductsPage() {
  // 直接在服务端组件中获取数据
  const products = await getProducts();

  return (
    <div>
      <h1>产品列表</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
```

### 客户端组件

要创建客户端组件，需要在文件顶部添加`'use client'`指令

```TypeScript
// components/Counter.jsx
'use client'

import { useState } from 'react';

export default function Counter() {
  // 在客户端组件中使用状态和事件处理
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded">
      <p className="text-xl">当前计数：{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        增加
      </button>
    </div>
  );
}
```

客户端组件的特点：

- 在浏览器中运行

- 可以使用状态、效果和浏览器 API

- 支持交互性和事件处理

- 增加客户端 JavaScript 包的大小

适用场景：

- 交互功能（表单、计数器等）

- 使用浏览器 API（localStorage、navigator 等）

- 使用 React hooks（useState、useEffect 等）

- 基于用户事件的 UI 更新

### 组件组合模式

一个常见的模式：服务端组件获取数据，然后将数据传递给客户端交互组件

```TypeScript
// EditForm.jsx - 客户端组件
'use client'

import { useState } from 'react';

export default function EditForm({ initialData, onSave }) {
  const [formData, setFormData] = useState(initialData);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave(formData);
    }}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <button type="submit">保存</button>
    </form>
  );
}

// app/product/[id]/edit/page.jsx - 服务端组件
import EditForm from '@/components/EditForm';
import { getProductById } from '@/lib/data';

export default async function EditProductPage({ params }) {
  // 在服务端获取数据
  const product = await getProductById(params.id);

  return (
    <div>
      <h1>编辑产品</h1>
      {/* 将服务端获取的数据传递给客户端组件 */}
      <EditForm initialData={product} />
    </div>
  );
}
```

这种模式让你可以同时利用服务端组件的数据获取能力和客户端组件的交互能力。

## 组件的创建和使用

### 基础组件开发

我们创建一个基础的卡片组件：

```TypeScript
// components/Card.jsx
import Image from 'next/image';

export default function Card({ title, description, imageUrl }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      {imageUrl && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={200}
            className="rounded"
          />
        </div>
      )}

      <h3 className="text-lg font-medium mb-2">{title}</h3>

      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
}
```

### 组件的复用和组合

```TypeScript
// components/CardGrid.jsx
import Card from './Card';

export default function CardGrid({ items }) {
  if (items.length === 0) {
    return <p>没有找到任何项目</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
}
```

### props 和 children

React 组件的 2 个核心概念：

- **props：传递个组件的数据，类似函数参数**

- **children：**组件标签之间的内容，允许组件包裹其他元素

```TypeScript
// 使用children创建一个布局组件
// components/Panel.jsx
export default function Panel({ title, children, footer }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <div className="p-6">
        {children}
      </div>

      {footer && (
        <div className="px-6 py-3 bg-gray-50 border-t">
          {footer}
        </div>
      )}
    </div>
  );
}

// 使用Panel组件
import Panel from '@/components/Panel';
import Button from '@/components/Button';

export default function AboutPage() {
  return (
    <Panel
      title="关于我们"
      footer={<Button text="了解更多" />}
    >
      <p>
        我们是一家专注于提供高质量web服务的公司。
        我们的团队由经验丰富的开发者和设计师组成。
      </p>
    </Panel>
  );
}
```

## 组件的组织和管理

### 合理的文件夹结构

```Shell
my-project/
├── app/                  # 页面和路由
│   ├── page.jsx          # 首页
│   ├── about/            # 关于页
│   │   └── page.jsx
│   └── products/         # 产品页
│       └── page.jsx
├── components/           # 所有共享组件
│   ├── ui/               # 基础UI组件
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Card.jsx
│   ├── layout/           # 布局相关组件
│   │   ├── Navbar.jsx    # 导航栏
│   │   └── Footer.jsx    # 页脚
│   └── features/         # 功能相关组件
│       ├── ProductList.jsx
│       └── ContactForm.jsx
└── lib/                  # 工具函数和服务
```

这种结构有几个优点：

- 清晰区分不同类型的组件

- 容易找到特定的组件

- 支持团队协作和代码复用

### 特定页面组件 vs 共享组件

对于只在特定页面使用的组件，可以将它们放在页面目录中

```Shell
app/dashboard/
├── page.jsx              # 仪表盘页面
└── components/           # 仅仪表盘页面使用的组件
    ├── DashboardStats.jsx
    └── ActivityFeed.jsx
```

这种方式使页面和其他依赖的组件保持在一起，有助于维护。

## 现代 UI 组件库

使用组件库可以大大加速开发，特别是对于设计资源有限的团队。

### shadcn/ui：高度可定制的组件集合

[shadcn/ui](https://ui.shadcn.com/) 是一个非常流行的组件集合，它与 Next.js 集成得特别好。不同于传统组件库，shadcn/ui 允许你将组件代码复制到项目中，完全控制组件的实现和样式。

**安装和使用步骤：**

```Shell
# 创建Next.js项目
npx create-next-app@latest my-app --typescript --tailwind --eslint

# 安装shadcn/ui CLI
npm install -D @shadcn/ui

# 初始化
npx shadcn-ui init

# 添加需要的组件
npx shadcn-ui add button card input
```

使用按钮组件：

```PowerShell
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <h1>欢迎来到我的网站</h1>
      <Button>点击我</Button>
    </div>
  );
}
```

shadcn/ui 的优势：

- 基于 Radix UI 和 Tailwind CSS 构建

- 高度可定制，可以完全控制组件代码

- 符合现代设计审美

- 可访问性好

- 不增加依赖包大小（因为代码直接复制到项目中）

### 其他值得考虑的组件库：

- **Material-UI (MUI)**：基于 Google 的 Material Design，提供丰富、可定制的组件，适合快速构建现代化的 UI。
  [https://mui.com/](https://mui.com/)

- **Ant Design**：企业级 UI 设计语言，提供大量高质量的 React 组件，特别适合管理系统和复杂应用。
  [https://ant.design/](https://ant.design/)

- **Chakra UI**：注重无障碍性和简洁性的组件库，支持主题化和样式定制，开发体验友好。
  [https://chakra-ui.com/](https://chakra-ui.com/)

- **React Bootstrap**：将 Bootstrap 的经典样式和功能带入 React，提供易用的组件，适合熟悉 Bootstrap 的开发者。
  [https://react-bootstrap.github.io/](https://react-bootstrap.github.io/)

- **Headless UI + Tailwind CSS**：Headless UI 提供无样式的功能组件，结合 Tailwind CSS 的实用类，可以高度自定义 UI。
  [https://headlessui.com/](https://headlessui.com/) + [https://tailwindcss.com/](https://tailwindcss.com/)

选择组件库时，考虑项目需求、团队经验和设计要求，找到最适合你的解决方案。

## Next.js 作为全栈框架

全栈开发简介

> Next.js 不仅是一个强大的前端框架，它是一个真正的全栈开发框架。这意味着你可以使用同一个项目、同一种语言(JavaScript/TypeScript)来开发网站的前端界面和后端的逻辑。

**全栈开发的优势：**

- **技术栈统一：**前后端使用同一种语言，减少上下文切换成本

- **代码共享：**类型定义、验证逻辑等可以在前后端共享

- **开发效率提升：**一个项目同时处理前端和后端，工作流更顺畅

- **部署简化：**单一应用包含前端和后端，简化部署流程

- **性能优化：**服务器组件和流式渲染提供更好的用户体验

- **更好的 SEO：**服务器渲染提供搜索引擎可读的完整的 HTML

Next.js 打破了传统前后端分离的壁垒，让全栈开发变得更加直观和高效。

### API Routes：构建后端服务

Next.js 提供了 2 种方式来构建 API：Pages Router 中的 API Routes 和 App Route Handlers。

### App Router 中的 Route Handlers

在 App Router 结构中，API 端点使用 Route Handlers，位于`app/api`目录：

```Shell
app/
└── api/
    ├── hello/
    │   └── route.js    # GET /api/hello
    ├── users/
    │   └── route.js    # GET, POST /api/users
    └── products/
        ├── route.js    # GET, POST /api/products
        └── [id]/
            └── route.js # GET, PUT, DELETE /api/products/1
```

**基本 API 实现：**

```JavaScript
// app/api/hello/route.js
export async function GET() {
  return Response.json({ message: '你好，世界！' });
}
```

### 处理不同 HTTP 方法

```JavaScript
// app/api/users/route.js
export async function GET() {
  // 获取用户列表
  const users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' }
  ];
  return Response.json(users);
}

export async function POST(request) {
  // 创建新用户
  const data = await request.json();

  // 验证数据
  if (!data.name || !data.email) {
    return Response.json(
      { error: '姓名和邮箱是必填项' },
      { status: 400 }
    );
  }

  // 实际应用中，这里会保存到数据库
  const newUser = { id: 3, ...data };

  return Response.json(newUser, { status: 201 });
}
```

### 处理动态路由

API 也支持动态路由参数，方便处理特定资源：

```JavaScript
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params;

  // 模拟数据库查询
  const users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' }
  ];

  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return Response.json(
      { error: '用户不存在' },
      { status: 404 }
    );
  }

  return Response.json(user);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  // 实际中这里会更新数据库
  const updatedUser = { id: parseInt(id), ...data };

  return Response.json(updatedUser);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  // 实际中这里会从数据库删除

  // 成功删除后返回204状态码（无内容）
  return new Response(null, { status: 204 });
}
```

### 请求和响应处理

Next.js 使用标准的 Request 和 Response API，方便处理请求

```JavaScript
// app/api/search/route.js
export async function GET(request) {
  // 获取URL参数
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query) {
    return Response.json(
      { error: '搜索词是必需的' },
      { status: 400 }
    );
  }

  // 模拟搜索结果
  const results = Array.from({ length: limit }, (_, i) => ({
    id: i + 1,
    title: `搜索结果 ${i + 1} 关于 "${query}"`
  }));

  return Response.json({
    query,
    limit,
    results
  });
}
```

### 数据获取的方法

#### 服务器组件中的数据获取

在服务器组件中，你可以直接使用`async/await`获取数据

```JavaScript
// app/users/page.jsx (服务器组件)
async function getUsers() {
  // 从API获取用户数据
  const res = await fetch('https://api.example.com/users');
  if (!res.ok) throw new Error('获取用户数据失败');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>用户列表</h1>
      <ul className="grid gap-4">
        {users.map(user => (
          <li key={user.id} className="border p-4 rounded">
            <h2 className="font-bold">{user.name}</h2>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### 客户端组件获取数据

对于需要客户端交互的功能，可以使用`SWR`或者 Raect Query 库

```JavaScript
'use client'

import { useState } from 'react';
import useSWR from 'swr';

// 获取函数
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function SearchComponent() {
  const [query, setQuery] = useState('');

  // 使用SWR获取和缓存数据
  const { data, error, isLoading } = useSWR(
    query ? `/api/search?q=${query}` : null,
    fetcher
  );

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">搜索</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入搜索词..."
          className="border p-2 rounded flex-grow"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          搜索
        </button>
      </div>

      <div className="mt-4">
        {isLoading && <p>加载中...</p>}
        {error && <p className="text-red-500">加载失败</p>}

        {data && (
          <ul className="space-y-2">
            {data.results.map(item => (
              <li key={item.id} className="border p-2 rounded">
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

### 实际应用场景

下面看一些 Next.js 后端实际应用场景，让你理解如何在真实项目中使用这些功能。

#### 构建 REST API

完整的产品管理 API 示例：

```JavaScript
// app/api/products/route.js
import { db } from '@/lib/db'; // 假设这是你的数据库连接

export async function GET() {
  try {
    // 从数据库获取所有产品
    const products = await db.products.findMany();
    return Response.json(products);
  } catch (error) {
    return Response.json(
      { error: '获取产品失败' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const productData = await request.json();

    // 数据验证
    if (!productData.name || !productData.price) {
      return Response.json(
        { error: '产品名称和价格是必填项' },
        { status: 400 }
      );
    }

    // 创建新产品
    const newProduct = await db.products.create({
      data: productData
    });

    return Response.json(newProduct, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: '创建产品失败' },
      { status: 500 }
    );
  }
}
```

#### 文件上传处理

处理图片上传的 API 示例：

```JavaScript
// app/api/upload/route.js
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return Response.json(
      { error: '没有提供文件' },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 确保文件名唯一
  const fileName = `${Date.now()}-${file.name}`;
  const path = join(process.cwd(), 'public/uploads', fileName);

  try {
    await writeFile(path, buffer);
    return Response.json({
      success: true,
      fileName,
      url: `/uploads/${fileName}`
    });
  } catch (error) {
    console.error('上传错误', error);
    return Response.json(
      { error: '文件上传失败' },
      { status: 500 }
    );
  }
}
```

#### 第三方 API 集成

集成外部 API 的示例，如天气信息：

```JavaScript
// app/api/weather/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return Response.json(
      { error: '请提供城市名称' },
      { status: 400 }
    );
  }

  try {
    // 调用外部天气API
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`
    );

    const data = await response.json();

    // 简化返回的数据
    return Response.json({
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon
    });
  } catch (error) {
    return Response.json(
      { error: '获取天气信息失败' },
      { status: 500 }
    );
  }
}
```

## 部署全栈项目

## 1. Vercel 平台简介

Vercel 是部署 Next.js 应用的最佳平台，由 Next.js 创建者开发，提供了一系列针对 Next.js 优化的功能：

- **零配置部署**：自动识别 Next.js 项目并优化部署

- **全球 CDN 网络**：提供快速的内容分发

- **Serverless 函数**：自动处理 API Routes

- **预览部署**：每个 PR 自动创建预览环境

- **GitHub 集成**：自动部署代码更新

- **免费额度：**Hobby 模式是免费的

作为全栈应用的部署平台，Vercel 能够同时处理前端界面和后端 API，无需额外配置服务器。

所以作为新手学员，你无需购买服务器就能够快速的部署上线一个全栈项目。非常推荐

## 2. 部署前准备

在部署到 Vercel 前，确保完成以下准备工作：

### 代码准备

1. 创建远程仓库

2. 提交到远程仓库

```Shell
# 确保所有更改都已提交到Git仓库
git add .
git commit -m "Ready for deployment"
git push
```

### 环境变量准备

准备生产环境的环境变量，本地的`.env`文件或者`.env.local`对应的是本地的环境变量。但如果你是生成环境，需要准备生成环境的环境变量，然后替换。

例如你本地的`.env.local`文件是：

```PowerShell
# 示例
NEXT_PUBLIC_API_URL=http://localhost:3000
```

需要准备一个用于生产环境的`.env.production`文件：

```Markdown
# 示例
NEXT_PUBLIC_API_URL=http://your_domain.com
```

生产环境是指用户真实的线上访问环境，开发环境是指你在本地开发的环境。你可以对应不同的环境变量。

## 3. 部署流程

部署 Next.js 应用到 Vercel 非常简单：

### 3.1 创建 Vercel 账户

访问[Vercel 官网](https://vercel.com/)，使用 GitHub、GitLab 或 Bitbucket 账户注册。

### 3.2 导入 Git 仓库

1. 在 Vercel 控制台点击"Add New... > Project"

2. 选择包含你 Next.js 项目的 Git 仓库

3. Vercel 会自动识别 Next.js 项目

### 3.3 配置环境变量

1. 在项目设置页面找到"Environment Variables"部分

2. 添加所有项目需要的环境变量，如 Supabase 连接信息（如果你的项目里面没有使用到环境变量，可忽略）

   ```PowerShell
   NEXT_PUBLIC_API_URL=https://hellonextjs-tutorial.vercel.app

   # 其他环境变量
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

### 3.4 部署项目

点击"Deploy"按钮，Vercel 将自动:

- 克隆你的仓库

- 安装依赖

- 构建 Next.js 应用

- 部署到全球网络

部署完成后，你会获得一个类似`https://your-project.vercel.app`的 URL。

## 4. 连接自定义域名

### 添加域名

1. 在项目控制台中，进入"Settings > Domains"

2. 点击"Add"并输入你的域名

3. 选择根域名或子域名

### 配置 DNS

Vercel 提供两种方式配置域名:

1. **使用 Vercel DNS**：更改域名的名称服务器

2. **使用外部 DNS**：添加 A 记录和 CNAME 记录

配置完成后，Vercel 会自动为你的域名颁发 SSL 证书，确保 HTTPS 访问。
