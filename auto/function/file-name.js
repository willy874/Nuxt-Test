/**
 * 大小寫與連接符無法混用，連接符的優先級比駝峰高
 * @constructor
 * @param {String} name
 */
function FileName(name) {
  this.data = []
  const type = /\./.test(name) ? 'file' : 'dir'
  const getExt = () => {
    const file = name.split('.')
    return file[file.length - 1]
  }
  const getFile = () => {
    const file = name.split('.')
    file.splice(file.length - 1, 1)
    return file.join('')
  }
  this.ext = type === 'dir' ? 'dir' : getExt()
  this.name = type === 'dir' ? name : getFile()
  if (/[A-Z]/.test(this.name)) {
    const arr = this.name.split('')
    arr.forEach((s, i) => {
      if (/[A-Z]/.test(s)) {
        arr[i] = '-' + s.toLowerCase()
      }
      this.data = arr
        .join('')
        .split('-')
        .filter(p => p)
    })
  } else if (/\.|\-|_|\s/.test(this.name)) {
    const allow = ['.', '-', '_', '', '\r', '\t', '\n', '\f']
    const arr = this.name.split('')
    arr.forEach((s, i) => {
      if (allow.includes(s)) {
        arr[i] = '-'
      }
    })
    this.data = arr.join('').split('-')
  } else {
    this.data = [this.name]
  }
}
FileName.prototype.ConverBigHump = function () {
  const arr = []
  this.data.forEach(s => {
    if (s[0]) {
      arr.push(s[0].toUpperCase() + s.substring(1))
    }
  })
  return arr.join('')
}
FileName.prototype.ConverLittleHump = function () {
  const arr = []
  this.data.forEach(s => {
    if (s[0]) {
      if (arr.length === 0) {
        arr.push(s.toLowerCase())
      } else {
        arr.push(s[0].toUpperCase() + s.substring(1))
      }
    }
  })
  return arr.join('')
}
module.exports = FileName
