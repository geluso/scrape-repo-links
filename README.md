# Scrape Repo Links
Console.logs git clone commands for all github repos on a page. Copy the
commands and paste them into bash to massively clone lots of repos at once.

Try visiting this list of awesome react native repos to see this thing in
action.

1. copy this code
1. go to http://www.awesome-react-native.com/
1. open the console
1. and paste this code
1. copy what's console.logged
1. paste what's console.logged into your terminal
1. execute
1. voila

All the repos are cloned with simple digit prefixes like `001-some-repo` so
the order they appear on the page is preserved.

The script produces `git clone` commands like this:

```
git clone https://github.com/jondot/awesome-react-native 000-awesome-react-native
git clone https://github.com/jondot/awesome-react-native 001-awesome-react-native
git clone https://github.com/jondot/awesome-react-native/edit/master/docs/index.md 002-index.md
...
```

```js
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
```

