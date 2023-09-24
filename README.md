# Web在线聊天：Next.js 13、React、Tailwind、Prisma、MongoDB、NextAuth、Pusher

### 特性

- 使用 Pusher 进行实时消息传递
- 消息通知和提醒
- 使用 TailwindCSS 编写UI、实现动画和过渡效果
- 全设备响应式布局
- 使用 NextAuth 进行凭据认证
- 集成 Google 认证
- 集成 Github 认证
- 使用 Cloudinary CDN 进行文件和图片上传
- 使用 react-hook-form 进行客户端表单验证和处理
- 使用 react-toast 进行服务器错误处理
- 消息已读回执
- 在线/离线用户状态
- 群组聊天和一对一消息
- 消息附件和文件共享
- 用户个人资料自定义和设置
- 如何在路由处理程序（app/api）中编写 POST、GET 和 DELETE 路由
- 如何在服务器端 React 组件中直接访问数据库来获取数据
- 在实时环境中处理服务器和子组件之间的关系
- 创建管理聊天室和频道

### Install packages

```shell
npm i
```

### Setup .env file

```js
DATABASE_URL=
NEXTAUTH_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |

## 职责

- 封装用户鉴权组件，使用 react-hook-form 进行客户端表单验证和处理、使用 NextAuth 凭据认证、集成 Github 认证

- 使用 prisma 创建 mogondb 集合、配置数据库模型和类型
