const { execFileSync } = require('child_process')
const { readdirSync } = require('fs')
const { join } = require('path')

for (const entry of readdirSync('packages', { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  execFileSync(process.execPath, ['../../scripts/build-package.cjs'], {
    cwd: join('packages', entry.name),
    stdio: 'inherit',
  })
}
