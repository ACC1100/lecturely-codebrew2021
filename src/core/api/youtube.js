import queryString from 'query-string'
import { restUtils } from '../utils/index'

// Constants
import { YOUTUBE_SEARCH_URL, YOUTUBE_API_KEY } from "../constants"

export const youtubeApi = {
	fetchYoutubeSearchResults: ( query, videoType = 'any' ) => {
		const options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}

		const params = queryString.stringify ( {
			videoType,
			'key': YOUTUBE_API_KEY,
			'q': query,
			'part': 'snippet',
			'type': 'video',
			'maxResults': 50
		} )

		return fetch ( `${YOUTUBE_SEARCH_URL}?${params}`, options )
			.then ( restUtils.handleRestResponse )
			.then ( ( response ) => response )
	}
}