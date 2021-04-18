// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Assets
import logo from '../../assets/logo_white.svg'

// CSS
import './AppHeader2.css'


// Components
import SearchBar from '../searchBar/SearchBar'

// icon
import pic from '../../assets/picture_logo.svg'


export default class AppHeader2 extends Component {
	static propTypes = {
		search: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
		toggleSearch: PropTypes.func.isRequired,
		handleSearch: PropTypes.func.isRequired,
		router: PropTypes.object.isRequired,
	}

	navigateToHomePage = () => {
		this.props.router.push('/')
	}

	renderSearchButton = (bool) => {
		return bool ? (
			<li>
				<span className="btn btn-icon fa fa-search" onClick={this.props.toggleSearch} />
			</li>
		) : null
	}

	render() {
		return (
			<div className="app-header" style={{ width: "50%", marginLeft: "2%", marginTop: "1.5%" }}>
				<div className="g-row">
					<div className="g-col">

						<div className="header-title-wrapper" onClick={this.navigateToHomePage}>
							<img src={pic} style={{ 'zIndex': '-1', width: '50px', height: '50px' }} />
							<span className="content">lecturely</span>
						</div>

					</div>
				</div>
			</div>
		)
	}
}