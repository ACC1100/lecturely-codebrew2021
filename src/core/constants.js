export const WEBSOCKET_URL = '/'

export const YOUTUBE_API_KEY = 'AIzaSyDj5eNwUg_BrABj01cKzEai3iGIVW_4hiQ'

export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'
export const YOUTUBE_SEARCH_URL = `${YOUTUBE_API_BASE_URL}/search`

export const videoPlayerConfig = {
	youtube: {
		playerVars: { showinfo: 1 }
	}
}

export const initialVideoQuery = {
	query: 'beautiful destinations',
	videoType: 'any'
}

