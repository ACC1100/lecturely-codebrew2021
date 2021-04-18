// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { videoUtils, generalUtils } from '../../core/utils'
import classNames from 'classnames'
import './pin.css'

// CSS
import './VideoPlayerControls.css'
import { min } from 'lodash'


class VideoPlayerControls extends Component {
	
	static propTypes = {
		partyVideoPlayerState: PropTypes.object.isRequired,
		emitNewPlayerStateToServer: PropTypes.func.isRequired,
		partyId: PropTypes.string.isRequired,
		videoPlayerIsMuted: PropTypes.bool.isRequired,
		videoPlayerIsMaximized: PropTypes.bool.isRequired,
		videoProgress: PropTypes.number.isRequired,
		videoDuration: PropTypes.number,
		handleMuteBtnPressed: PropTypes.func.isRequired,
		handleMaximizeBtnPressed: PropTypes.func.isRequired,
	}

	renderMarkers = (inputFloats, videoDuration) => {
		if (inputFloats) {
			const float_diff = 5 / videoDuration
			return inputFloats.map((value, index) => {
				console.log(index, float_diff)
				return <div className="interval-float" style={{ left: `${index * float_diff}%` }}></div>
			})
		}
	}

	renderScale = () => {
		// const inputFloats = [0.716583412632496, 0.3703133933075282, 1.0, 0.4969481313852862, 0.3703133933075282, 0.5088421920831644, 0.3703133933075282, 0.6009228257517845, 0.3703133933075282, 0.15224422923215428, 0.2136286414915869, 0.15224422923215428, 0.21601368876547375, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.3703133933075282, 0.380107510222913, 0.3703133933075282, 0.3703133933075282, 0.15224422923215428, 0.15224422923215428, 0.3703133933075282, 0.3703133933075282, 0.43202941772268366, 0.5245083409468368, 0.21601368876547375, 0.15224422923215428, 0.15224422923215428, 0.46073888141351693, 0.5873736194912745, 0.3703133933075282, 0.15224422923215428, 0.41014423576103315, 0.15224422923215428, 0.3064391768714625, 0.15224422923215428, 0.15224422923215428, 0.4340828528408481, 0.3703133933075282, 0.3703133933075282, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.20776365573797256, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.18950001662219573, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.7110270486244419, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.6282133998364074, 0.3703133933075282, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.3703133933075282, 0.3703133933075282, 0.6282133998364074, 0.8080178386301123, 0.40756918069757003, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.6282133998364074, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.6282133998364074, 0.15224422923215428, 0.15224422923215428, 0.0]
		const inputFloats = [0.7641312454988674, 0.6650658509324808, 0.8452147193409125, 0.7012951505927288, 0.6650658509324808, 0.7046979569296123, 0.6650658509324808, 0.7310415725971989, 0.6650658509324808, 0.6165605607899401, 0.6202394556487024, 0.6026778110322812, 0.6209218007437463, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6650658509324808, 0.6678678782594303, 0.6650658509324808, 0.6650658509324808, 0.6026778110322812, 0.6026778110322812, 0.6650658509324808, 0.6650658509324808, 0.6827223674327393, 0.709179930914946, 0.6209218007437463, 0.6026778110322812, 0.6026778110322812, 0.6909359412034809, 0.7271652408637288, 0.6650658509324808, 0.6026778110322812, 0.6764611722232476, 0.6026778110322812, 0.6467918910147463, 0.6026778110322812, 0.6026778110322812, 0.683309840643946, 0.6650658509324808, 0.6650658509324808, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6185615248565979, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6133364273481574, 0.6650658509324808, 0.6650658509324808, 0.6650658509324808, 0.6650658509324808, 0.6650658509324808, 0.7625416091974473, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6650658509324808, 0.6650658509324808, 0.6650658509324808, 0.7388492121234473, 0.6650658509324808, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6026778110322812, 0.6650658509324808, 0.6650658509324808, 0.7388492121234473, 0.7902899857388191, 0.6757244672483571, 0.6650658509324808, 0.6650658509324808, 0.6650658509324808, 0.6650658509324808, 0.6650658509324808, 0.6650658509324808, 0.7388492121234473, 0.6650658509324808, 0.6650658509324808, 0.6650658509324808, 0.7388492121234473, 0.6026778110322812, 0.6026778110322812, 0.5591218177391266]
		var output_array = []
		for (var i = 0; i < 100; i++) {
			var x = (inputFloats[i])

				// calculate rgb
				var blue = 0;
				if (x < 0.5) {
					var green = 255;
					var red = (x / 0.5) * 255
				} else {
					var red = 255;
					var green = 255 - (255 * (x-0.5)/0.5)
				}

			// 	output_array.push(
			// 			<div className="interval-float" style={{ left: `${i}%`, backgroundColor: `rgb(${red}, ${green}, ${blue})` }} />
			// 	)
			// CODE FOR PIN WHERE THE PIN CSS IS BROKEN
			if (x > 0.75) {
				output_array.push(
					<div className="marker" style={{ left: `${i + 2}%`, backgroundColor: `rgb(${red}, ${green}, ${blue})` }}></div>
				)
			}
		}
		console.log("outputarray: ", output_array)
		return output_array
	}

