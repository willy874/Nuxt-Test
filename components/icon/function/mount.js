import * as Patterns from '../pattern'

export default function iconMount() {
  Object.keys(Patterns).forEach(pattern => {
    const svg = Patterns[pattern]
    const arrSvgMount = document.querySelectorAll(svg.mount)
    const arrSvgAttrs = Object.keys(svg.attrs)
    arrSvgMount.forEach(target => {
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      arrSvgAttrs.forEach(attrName => {
        svgElement.setAttribute(attrName, svg.attrs[attrName])
      })
      if (!svgElement.getAttribute.xmlns) {
        svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      }
      svgElement.innerHTML = svg.path

      target.appendChild(svgElement)
    })
  })
}
