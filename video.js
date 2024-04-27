const API_KEY = "AIzaSyCW9pYzBcfM9-0OXGPtkA9RkRm0Dj8cx7M";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

window.addEventListener('load', () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const videoId = params.get('videoId');

    if (YT) {
        new YT.Player('vid-container', {
            height: "315",
            width: "560",
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                controls: 1,
                modestbranding: 1,
                loop: 0
            }
        });
    }

    async function getChannelDetails(channelId) {
        try {
            const response = await fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching channel details:', error);
        }
    }

    async function getVideoDetails() {
        try {
            const response = await fetch(`${BASE_URL}/videos?key=${API_KEY}&part=snippet&id=${videoId}`);
            const data = await response.json();
            console.log(data);

            const vidDetailsElement = document.getElementById('vid-Details');
            vidDetailsElement.innerHTML += `
                <div class="title">${data.items[0].snippet.title}</div>
                <div class="disc"><h3>Description:</h3>${data.items[0].snippet.description}</div>
            `;
            
            await getChannelDetails(data.items[0].snippet.channelId);
        } catch (error) {
            console.error('Error fetching video details:', error);
        }
    }

    getVideoDetails();
});
