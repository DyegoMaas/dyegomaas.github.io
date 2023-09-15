function createIframeElement(episodeId) {
    let iframe = document.createElement('iframe')
    iframe.setAttribute('style', 'border-radius:12px; margin-bottom:20px')
    iframe.setAttribute('width', '100%')
    iframe.setAttribute('height', '232')
    iframe.setAttribute('frameBorder', '0')
    iframe.setAttribute('allowfullscreen', '')
    iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture')
    iframe.setAttribute('src', `https://open.spotify.com/embed/episode/${episodeId}`)
    return iframe
}

function fillWith(containerId, episodeIds) {
    let container = document.getElementById(containerId)
    episodeIds
        .reverse()
        .forEach(episodeId => {
            let iframe = createIframeElement(episodeId)
            container.appendChild(iframe)
        });
}

// Spotify do mais recente para o mais antigo
fillWith('podcasts-tech', [
    '0ZttCLe89bGlqdQviChDK2',
    '35xwvZCq9WF8gT4mK9VJZw', 
    '1TGpt5Q2ZKUr488xIGuDH1',    
    '1QXfUaD9ZK3QrGFklPzPzg',
    '3Lba03caplERe1qCtpqwEl',
    '6NEBrU8wt8vSvr5wplHPTA',
    '6pha0C7qjet9hcKPimrPoo',
    '3OksX4kOZZ4ZMKsyudilOJ',
    '4G5Be1tIc85LzUkiDCtzWh',
    '30JLKYM3mirSWynPeP7tsw',
    '6WmjaeH6WWM26dyuvvZXsd',
    '1DQejs2AVZ7cRdpkkZpH9u',
])