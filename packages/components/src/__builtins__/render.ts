import type { ReactElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'

const MARK = '__formily_antd_v6_root__'

// ========================== Render ==========================
type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: Root
}

export function render(node: ReactElement, container: ContainerType) {
  const root = container[MARK] || createRoot(container)
  root.render(node)
  container[MARK] = root
}

export function unmount(container: ContainerType): Promise<void> {
  return Promise.resolve().then(() => {
    container[MARK]?.unmount()
    delete container[MARK]
  })
}
