# @luminaryworks/formily-antd-v6

Formily Ant Design **6.x** adaptor for the LuminaryWorks ecosystem (DataLuminary DataView and sibling products).

Forked from [`formilyjs/antd`](https://github.com/formilyjs/antd) (`@formily/antd-v5`). Official Ant Design 6 support is still open ([PR #59](https://github.com/formilyjs/antd/pull/59)); this package merges community work and keeps a maintained publish path under `@luminaryworks`.

## Credits

Adaptation draws from:

- [formilyjs/antd#59](https://github.com/formilyjs/antd/pull/59) (xiaochong444)
- [potop/formily-antd-v6](https://github.com/potop/formily-antd-v6) (`@potop/formily-antd-v6`)
- [bobfw/antd-sync](https://github.com/bobfw/antd-sync) (`formily-antd-sync`)
- [thienvu18/antd](https://github.com/thienvu18/antd) (`@thienvu18/formily-antd-v6`)

## Install

```bash
npm install @luminaryworks/formily-antd-v6 antd@^6 @formily/core @formily/react
```

Peer: `antd ^6`, `react >=18` (React 19 OK).

## Publish

Automatic npm publish uses the same **OIDC Trusted Publishing** pattern as `LuminaryWorks/shared`.

See [PUBLISH.md](./PUBLISH.md).

## Local development / link into DataView

```bash
yarn install --ignore-engines
yarn build
# then in DataView:
#   "@luminaryworks/formily-antd-v6": "link:../../../work/formily-antd-v6/packages/components"
```

## LICENSE

MIT (same as upstream Formily antd adaptor).
