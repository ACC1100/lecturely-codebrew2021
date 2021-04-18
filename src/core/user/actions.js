export const userActions = {
	// Normal / local redux actions
	SET_USER_NAME: 'SET_USER_NAME',

	WS_TO_SERVER_CONNECT_TO_PARTY: 'WS_TO_SERVER_CONNECT_TO_PARTY',
	WS_TO_SERVER_DISCONNECT_FROM_PARTY: 'WS_TO_SERVER_DISCONNECT_FROM_PARTY',
	WS_TO_SERVER_SET_CLIENT_READY_STATE: 'WS_TO_SERVER_SET_CLIENT_READY_STATE',

	setUserName: userName => ({
		type: userActions.SET_USER_NAME,
		payload: userName
	}),

	connectToParty: ( userName, partyId ) => ({
		type: userActions.WS_TO_SERVER_CONNECT_TO_PARTY,
		payload: { userName, partyId }
	}),

	emitClientReadyStateToServer: ( clientReadyState ) => ({
		type: userActions.WS_TO_SERVER_SET_CLIENT_READY_STATE,
		payload: { ...clientReadyState }
	}),

	disconnectFromAllParties: () => ({
		type: userActions.WS_TO_SERVER_DISCONNECT_FROM_PARTY
	}),

}