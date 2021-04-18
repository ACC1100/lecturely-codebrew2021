// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Assets
import logo from '../../assets/logo_white.svg'

// CSS
import './AppHeader.css'


// Components
import SearchBar from '../searchBar/SearchBar'

// icon
import pic from '../../assets/picture_logo.svg'


export default class AppHeader extends Component {
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
			<div className="app-header">

				<div className="header-title-wrapper" onClick={this.navigateToHomePage} style={{ display: 'flex' }}>
					<img src={pic} style={{ 'zIndex': '-1', width: '30px', height: '30px', marginTop: '7px', marginLeft: '8px' }} />
					<span className="content" style={{ fontSize: '20px', marginLeft: '45px', marginTop: '0' }}>lecturely</span>
				</div>

			</div>
		)
	}
}