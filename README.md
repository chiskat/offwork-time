# 下班发薪倒计时

“[下班发薪倒计时](https://offwork.paperplane.cc/)” 基于 `create-react-app`、`antd`(v4)、`tailwindcss`、`date-fns` 以及其它工具开发而来；<br />
这是一个娱乐向的项目，旨在提供倒计时功能的同时，探索更多改进用户体验和开发体验的技术。

此项目于 2021 年 4 月创建，于 2026 年 1 月重构。

## 开发指南

建议使用 Node.js 20 或更高版本；推荐使用 `pnpm`，本项目已解决 `create-react-app` 常见的幽灵依赖问题。

安装依赖：

```bash
pnpm i
```

开发调试：

```bash
pnpm dev
```

建议按需对 `.env` 的变量进行定制。

---

发布生产，编译静态文件到 `/dist` 目录：

```bash
pnpm build
```
