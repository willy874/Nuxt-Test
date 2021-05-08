import * as Pattern from './pattern'

export default class Icon {
  constructor(args) {
    const entity = args || {}
    this.pattern = entity.pattern
    this.attrs = {
      ...Pattern[this.pattern].attrs,
      ...entity,
    }
    this.mount = Pattern[this.pattern].mount
    this.path = Pattern[this.pattern].path
  }

  static toHTMLString() {
    return ''
  }

  static toHTMLElement() {
    return document
  }
}