	render() {
		const {
			partyVideoPlayerState,
			emitNewPlayerStateToServer,
			partyId,
			videoPlayerIsMuted,
			videoPlayerIsMaximized,
			videoProgress,
			videoDuration,
			handleMuteBtnPressed,
			handleMaximizeBtnPressed
		} = this.props

		if (!videoDuration) {
			return false
		}
		const videoIsPlaying = partyVideoPlayerState.playerState === 'playing'
		const videoIsMuted = videoPlayerIsMuted
		const videoIsMaximized = videoPlayerIsMaximized
		const progressBarWidth = this.progressBar ? this.progressBar.offsetWidth : null
		const progressInSeconds = videoProgress
		const progressInPixels = videoUtils.secondsToPixels(progressInSeconds, progressBarWidth, videoDuration)
		const formattedProgressString = generalUtils.toHHMMSS(progressInSeconds)

		const playBtnClassNames = classNames('player-btn btn-left fa', {
			'fa-pause': videoIsPlaying,
			'fa-play': !videoIsPlaying
		})
		const muteBtnClassNames = classNames('player-btn btn-left fa', {
			'fa-volume-off': videoIsMuted,
			'fa-volume-up': !videoIsMuted
		})
		const maximizeBtnClassNames = classNames('player-btn btn-right fa', {
			'fa-minus-square-o': videoIsMaximized,
			'fa-arrows-alt': !videoIsMaximized
		})

		return (
			<div className="player-controls-overlay"
				onClick={() => {
					emitNewPlayerStateToServer({
						playerState: videoIsPlaying ? 'paused' : 'playing',
						timeInVideo: progressInSeconds
					}, partyId)
					console.log("EVENT 0: CLICK IN VIDEO")
				}
				}>

				<div className="control-bar bottom" onClick={(event) => event.stopPropagation()}>

					<div className="progress-bar" ref={e => {
						this.progressBar = e
					}}
						onClick={(event) => {
							emitNewPlayerStateToServer({
								playerState: videoIsPlaying ? 'playing' : 'paused',
								timeInVideo: videoUtils.getAmountOfSecondsAtXPos(event, videoDuration)
							}, partyId)
							console.log("EVENT 1: CLICK ON PROGRESS BAR")
							console.log(videoUtils.getAmountOfSecondsAtXPos(event, videoDuration))
							console.log(videoDuration)
						}}>
						<div className="background-bar"></div>
						{/* {this.renderMarkers(inputFloats, videoDuration)} */}
						{videoDuration ? this.renderScale() : <h1>loading</h1>}
						{/* <div className="interval-easy" style={{ left: '50px' }}></div>
						<div className="interval-medium" style={ { left: '100px'}}></div>
						<div className="interval-hard" style={ { left: '200px'}}></div> */}
						<div className="progress-indicator" style={{ left: progressInPixels }}></div>
					</div>

					<div className="control-buttons">
						<span className={playBtnClassNames}
							onClick={() => {
								emitNewPlayerStateToServer({
									playerState: videoIsPlaying ? 'paused' : 'playing',
									timeInVideo: progressInSeconds
								}, partyId)
								console.log("EVENT 2: CLICK PLAY/PAUSE")
							}
							} />
						<span className={muteBtnClassNames} onClick={handleMuteBtnPressed} />
						<span className="current-time">{formattedProgressString}</span>
						<span className={maximizeBtnClassNames} onClick={handleMaximizeBtnPressed} />
						<span className="playback" style={{ left: '100px' }}>{'1x'}</span>
					</div>
				</div>
			</div >
		)
	}
}

export default VideoPlayerControls;