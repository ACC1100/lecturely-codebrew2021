// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import classNames from 'classnames'
import { videoUtils, generalUtils } from '../../core/utils'

// Constants
import { videoPlayerConfig } from '../../core/constants'

// CSS
import './VideoPlayer.css'

// Components
import VideoPlayerControls from '../videoPlayerControls/VideoPlayerControls'
import MobileDevicePlayerDialog from '../mobileDevicePlayerDialog/MobileDevicePlayerDialog'

export default class VideoPlayer extends Component {

	static propTypes = {
		selectedVideo: PropTypes.object.isRequired,
		partyId: PropTypes.string.isRequired,
		userName: PropTypes.string,
		videoPlayerIsMuted: PropTypes.bool,
		videoPlayerIsMaximized: PropTypes.bool,
		videoPlayerIsLoaded: PropTypes.bool,
		videoProgress: PropTypes.number.isRequired,
		userVideoPlayerState: PropTypes.object.isRequired,
		partyVideoPlayerState: PropTypes.object.isRequired,
		onPlayerStateChange: PropTypes.func.isRequired,
		emitNewPlayerStateToServer: PropTypes.func.isRequired,
		setPlayerMutedState: PropTypes.func.isRequired,
		setPlayerProgress: PropTypes.func.isRequired,
		setPlayerIsLoadedState: PropTypes.func.isRequired,
		handleMaximizeBtnPressed: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		const { setPlayerIsLoadedState } = props

		// Initially -> always make sure that the videoPlayerLoaded state is
		// reset to false
		setPlayerIsLoadedState(false)
	}

	componentDidUpdate(prevProps, prevState) {
		const { videoPlayerIsLoaded, userVideoPlayerState } = this.props
		const prevPartyPlayerState = prevProps.partyVideoPlayerState
		const currentPartyPlayerState = this.props.partyVideoPlayerState
		const userIsBuffering = userVideoPlayerState.playerState === 'buffering'
		const internalVideoPlayer = this.videoPlayer.getInternalPlayer()

		// As soon as the videoPlayer is loaded, start listening for playerStateChange commands from the server
		if (videoPlayerIsLoaded && internalVideoPlayer && !userIsBuffering) {
			// Handle initial synchronization of our videoPlayer with the rest of the party when we first join a party
			this.handleInitialPlayerStateSynchronization(currentPartyPlayerState, internalVideoPlayer)

			// Handle when a user 'seeks' in a video
			this.handleSeekToCommandsFromServer(prevPartyPlayerState, currentPartyPlayerState, internalVideoPlayer)
		}
	}

	handleInitialPlayerStateSynchronization = (currentPartyPlayerState, internalVideoPlayer) => {
		const isInitialPlayerStateForParty = currentPartyPlayerState.timeInVideo === 0
		const isInitialPlayerStateForUser = internalVideoPlayer.getCurrentTime() === 0
		if (!isInitialPlayerStateForParty && isInitialPlayerStateForUser) {
			internalVideoPlayer.seekTo(currentPartyPlayerState.timeInVideo)
		}
	}

	handleSeekToCommandsFromServer = (prevPartyPlayerState, currentPartyPlayerState, internalVideoPlayer) => {
		const partyPlayerStateUpdated = prevPartyPlayerState !== currentPartyPlayerState
		const isInitialPlayerStateForParty = currentPartyPlayerState.timeInVideo === 0
		const isNewPlayerState = prevPartyPlayerState.playerState !== currentPartyPlayerState.playerState ||
			prevPartyPlayerState.timeInVideo !== currentPartyPlayerState.timeInVideo

		if (partyPlayerStateUpdated && isNewPlayerState && !isInitialPlayerStateForParty) {
			internalVideoPlayer.seekTo(currentPartyPlayerState.timeInVideo + 0.1)
		}
	}

	constructUserPlayerState = (playerState, videoPlayer) => {
		return {
			playerState,
			timeInVideo: videoPlayer.getCurrentTime()
		}
	}

	render() {
		const {
			selectedVideo,
			partyVideoPlayerState,
			videoPlayerIsMuted,
			videoPlayerIsMaximized,
			videoPlayerIsLoaded,
			emitNewPlayerStateToServer,
			onPlayerStateChange,
			setPlayerProgress,
			setPlayerMutedState,
			setPlayerIsLoadedState,
			handleMaximizeBtnPressed,
			videoProgress,
			partyId
		} = this.props

		const videoPlayer = this.videoPlayer
		const videoUrl = selectedVideo.videoSource
		const videoDuration = videoPlayer && videoPlayerIsLoaded ? videoPlayer.getDuration() : null
		const videoIsPlaying = partyVideoPlayerState.playerState === 'playing'
		const videoPlayerClassNames = classNames('video-player', {
			'maximized': videoPlayerIsMaximized
		})

		return (
			<div className={videoPlayerClassNames}>
				<ReactPlayer
					url={videoUrl}
					width={'100%'}
					height={'100%'}
					muted={videoPlayerIsMuted}
					playing={videoIsPlaying}
					ref={e => this.videoPlayer = e}
					onReady={() => {
						setPlayerIsLoadedState(true)
					}}
					onPlay={() => {
						// Make sure that if this onPlay handler is called accidentally while the server is still
						// telling us to pause, that we DO actually remain paused
						if (!videoIsPlaying) {
							videoPlayer.getInternalPlayer().pauseVideo()
						}
						onPlayerStateChange(
							this.constructUserPlayerState('playing', videoPlayer)
						)
					}}
					onPause={() => onPlayerStateChange(
						this.constructUserPlayerState('paused', videoPlayer)
					)}
					onBuffer={() => onPlayerStateChange(
						this.constructUserPlayerState('buffering', videoPlayer)
					)}
					onProgress={setPlayerProgress}
					config={videoPlayerConfig}
					style={{ position: 'absolute' }}
				/>

				<VideoPlayerControls
					partyVideoPlayerState={partyVideoPlayerState}
					emitNewPlayerStateToServer={emitNewPlayerStateToServer}
					partyId={partyId}
					videoPlayerIsMuted={videoPlayerIsMuted}
					videoPlayerIsMaximized={videoPlayerIsMaximized}
					videoProgress={videoProgress}
					videoDuration={videoDuration}
					handleMuteBtnPressed={() => setPlayerMutedState(!videoPlayerIsMuted)}
					handleMaximizeBtnPressed={() => handleMaximizeBtnPressed(
						videoPlayerIsMaximized,
						document.getElementsByClassName('video-player')[0]
					)}
				/>

				{generalUtils.isMobileDevice() &&
					<MobileDevicePlayerDialog
						partyId={partyId}
						videoPlayer={videoPlayer}
						videoPlayerIsLoaded={videoPlayerIsLoaded}
						partyVideoPlayerState={partyVideoPlayerState}
						emitNewPlayerStateToServer={emitNewPlayerStateToServer}
					/>}

			</div>
		)
	}
}