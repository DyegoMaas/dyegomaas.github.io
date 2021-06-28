function downloadTechBlogXmlFeed() {
    const getXML = function(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = 'xml'
            xhr.onload = function() {
                const status = xhr.status
                if (status === 200) {
                    resolve(xhr.response)
                } else {
                    reject({'status': status, 'value': xhr.response})
                }
            }
            xhr.send();
        })
    }
    return getXML("https://blog.dyegomaas.com.br/index.xml")
}

function fillWith(containerId, numberOfPosts) {
    downloadTechBlogXmlFeed()
        .then(xml => {
            let feed = document.createElement('feed')
            feed.innerHTML = xml

            let itemElements = feed.getElementsByTagName('item')
            let items = Array.from(itemElements)
                .slice(0, numberOfPosts)
                .map(item => {
                    let dateRegex = /(\d{2} .{3} \d{4})/
                    let date = item.getElementsByTagName('pubDate')[0].innerText.match(dateRegex)[0]
                    let dateParts = date.split(' ')
                    return { 
                        title: item.getElementsByTagName('title')[0].innerText,
                        url: item.getElementsByTagName('guid')[0].innerText,
                        date: {
                            day: dateParts[0],
                            month: dateParts[1],
                            year: dateParts[2]
                        }
                    }
                })                            

            let paragraph = document.createElement('p')
            let spans = items.map(item => {
                let span = document.createElement('span')
                span.classList.add('li')
                span.setAttribute('style', 'color: white; font-family: Source Sans Pro, sans-serif; font-weight: 200')

                let anchor = document.createElement('a')
                span.appendChild(anchor)
                anchor.href = item.url
                anchor.target = '_blank'
                anchor.innerText = item.title

                let dateTextElement = document.createTextNode(` - ${item.date.month} ${item.date.day}, ${item.date.year}`)
                span.appendChild(dateTextElement)
                return span
            })
            spans.forEach(span => {
                paragraph.appendChild(span)
            });

            let container = document.getElementById(containerId)
            container.appendChild(paragraph)
        })
}

fillWith('techblogfeed', 3)