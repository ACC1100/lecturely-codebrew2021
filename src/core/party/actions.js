const sendMessageToPartySuccess = (message, userName, partyId) => ({
	type: partyActions.WS_TO_SERVER_SEND_MESSAGE_TO_PARTY,
	payload: { message, userName, partyId }
});

const emitNewPlayerStateForPartyToServerSuccess = (newPlayerState, partyId) => ({
	type: partyActions.WS_TO_SERVER_SET_VIDEO_PLAYER_STATE,
	payload: { newPlayerState, partyId }
});

export const partyActions = {

	WS_TO_CLIENT_SET_PARTY_ID: 'WS_TO_CLIENT_SET_PARTY_ID',
	WS_TO_CLIENT_SET_PARTY_STATE: 'WS_TO_CLIENT_SET_PARTY_STATE',
	WS_TO_CLIENT_SET_SELECTED_VIDEO: 'WS_TO_CLIENT_SET_SELECTED_VIDEO',
	WS_TO_CLIENT_PARTY_MESSAGE_RECEIVED: 'WS_TO_CLIENT_PARTY_MESSAGE_RECEIVED',
	WS_TO_CLIENT_SET_USERS_IN_PARTY: 'WS_TO_CLIENT_SET_USERS_IN_PARTY',
	WS_TO_CLIENT_SET_PLAYER_STATE: 'WS_TO_CLIENT_SET_PLAYER_STATE',

	WS_TO_SERVER_CREATE_PARTY: 'WS_TO_SERVER_CREATE_PARTY',
	WS_TO_SERVER_SEND_MESSAGE_TO_PARTY: 'WS_TO_SERVER_SEND_MESSAGE_TO_PARTY',
	WS_TO_SERVER_SET_VIDEO_PLAYER_STATE: 'WS_TO_SERVER_SET_VIDEO_PLAYER_STATE',

	createParty: (videoDetails, videoSource) => ({
		type: partyActions.WS_TO_SERVER_CREATE_PARTY,
		payload: { ...videoDetails, videoSource }
	}),



	sendMessageToParty: (message, userName, partyId) => async dispatch => {
		console.log(message)
		dispatch(sendMessageToPartySuccess(message, userName, partyId))
	},

	emitNewPlayerStateForPartyToServer: (newPlayerState, partyId) => async dispatch => {


		console.log("Progress!")
		console.log(newPlayerState)
		



		dispatch(emitNewPlayerStateForPartyToServerSuccess(newPlayerState, partyId))
	}

}