export const NW = 176
export const NH = 58

export function bezierPath(fromNode, toNode) {
  const x1 = fromNode.x + NW
  const y1 = fromNode.y + NH / 2
  const x2 = toNode.x
  const y2 = toNode.y + NH / 2
  const gap = x2 - x1
  const dx = gap > 0 ? Math.max(16, Math.min(80, gap * 0.45)) : 60
  return `M ${x1} ${y1} C ${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`
}

export function walkOrder(nodes = [], connections = []) {
  const list = Array.isArray(nodes) ? nodes : []
  const edges = Array.isArray(connections) ? connections : []
  const ids = new Set(list.map(n => n.id))
  const byId = new Map(list.map(n => [n.id, n]))
  const children = new Map([...ids].map(id => [id, []]))
  const incoming = new Map([...ids].map(id => [id, 0]))

  for (const c of edges) {
    if (!ids.has(c.from) || !ids.has(c.to)) continue
    children.get(c.from).push(c.to)
    incoming.set(c.to, (incoming.get(c.to) || 0) + 1)
  }

  for (const [, kids] of children) {
    kids.sort((a, b) => {
      const na = byId.get(a)
      const nb = byId.get(b)
      return (na?.x || 0) - (nb?.x || 0) || (na?.y || 0) - (nb?.y || 0)
    })
  }

  const roots = list
    .filter(n => (incoming.get(n.id) || 0) === 0)
    .sort((a, b) => a.x - b.x || a.y - b.y)
    .map(n => n.id)

  const order = []
  const seen = new Set()

  function walkComponent(root) {
    const queue = [root]
    while (queue.length) {
      const id = queue.shift()
      if (seen.has(id)) continue
      seen.add(id)
      order.push(id)
      for (const child of children.get(id) || []) {
        if (!seen.has(child)) queue.push(child)
      }
    }
  }

  roots.forEach(walkComponent)
  list.forEach(n => {
    if (!seen.has(n.id)) order.push(n.id)
  })
  return order
}
