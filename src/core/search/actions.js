import { appActions } from '../app/index'

export const searchActions = {
	TOGGLE_SEARCH_FIELD: 'TOGGLE_SEARCH_FIELD',


	toggleSearchField: () => ({
		type: searchActions.TOGGLE_SEARCH_FIELD
	}),

	handleSearch: ( query ) => {
		return async function ( dispatch ) {
			dispatch ( searchActions.toggleSearchField() )
			dispatch ( appActions.navigateToPath ( `/search/${query}` ) )
		}
	}
}