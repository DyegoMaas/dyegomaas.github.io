function createIframeElement(episodeId) {
    let iframe = document.createElement('iframe')
    iframe.setAttribute('style', 'border-radius:12px')
    iframe.setAttribute('width', '100%')
    iframe.setAttribute('height', '232')
    iframe.setAttribute('frameBorder', '0')
    iframe.setAttribute('allowfullscreen', '')
    iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture')
    iframe.setAttribute('src', `https://open.spotify.com/embed/episode/${episodeId}`)
    return iframe
}

function fillWith(containerId, episodeIds) {
    episodeIds
        .reverse()
        .forEach(episodeId => {
            let container = document.getElementById(containerId)
            let iframe = createIframeElement(episodeId)
            iframe.setAttribute('style', 'margin-bottom:15px')
            container.appendChild(iframe)
        });
}

fillWith('podcasts-tech', [
    '6WmjaeH6WWM26dyuvvZXsd',
    '1DQejs2AVZ7cRdpkkZpH9u'
])