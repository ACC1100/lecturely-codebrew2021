export const persistUtils = {
	loadProperty: ( key, defaultValue = undefined ) => {
		try {
			const value = localStorage[ key ]

			return value !== undefined
				? JSON.parse ( value )
				: defaultValue
		}
		catch ( err ) {
			console.error ( err )
			return defaultValue
		}
	},

	saveProperty: ( key, value ) => {
		try {
			localStorage[ key ] = JSON.stringify ( value )
		}
		catch ( err ) {
			console.error ( err )
		}
	}
}
