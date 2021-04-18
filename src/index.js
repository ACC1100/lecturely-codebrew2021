// Libs & utils
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { routes } from './core/routes'
import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'

// Constants
import { WEBSOCKET_URL } from './core/constants'

// CSS
import './index.css'

// Reducers
import combineReducers from './core/reducers'
import logger from 'redux-logger'

// Initialize constants
const socket = io(WEBSOCKET_URL)

// Initialize redux-socket-io middleware
// NOTE: All redux actions prefixed with 'WS_TO_SERVER_' will automatically ALSO be emitted
// 			 over websockets to the backend
const socketIoMiddleware = createSocketIoMiddleware(socket, 'WS_TO_SERVER_');

// Apply middlewares and initialize store
const createStoreWithMiddlewares = applyMiddleware(ReduxThunk, logger, socketIoMiddleware)(createStore)
const store = createStoreWithMiddlewares(combineReducers)

ReactDOM.render(
	// <ChakraProvider>
		<Provider store={store}>
			<Router
				history={browserHistory}
				routes={routes}
			/>
		</Provider>
	// </ChakraProvider>
	,
	document.getElementById('root')
)