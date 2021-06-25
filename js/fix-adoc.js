// replace the default admonitions block with one that looks like the antora output to apply similar styling via adoc.css
// Ref.: https://blog.anoff.io/2019-02-17-hugo-render-asciidoc/
window.addEventListener('load', function () {

    let getIconClass = (type) => {
        if (type === 'caution') return 'fas fa-exclamation-triangle'
        if (type === 'warning') return 'fas fa-exclamation-circle'
        if (type === 'info') return 'fas fa-info'
        if (type === 'tip') return 'far fa-lightbulb'
        return'fas fa-exclamation' // important
    }

    const admonitions = document.getElementsByClassName('admonitionblock')
    for (let i = admonitions.length - 1; i >= 0; i--) {
      const element = admonitions[i]
      const type = element.classList[1]
      const iconClass = getIconClass(type)
      const text = element.getElementsByClassName('content')[0].innerHTML
      const parent = element.parentNode
      const tempDiv = document.createElement('div')

      tempDiv.innerHTML = `<div class="admonitionblock ${type}">
      <table>
        <tbody>
          <tr>
            <td class="icon">
              <i class="${iconClass}" title="${type}"></i>
            </td>
            <td class="content">
              ${text}
            </td>
          </tr>
        </tbody>
      </table>
    </div>`
  
      const input = tempDiv.childNodes[0]
      parent.replaceChild(input, element)
    }
  })