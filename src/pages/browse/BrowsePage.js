// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// CSS
import './BrowsePage.css'

// Constants
import { initialVideoQuery } from '../../core/constants'

// Actions
import { appActions } from '../../core/app'
import { userActions } from '../../core/user'
import { videoListActions } from '../../core/videoList'

// Components
import PageHeader from '../../components/pageHeader/PageHeader'
import VideoList from '../../components/videoList/VideoList'

// Assets
import Logo from '../../assets/triangle.svg'
import Person from '../../assets/landing_graphic.svg'

class BrowsePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			room_id: "",
			youtube_url: "",
			name: "",
			form: 0,
		};
		this.arrow = {
			'marginLeft': '100px',
			'border': 'solid black',
			'border-width': '0 3px 3px 0',
			'position': 'absolute',
			'padding': '3px',
			'transform': 'rotate(-45deg)',
			'-webkit-transform': 'rotate(-45deg)',
		}
		this.inputStyle = {
			padding: '10px', borderRadius: '50px', marginBottom: '20px', borderWidth: '2px', borderStyle: "solid",
			borderColor: "white",
			backgroundColor: "Azure"
		}
		this.buttonStyle = { fontSize: "large", 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'border-radius': '50px', 'width': '14vw', 'height': '9vh', "cursor": "pointer" }
		this.disabledStyle = {}

		this.greenStyle =  {'borderRadius': '25px', 'marginTop': '15px', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'width': '10vw', 'height': '5vh', "cursor": "pointer",
		'background': '#9ACD32', 'color': '#000',
		}
	}

	static propTypes = {
		isFetchingVideos: PropTypes.bool.isRequired,
		youtubeVideos: PropTypes.array.isRequired,
		user: PropTypes.object.isRequired,
		navigateToPath: PropTypes.func.isRequired,
		disconnectFromAllParties: PropTypes.func.isRequired,
		loadYoutubeVideos: PropTypes.func.isRequired,
		handleVideoSelection: PropTypes.func.isRequired,
	}





	componentDidMount() {
		// Load an initial set of movies from Youtube into Redux store
		this.props.loadYoutubeVideos(initialVideoQuery.query, initialVideoQuery.videoType)

		// Disconnect from any parties the user was still connected to
		this.props.disconnectFromAllParties()
	}

	render() {
		const { user, isFetchingVideos, youtubeVideos, handleVideoSelection } = this.props


		return (
			<div className="browse-page">
				<div style={{ 'zIndex': '100', display: 'flex', 'justify-content': 'center', 'margin': '65px auto 50px auto', 'width': '900px', 'flex-direction': 'column' }}>
					<div style={{ 'font-size': '1.875rem' }}>WHERE STUDENTS</div>
					<div style={{ 'font-size': '2.5rem', 'margin-left': '40px' }}>LEARN TOGETHER</div>
					<div style={{ marginTop: '30px' }}>

						{/* CREATE BUTTON */}
						<div
							style={Object.assign({},
								this.buttonStyle,
								{
									'float': 'left', 'marginRight': '15px',
									'background': '#FECD50', 'color': '#646464'
								})}
							onClick={() => {
								this.setState({
									form: 1
								})
							}}
						>
							Create a Room
						</div>

						{/* JOIN BUTTON */}
						<div style={Object.assign({},
							this.buttonStyle,
							{ 'background': '#72AAFF', 'color': '#FFF' }
						)}
							onClick={() => {
								this.setState({
									form: 2
								})
							}}
						>
							Join room
						</div>
					</div>

					{/* CREATE ROOM FORM */}
					<div style={{ display: (this.state.form == 1 ? "flex" : "none"), marginTop: '20px', 'flex-direction': 'column', width: '40%' }}>
						<input style={this.inputStyle} type="text" onChange={(e) => {
							this.setState({
								...this.state,
								name: e.target.value
							})
						}}
							placeholder="Name"
						/>

						<select
							onChange={(e) => {
								this.setState({
									...this.state,
									youtube_url: e.target.value
								})
							}}

							style={
								{
									padding: '10px', borderRadius: '50px', marginBottom: '20px', borderWidth: '2px', borderStyle: "solid",
									borderColor: "white",
									backgroundColor: "Azure",
									color: "gray"
								}
							}
						>
							<option value="" selected disabled hidden>Select a Lecture</option>
							<optgroup label="COMP1001">
								<option value="https://www.youtube.com/watch?v=YoXxevp1WRQ&list=PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8&index=1">COMP1001-1</option>
								<option value="https://www.youtube.com/watch?v=zYierUhIFNQ&list=PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8&index=2">COMP1001-2</option>
								<option value="https://www.youtube.com/watch?v=tI_tIZFyKBw&list=PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8&index=3">COMP1001-3</option>
							</optgroup>

							<optgroup label="COMP2013">
								<option value="https://www.youtube.com/watch?v=gR6nycuZKlM&list=PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8&index=4">COMP2013-1</option>
								<option value="https://www.youtube.com/watch?v=NKTfNv2T0FE&list=PLhQjrBD2T382_R182iC2gNZI9HzWFMC_8&index=5">COMP2013-2</option>
							</optgroup>
						</select>



						<div
							style={this.greenStyle}
							onClick={() => {
								handleVideoSelection({}, this.state.youtube_url)
								// }, 'https://www.youtube.com/watch?v=nPSy_4uZYBI&ab_channel=%7B%E2%80%A2WinglessWolf%E2%80%A2%7D');
								this.setState({
									form: 0
								})
								this.props.setUserName(this.state.name)
							}}
						>
							Go <i style={this.arrow}></i>
						</div>
					</div>

					{/* JOIN ROOM FORM */}
					<div style={{ display: (this.state.form == 2 ? "flex" : "none"), marginTop: '20px', 'flex-direction': 'column', width: '40%' }}>
						<input style={this.inputStyle} type="text" onChange={(e) => {
							this.setState({
								...this.state,
								name: e.target.value
							})
						}}
							placeholder="Name"
						/>

						<input style={this.inputStyle} type="text" onChange={(e) => {
							this.setState({
								...this.state,
								room_id: e.target.value
							})
						}}
							placeholder="Room Code"
						/>

						<div style={{ textAlign: "center", marginTop: "-25px" }}>OR</div>

						<select
							onChange={(e) => {
								this.setState({
									...this.state,
									joinSelection: e.target.value
								})
							}}

							style={
								{
									padding: '10px', borderRadius: '50px', marginBottom: '20px', borderWidth: '2px', borderStyle: "solid",
									borderColor: "white",
									backgroundColor: "Azure",
									color: "gray"
								}
							}

						>
							<option value="" selected disabled hidden>Join public room</option>
							<optgroup label="COMP1001">
								<option value="1">COMP1001-3 (3 users)</option>
							</optgroup>

							<optgroup label="COMP2013">
								<option value="2">COMP2013-2 (1 user)</option>
							</optgroup>
						</select>

						<div
							style={this.greenStyle}
							onClick={() => {

								this.setState({
									form: 0
								})

								this.props.router.push(`/party/${this.state.room_id}`)
								this.props.setUserName(this.state.name)
							}}

						>
							Go <i style={this.arrow}></i>
						</div>
					</div>

				</div>

				<div>
					<img src={Logo} style={{ 'zIndex': '-2', width: '100vw', height: '100vh', position: 'fixed', bottom: 0, right: "-10vw" }} />
					<img src={Person} style={{ 'zIndex': '-1', width: '70%', height: '70%', position: 'fixed', bottom: 0, right: '-10vw' }} />
				</div>

				<span onClick={() => {
					this.props.router.push('/dashboard')
				}} style={{ position: 'fixed', bottom: '25px', left: '25px', opacity: 0.6, fontSize: '17px', cursor: 'pointer' }}>For Teachers</span>
			</div>


		)
	}
}



const mapStateToProps = (state) => {
	return {
		isFetchingVideos: state.videoList.isFetching,
		youtubeVideos: state.videoList.youtubeVideos,
		user: state.user,
	}
}

const mapDispatchToProps = {
	navigateToPath: appActions.navigateToPath,
	disconnectFromAllParties: userActions.disconnectFromAllParties,
	loadYoutubeVideos: videoListActions.loadYoutubeVideos,
	handleVideoSelection: videoListActions.handleVideoSelection,
	setUserName: userActions.setUserName
}

BrowsePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(BrowsePage)

export default BrowsePage