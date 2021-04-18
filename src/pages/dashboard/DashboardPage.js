// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// CSS
import './DashboardPage.css'

// Components
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import ChatBox from '../../components/chatBox/ChatBox'
import ShareablePartyUrl from '../../components/shareablePartyUrl/ShareablePartyUrl'
import UserList from '../../components/userList/UserList'
// Actions
import { partyActions } from '../../core/party'
import { userActions } from '../../core/user'
import { videoPlayerActions } from '../../core/videoPlayer'

import ReactPlayer from 'react-player'

class DashboardPage extends Component {
  renderScale = () => {
    const inputFloats = [0.716583412632496, 0.3703133933075282, 1.0, 0.4969481313852862, 0.3703133933075282, 0.5088421920831644, 0.3703133933075282, 0.6009228257517845, 0.3703133933075282, 0.15224422923215428, 0.2136286414915869, 0.15224422923215428, 0.21601368876547375, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.3703133933075282, 0.380107510222913, 0.3703133933075282, 0.3703133933075282, 0.15224422923215428, 0.15224422923215428, 0.3703133933075282, 0.3703133933075282, 0.43202941772268366, 0.5245083409468368, 0.21601368876547375, 0.15224422923215428, 0.15224422923215428, 0.46073888141351693, 0.5873736194912745, 0.3703133933075282, 0.15224422923215428, 0.41014423576103315, 0.15224422923215428, 0.3064391768714625, 0.15224422923215428, 0.15224422923215428, 0.4340828528408481, 0.3703133933075282, 0.3703133933075282, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.20776365573797256, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.18950001662219573, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.7110270486244419, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.6282133998364074, 0.3703133933075282, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.15224422923215428, 0.3703133933075282, 0.3703133933075282, 0.6282133998364074, 0.8080178386301123, 0.40756918069757003, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.6282133998364074, 0.3703133933075282, 0.3703133933075282, 0.3703133933075282, 0.6282133998364074, 0.15224422923215428, 0.15224422923215428, 0.0]
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
        var green = 255 - (255 * (x - 0.5) / 0.5)
      }

