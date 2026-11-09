import fs from 'fs'
import path from 'path'

const root = 'src/app'
const files = []
const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
  const p = path.join(d, e.name)
  if (e.isDirectory()) walk(p)
  else if (e.name.endsWith('.html') || e.name.endsWith('.ts')) files.push(p)
})
walk(root)

// crude tag scanner: track open bal-* elements and whether their direct element
// children include both a structural-directive one and a plain one.
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  const tagRe = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)(\/?)>/g
  const stack = []
  let m
  while ((m = tagRe.exec(src))) {
    const [, closing, tag, attrs, selfClose] = m
    const line = src.slice(0, m.index).split('\n').length
    if (closing) {
      while (stack.length) {
        const top = stack.pop()
        if (top.tag === tag) {
          if (top.tag.startsWith('bal-') && top.structural.length && top.plain.length) {
            console.log(`${f.replace(root, 'src/app')}:${top.line} <${top.tag}> mixes structural [${top.structural.join(',')}] with static [${top.plain.join(',')}]`)
          }
          break
        }
      }
      continue
    }
    const isStructural = /\*ngIf|\*ngFor/.test(attrs)
    const parent = stack[stack.length - 1]
    if (parent && parent.tag.startsWith('bal-')) {
      if (isStructural) parent.structural.push(tag)
      else parent.plain.push(tag)
    }
    const voidish = selfClose === '/' || /^(br|hr|img|input|meta|link)$/.test(tag)
    if (!voidish) stack.push({ tag, line, structural: [], plain: [] })
  }
}
