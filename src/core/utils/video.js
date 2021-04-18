export const videoUtils = {

	getVideoDetails: ( video, videoSource ) => {
		switch ( videoSource ) {

			case 'youtube':
				return getYoutubeVideoDetails ( video )

			default:
				break
		}
	},

	getVideoUrl: ( videoSource, videoId ) => {
		switch ( videoSource ) {
			case 'youtube':
				return `https://www.youtube.com/watch?v=${videoId}&origin=http://192.168.1.19`
			default:
				return null
		}
	},

	getAmountOfSecondsAtXPos: ( clickEvent, videoDuration ) => {
		const parentWidth = clickEvent.target.getBoundingClientRect ().width
		const relativeMousePosition = {
			relativeX: clickEvent.clientX - clickEvent.target.getBoundingClientRect ().left,
			relativeY: clickEvent.clientY - clickEvent.target.getBoundingClientRect ().top
		}

		return videoUtils.pixelsToSeconds ( relativeMousePosition.relativeX, parentWidth, videoDuration )
	},

	pixelsToSeconds: ( xPos, elementWidth, videoDuration ) => {
		return ( xPos / elementWidth ) * videoDuration
	},

	secondsToPixels: ( seconds, elementWidth, videoDuration ) => {
		return ( seconds / videoDuration ) * elementWidth
	}
}

const getYoutubeVideoDetails = ( video ) => {
	const snippet = video.snippet

	return {
		id: video.id.videoId,
		thumbnailSrc: snippet.thumbnails.medium.url,
		title: snippet.title,
		description: snippet.description
	}
}