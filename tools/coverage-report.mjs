import fs from 'fs'
import path from 'path'

const pkg = 'node_modules/@baloise'
const app = 'src/app'

/* ---------- inventory: events + methods per tag ---------- */
const proxySources = [
  pkg + '/ds-angular/generated/proxies.d.ts',
  ...fs.readdirSync(pkg + '/ds-angular/components')
    .filter(f => f.endsWith('.d.ts') && f !== 'index.d.ts')
    .map(f => pkg + '/ds-angular/components/' + f),
]
const events = {}       // tag -> [outputs]
const clsForTag = {}
for (const file of proxySources) {
  const src = fs.readFileSync(file, 'utf8')
  const re = /ɵɵComponentDeclaration<(\w+), "([a-z-]+)", never, \{.*?\}, \{(.*?)\}, never/g
  let m
  while ((m = re.exec(src))) {
    const [, cls, tag, outs] = m
    clsForTag[tag] = cls
    events[tag] = [...outs.matchAll(/"(\w+)":/g)].map(x => x[1])
  }
}

const core = fs.readFileSync(pkg + '/ds-core/dist/types/components.d.ts', 'utf8')
const nsStart = core.indexOf('export namespace Components {')
const ns = core.slice(nsStart, core.indexOf('\n}\n', nsStart))
const methods = {}      // class -> [methods]
const ifaceRe = /interface (Bal\w+) \{([\s\S]*?)\n    \}/g
let im
while ((im = ifaceRe.exec(ns))) {
  const list = []
  const propRe = /^\s*"(\w+)"\??:\s*([^\n]*)$/gm
  let p
  while ((p = propRe.exec(im[2]))) {
    if (/=>\s*Promise</.test(p[2])) list.push(p[1])
  }
  methods[im[1]] = list.filter(n => !['configChanged', 'setAriaForm', 'setAria'].includes(n))
}

/* ---------- what the app actually uses ---------- */
const files = []
const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
  const p = path.join(d, e.name)
  if (e.isDirectory()) walk(p)
  else if (e.name.endsWith('.html') || e.name.endsWith('.ts')) files.push(p)
})
walk(app)
const sources = files.map(f => [f.replace(app, 'src/app'), fs.readFileSync(f, 'utf8')])
const all = sources.map(s => s[1]).join('\n')

const whereTag = tag => sources.filter(([, s]) => new RegExp(`<${tag}[\\s>]`).test(s)).map(([f]) => f)
const whereEvent = ev => sources.filter(([, s]) => s.includes(`(${ev})=`)).map(([f]) => f)
const whereMethod = mth => sources.filter(([, s]) => new RegExp(`nativeElement\\.${mth}\\(`).test(s) || new RegExp(`\\.${mth}\\(`).test(s)).map(([f]) => f)

const required = `bal-accordion bal-app bal-badge bal-button bal-card bal-carousel bal-checkbox bal-close bal-content bal-data bal-date bal-divider bal-dropdown bal-file-upload bal-footer bal-form-grid bal-heading bal-hint bal-icon bal-input bal-input-slider bal-input-stepper bal-label bal-list bal-logo bal-modal bal-navbar bal-notification bal-number-input bal-pagination bal-popover bal-popup bal-progress-bar bal-radio bal-segment bal-select bal-shape bal-sheet bal-snackbar bal-spinner bal-stack bal-steps bal-table bal-tabs bal-tag bal-text bal-textarea bal-toast bal-tooltip`.split(/\s+/)

console.log('## Required components present in the app\n')
for (const tag of required) {
  const where = whereTag(tag)
  console.log(`${where.length ? 'x' : ' '} ${tag} — ${where.length ? where.join(', ') : 'MISSING'}`)
}

console.log('\n## Every tag used in the app (incl. child elements)\n')
const usedTags = [...new Set([...all.matchAll(/<(bal-[a-z-]+)[\s>]/g)].map(m => m[1]))].sort()
console.log(usedTags.join('\n'))

console.log('\n## Event coverage — every component that declares at least one bal* output\n')
for (const [tag, evs] of Object.entries(events).sort()) {
  if (!evs.length) continue
  if (!whereTag(tag).length) continue
  const used = evs.filter(e => whereEvent(e).length && whereTag(tag).some(f => sources.find(s => s[0] === f)[1].includes(`(${e})=`)))
  console.log(`${used.length ? 'x' : ' '} ${tag}  declared: ${evs.join(', ')}  |  bound: ${used.join(', ') || 'NONE'}`)
}

console.log('\n## Method coverage — every component that declares at least one instance method\n')
for (const [tag, cls] of Object.entries(clsForTag).sort()) {
  const ms = methods[cls] || []
  if (!ms.length) continue
  if (!whereTag(tag).length) continue
  const used = ms.filter(mth => whereMethod(mth).length)
  console.log(`${used.length ? 'x' : ' '} ${tag}  declared: ${ms.join(', ')}  |  called: ${used.join(', ') || 'NONE'}`)
}

console.log('\n## Loop generated children — bal-* elements carrying *ngFor\n')
for (const [f, s] of sources) {
  const re = /<(bal-[a-z-]+)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g
  let m
  while ((m = re.exec(s))) {
    if (/\*ngFor/.test(m[2])) console.log(`${m[1]}  ${f}`)
  }
}
