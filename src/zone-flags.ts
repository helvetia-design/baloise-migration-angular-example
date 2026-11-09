// Disable patching requestAnimationFrame, as recommended by the Baloise Design System
// getting-started guide — the web components drive their animations with rAF.
;(window as any).__Zone_disable_requestAnimationFrame = true

// Disable patching custom elements (web components).
;(window as any).__Zone_disable_customElements = true