      output_array.push(
        <div className="interval-floats" style={{ left: `${i * 0.768}%`, backgroundColor: `rgb(${red}, ${green}, ${blue})` }} />
      )
      // CODE FOR PIN WHERE THE PIN CSS IS BROKEN
      // if (x > 0.5) {
      // 	output_array.push(
      // 		<div className="pin"></div>
      // 	)
      // }
    }
    console.log("outputarray: ", output_array)
    return output_array
  }

  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div className="party-page">
        {/* <ShareablePartyUrl partyUrl={partyUrl}/> */}

        <div className="player-container">
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=93fPFOf547Q&ab_channel=ProfessorKnudson"}
            width={'100%'}
            height={'80%'}
            ref={e => this.videoPlayer = e}
          />
          {this.renderScale()}
          <div style={{ display: 'flex', 'align-items': 'center', height: '150px' }}>
            <div style={{ flex: 1, adding: '20px', display: 'flex', alignItems: 'center', padding: '15px' }}>
              <div className="progress-radial progress-70">
                <div className="overlay">72%</div>
              </div>
              <div style={{ width: '250px' }}>
                <h2>Overall Lecture Rating</h2>
                <p>A rating based on perceived difficulty and sentiment</p>
              </div>
            </div>
            <div style={{ flex: 1, padding: '15px' }}>
              <div style={{ marginBottom: '7px', position: 'relative', borderRadius: '5px', background: '#eeeeee', width: '100%', height: '15px' }}>
                <div style={{ borderRadius: '5px', position: 'absolute', height: '15px', left: 0, top: 0, width: '35%', background: '#FDCD50', height: '15px' }}></div>
              </div>
              <div style={{ color: 'grey', fontSize: '12px' }}>
                This lecture is <b>35% more difficult</b> <br />than other lectures
                </div>
            </div>
            <div style={{ flex: 1, padding: '15px' }}>
              <div style={{ marginBottom: '7px', position: 'relative', borderRadius: '5px', background: '#eeeeee', width: '100%', height: '15px' }}>
                <div style={{ borderRadius: '5px', position: 'absolute', height: '15px', left: 0, top: 0, width: '70%', background: '#FDCD50', height: '15px' }}></div>
              </div>
              <div style={{ color: 'grey', fontSize: '12px' }}>
                Students had a <b>70% more positive experience</b> <br />than other lectures.
                </div>

            </div>

          </div>
        </div>

        <div className="column-right">
          <div style={{ position: 'fixed', top: 0, right: 0, width: '23%' }}>
            <div style={{ marginTop: '45px', textAlign: 'center', borderTop: '1px solid #eeeeee', borderBottom: '1px solid #eeeeee', padding: '25px 5px' }}>
              LECTURES
            </div>
            <div className="lecture_list">

              <div style={{ display: 'flex', 'border-bottom': '1px solid #eeeeee', background: '#eeeeee' }}>
                <img style={{ margin: '10px' }} width={'40%'} src="https://around.uoregon.edu/sites/around2.uoregon.edu/files/styles/landscape/public/field/image/lecture_hall-shutterstock.jpg" />
                <div style={{ padding: '10px 0' }}>
                  <h3>Lecture 1: Bayesian Models</h3>
                  <p>Date: 12/02/32</p>
                </div>
              </div>
              <div style={{ display: 'flex', 'border-bottom': '1px solid #eeeeee' }}>
                <img style={{ margin: '10px' }} width={'40%'} src="https://around.uoregon.edu/sites/around2.uoregon.edu/files/styles/landscape/public/field/image/lecture_hall-shutterstock.jpg" />
                <div style={{ padding: '10px 0' }}>
                  <h3>Lecture 2: Probability</h3>
                  <p>Date: 12/02/32</p>
                </div>
              </div>
              <div style={{ display: 'flex', 'border-bottom': '1px solid #eeeeee' }}>
                <img style={{ margin: '10px' }} width={'40%'} src="https://around.uoregon.edu/sites/around2.uoregon.edu/files/styles/landscape/public/field/image/lecture_hall-shutterstock.jpg" />
                <div style={{ padding: '10px 0' }}>
                  <h3>Lecture 3: Statistics</h3>
                  <p>Date: 12/02/32</p>
                </div>
              </div>
              <div style={{ display: 'flex', 'border-bottom': '1px solid #eeeeee' }}>
                <img style={{ margin: '10px' }} width={'40%'} src="https://around.uoregon.edu/sites/around2.uoregon.edu/files/styles/landscape/public/field/image/lecture_hall-shutterstock.jpg" />
                <div style={{ padding: '10px 0' }}>
                  <h3>Lecture 4: Clustering</h3>
                  <p>Date: 12/02/32</p>
                </div>
              </div>
              <div style={{ display: 'flex', 'border-bottom': '1px solid #eeeeee' }}>
                <img style={{ margin: '10px' }} width={'40%'} src="https://around.uoregon.edu/sites/around2.uoregon.edu/files/styles/landscape/public/field/image/lecture_hall-shutterstock.jpg" />
                <div style={{ padding: '10px 0' }}>
                  <h3>Lecture 5: Clustering</h3>
                  <p>Date: 12/02/32</p>
                </div>
              </div>
              <div style={{ display: 'flex', 'border-bottom': '1px solid #eeeeee' }}>
                <img style={{ margin: '10px' }} width={'40%'} src="https://around.uoregon.edu/sites/around2.uoregon.edu/files/styles/landscape/public/field/image/lecture_hall-shutterstock.jpg" />
                <div style={{ padding: '10px 0' }}>
                  <h3>Lecture 6: Clustering</h3>
                  <p>Date: 12/02/32</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedVideo: state.party.selectedVideo,
    userName: state.user.userName,
    partyId: state.party.partyId,
    partyState: state.party.partyState,
    usersInParty: state.party.usersInParty,
    messagesInParty: state.party.messagesInParty,
    partyVideoPlayerState: state.party.videoPlayerState,
    userVideoPlayerState: state.videoPlayer.videoPlayerState,
    videoPlayerIsMuted: state.videoPlayer.videoPlayerIsMuted,
    videoProgress: state.videoPlayer.videoProgress,
    videoPlayerIsMaximized: state.videoPlayer.videoPlayerIsMaximized,
    videoPlayerIsLoaded: state.videoPlayer.videoPlayerIsLoaded,
  }
}

const mapDispatchToProps = {
  connectToParty: userActions.connectToParty,
  sendMessageToParty: partyActions.sendMessageToParty,
  emitNewPlayerStateForPartyToServer: partyActions.emitNewPlayerStateForPartyToServer,
  onPlayerStateChange: videoPlayerActions.onPlayerStateChange,
  setPlayerMutedState: videoPlayerActions.setPlayerMutedState,
  setPlayerIsLoadedState: videoPlayerActions.setPlayerIsLoadedState,
  handleMaximizeBtnPressed: videoPlayerActions.handleMaximizeBtnPressed,
  setPlayerProgress: videoPlayerActions.setPlayerProgress
}

DashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage)

export default DashboardPage