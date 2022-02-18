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
        .forEach((episodeId, index) => {
            let container = document.getElementById(containerId)
            let iframe = createIframeElement(episodeId)
            let paragraph = document.createElement('p')
            paragraph.appendChild(iframe)
            container.appendChild(paragraph)
        });
}

fillWith('podcasts-literarios', [
    '767AYJQuMOYieYdxTBUuiZ',
    '681tMkUtOZdEdTAmRRRs1i',
    '4ueGjUOkwTWT8j2xSuVU40',
    '5RYqOazTPuPNrtRSOy7Rwc'
])