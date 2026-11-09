import fs from 'fs'

const root = 'node_modules/@baloise'
const core = fs.readFileSync(root + '/ds-core/dist/types/components.d.ts', 'utf8')

// Parse Components namespace interfaces
const nsStart = core.indexOf('export namespace Components {')
const nsEnd = core.indexOf('\n}\n', nsStart)
const ns = core.slice(nsStart, nsEnd)
const stencil = {}
const ifaceRe = /interface (Bal\w+) \{([\s\S]*?)\n    \}/g
let m
while ((m = ifaceRe.exec(ns))) {
  const name = m[1]
  const body = m[2]
  const props = []
  const propRe = /^\s*"(\w+)"\??:\s*([^\n]*)$/gm
  let p
  while ((p = propRe.exec(body))) {
    const type = p[2]
    // methods look like "() => Promise<...>" or "(x: T) => Promise<...>"
    if (/=>\s*Promise</.test(type)) continue
    props.push(p[1])
  }
  stencil[name] = props
}

// Parse Angular proxy inputs
const proxyFiles = [
  root + '/ds-angular/generated/proxies.d.ts',
  ...fs.readdirSync(root + '/ds-angular/components').filter(f => f.endsWith('.d.ts') && f !== 'index.d.ts').map(f => root + '/ds-angular/components/' + f),
]
const angular = {}
for (const file of proxyFiles) {
  const src = fs.readFileSync(file, 'utf8')
  const re = /ɵɵComponentDeclaration<(\w+), "([a-z-]+)", never, \{(.*?)\}, \{/g
  let d
  while ((d = re.exec(src))) {
    const cls = d[1]
    const inputs = [...d[3].matchAll(/"(\w+)":\s*\{\s*"alias"/g)].map(x => x[1])
    angular[cls] = inputs
  }
}

const rows = []
for (const [cls, props] of Object.entries(stencil)) {
  const ng = angular[cls]
  if (!ng) continue
  const missing = props.filter(p => !ng.includes(p) && !p.startsWith('_'))
  if (missing.length) rows.push(`${cls}: ${missing.join(', ')}`)
}
console.log(rows.join('\n'))
