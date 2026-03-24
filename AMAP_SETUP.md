# 高德地图 API Key 配置指南

## 🗺️ 获取 API Key

### 1. 注册高德账号
访问 [高德开放平台](https://lbs.amap.com/) 并注册账号

### 2. 创建应用
- 登录后进入「**应用管理**」
- 点击「**创建新应用**」
- 输入应用名称，选择 Web 应用
- 创建成功后会分配一个 App ID 和 API Key

### 3. 获取 Web 服务 Key（可选）
如果需要使用地理编码、路线规划等服务，还需要创建 Web 服务 Key：
- 在同一应用下选择「**创建 Key**」
- 选择「**Web 服务**」类型
- 获取 Key

## 🔧 配置方式

### 方式一：环境变量（推荐）

1. 修改项目根目录的 `.env` 文件：

```bash
VITE_AMAP_API_KEY=your_actual_api_key_here
```

2. 重启开发服务器：

```bash
npm run dev
```

### 方式二：直接修改代码

如果你想快速测试，也可以直接修改：
`src/components/organisms/DsMapContainer.vue`

```typescript
const apiKey = 'your_actual_api_key_here'
const AMap = await AMapLoader.load({
  key: apiKey,
  version: '2.0',
  plugins: [],
})
```

## 🚀 验证配置

启动开发服务器后：

```bash
npm run dev
```

访问 http://localhost:5173/realtime 或 http://localhost:5173/screen

- ✅ 如果地图正常加载显示中国地图 → 配置成功
- ❌ 如果显示错误信息 → 检查 API Key 是否正确

## 📋 常见问题

### Q: 为什么地图显示 "地图加载失败"？
A:
1. 检查 API Key 是否正确填入 `.env` 文件
2. 确认 API Key 所属应用已启用 Web 服务
3. 检查 API Key 是否有调用次数限制（免费账号有日限制）

### Q: 为什么地图上有水印提示？
A:
1. API Key 未正确配置
2. 使用的是占位符 `YOUR_AMAP_API_KEY`
3. 检查 `.env` 文件是否被正确加载

### Q: 如何禁用地图水印？
A: 正确配置有效的 API Key 即可自动隐藏水印

### Q: 地图能离线使用吗？
A: 不能，高德地图 JS API 需要网络连接到高德服务器

## 🔐 安全建议

- ⚠️ **不要将 API Key 提交到 Git 仓库**
- ✅ 将 `.env` 加入 `.gitignore`
- ✅ 仅在 `.env` 文件中存储敏感信息
- ✅ 生产环境使用服务器端 API Key

## 📚 官方文档

- [高德地图 Web JS API 2.0](https://lbs.amap.com/api/javascript-api/summary)
- [API Key 申请](https://lbs.amap.com/faq/account/key/71)
- [Web 应用开发指南](https://lbs.amap.com/api/javascript-api/guide/abc)
