// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// CSS
import './ChatBox.css'
import UserIcon from '../../assets/usericon.png'

export default class ChatBox extends Component {
	static propTypes = {
		onMessageSend: PropTypes.func.isRequired,
		partyId: PropTypes.string.isRequired,
		userName: PropTypes.string,
		messagesInParty: PropTypes.array
	}

	constructor(props) {
		super(props)
		this.state = {
			view: 'chat'
		}
	}

	componentDidMount() {
		this.messageBox.scrollTop = this.messageBox.scrollHeight
	}

	componentDidUpdate() {
		this.messageBox.scrollTop = this.messageBox.scrollHeight
	}

	renderMessages = (messages) => {
		const { userName } = this.props

		return (
			<div className="messages-wrapper">

				{messages.map((message, index) => {
					const cssClasses = classNames('message', {
						'self': userName === message.userName
					})

					if (message.userName === "Party") {
						return (
							<div className="message-wrapper" key={index} style={{ textAlign: 'center', fontSize: '10px', color: '#a3a3a3', padding: '5px' }}>
								<span className="body">{message.message}</span>
							</div>
						)
					} else {
						return (
							<div className="message-wrapper" key={index}>
								<div className={cssClasses}>
									<span className="username">{message.userName}: </span>
									<span className="body">{message.message}</span>
								</div>
							</div>
						)
					}

				})}

			</div>
		)
	}

	D = (event) => {
		const { onMessageSend, userName, partyId } = this.props

		event.preventDefault()
		const inputValue = this.messageInput.value.trim()
		onMessageSend(inputValue, userName, partyId)
		this.messageInput.value = ''
	}

	render() {
		const { messagesInParty } = this.props

		return (
			<div className="chat-box">
				<div className="preheading">
					<p onClick={() => {
						this.setState({
							...this.state,
							view: 'users'
						})
					}}>
						{this.props.usersInParty.length} users online
					</p>
					<p>
						Code: <b>{this.props.partyId}</b>
					</p>
				</div>
				<div className="chat-header">
					<p>
						{this.state.view === 'chat' ?
							<div>
								CHAT
						</div> :
							<div style={{ display: 'flex', 'flex-direction': 'row', 'width': '100%' }}>
								<div>
									<i class="arrow left"></i>USERS
								</div>
							</div>
						}
					</p>
				</div>

				{this.state.view === 'chat' ?

					<div className="message-box" ref={e => this.messageBox = e}>
						{this.renderMessages(messagesInParty)}
					</div>
					: null}

				{this.state.view === 'chat' ?
					<form className="input-box" action="#" onSubmit={this.D}>
						<input
							type="text"
							ref={e => this.messageInput = e}
							className="input"
							placeholder="Send a Message" />

						<input
							className="submit"
							type="submit" />
					</form>
					: null}

				{this.state.view === 'users' ?
					<div ref={e => this.messageBox = e} >
						<span style={{ position: 'absolute', top: 92, right: 4, fontSize: '20px', cursor: 'pointer' }}
							onClick={() => {
								this.setState({
									...this.state,
									view: 'chat'
								})
							}}
						>x</span>
						{this.props.usersInParty.map((user) => {
							return (
								<div style={{ padding: '20px' }}>
									{user.userName}
								</div>
							)
						})}
					</div>
					: null

				}


			</div>
		)
	}
}