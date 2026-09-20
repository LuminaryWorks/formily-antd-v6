const { execFileSync } = require('child_process')
const {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} = require('fs')
const { join, resolve } = require('path')

const packageDir = process.cwd()
const rootDir = resolve(packageDir, '../..')
const tsc = join(rootDir, 'node_modules', '.bin', 'tsc')

if (!existsSync(join(packageDir, 'tsconfig.build.json'))) {
  throw new Error(`No tsconfig.build.json found in ${packageDir}`)
}

for (const output of ['lib', 'esm', 'dist']) {
  rmSync(join(packageDir, output), { recursive: true, force: true })
}

function compile(module, output) {
  execFileSync(
    tsc,
    [
      '--project',
      'tsconfig.build.json',
      '--module',
      module,
      '--outDir',
      output,
      '--sourceRoot',
      output,
    ],
    { cwd: packageDir, stdio: 'inherit' }
  )
}

function rewriteDeclarationImports(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const target = join(directory, entry.name)
    if (entry.isDirectory()) {
      rewriteDeclarationImports(target)
    } else if (entry.name.endsWith('.d.ts')) {
      const source = readFileSync(target, 'utf8')
      const rewritten = source.replaceAll('antd/lib/', 'antd/es/')
      if (source !== rewritten) writeFileSync(target, rewritten)
    }
  }
}

compile('commonjs', 'lib')
compile('es2015', 'esm')
rewriteDeclarationImports(join(packageDir, 'lib'))
rewriteDeclarationImports(join(packageDir, 'esm'))
