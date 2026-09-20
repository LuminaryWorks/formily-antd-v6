# 发布 `@luminaryworks/formily-antd-v6`

与 [`LuminaryWorks/shared`](https://github.com/LuminaryWorks/shared/blob/master/PUBLISH.md) 相同：**npmjs 公开包 + GitHub Actions OIDC Trusted Publishing**，CI **不使用** `NPM_TOKEN`。

## 触发

推送到 `master` / `main`，或 Actions 手动 Run `publish-packages.yml`。

行为：

1. 本地版本已在 npmjs，且自上次改 `package.json` version 后无源码变更 → **跳过**
2. 有未发布源码变更（或手动勾选 `force`）→ **自动 bump**（默认 patch）后 `npm publish`
3. 本地版本已高于 npmjs（例如本机刚发过首版）→ **不再 bump**，直接发当前号

成功后会 commit `packages/components/package.json`（`[skip ci]`）。

```bash
gh workflow run publish-packages.yml --repo LuminaryWorks/formily-antd-v6
```

## 首版必须本机发一次

OIDC **不能创建尚不存在的包名**。确认 registry 上已有版本：

```bash
npm view @luminaryworks/formily-antd-v6 version --registry https://registry.npmjs.org/
```

若 404，先本机：

```bash
cd packages/components
npm publish --access public --registry https://registry.npmjs.org/ --otp=XXXXXX
```

## 绑定 Trusted Publisher（每个包一次）

首版上架后立刻绑定，否则下次 CI 会 `ENEEDAUTH`：

`https://www.npmjs.com/package/@luminaryworks/formily-antd-v6` → **Settings → Trusted Publisher → GitHub Actions**

| 字段                 | 值                                   |
| -------------------- | ------------------------------------ |
| Organization or user | `LuminaryWorks`                      |
| Repository           | `formily-antd-v6`                    |
| Workflow filename    | `publish-packages.yml`（只要文件名） |
| Environment          | **留空**                             |
| Allowed actions      | **勾选 `npm publish`**               |

或（需网页 2FA，bypass-2FA token 会 403）：

```bash
npm trust github @luminaryworks/formily-antd-v6 \
  --repo LuminaryWorks/formily-antd-v6 \
  --file publish-packages.yml \
  --allow-publish -y
```

## 不要做

- 不要在 GitHub Secrets 放 `NPM_TOKEN` / `NPM_AUTH_TOKEN`
- 不要给 publish 步骤设 `NODE_AUTH_TOKEN`（会关掉 OIDC）
- 不要改 workflow 文件名（改了必须同步改 npmjs Trusted Publisher）

旧的 `release.yml`（lerna + `NPM_AUTH_TOKEN`）已废弃，请勿再用。
