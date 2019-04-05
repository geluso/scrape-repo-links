links = document.getElementsByTagName('a')
links = Array.prototype.slice.call(links)
links = links.filter(link => link.href.includes('github'))
links = links.map(link => link.href)

let clone_commands = links.map((href, index) => {
  index = prefixIndex(index, links.length)
  cells = href.split('/')
  name = cells[cells.length - 1]
  return `git clone ${href} ${index}-${name}`
})
console.log(JSON.stringify(clone_commands.join('; ')))

function prefixIndex(index, total) {
  if (total < 10) {
    return index
  }

  if (total < 100) {
    if (index < 10) {
      return '0' + index
    }
    return index
  }

  if (index < 1000) {
    if (index < 10) return '00' + index
    if (index < 100) return '0' + index
    return index
  }
}
