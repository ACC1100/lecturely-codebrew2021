import App from '../components/app/App'
import BrowsePage from '../pages/browse/BrowsePage'
import PartyPage from '../pages/party/PartyPage'
import SearchPage from '../pages/search/SearchPage'
import DashboardPage from '../pages/dashboard/DashboardPage'


export const routes = {
	path: '/',
	component: App,
	childRoutes: [
		{
			indexRoute: {
				component: BrowsePage
			}
		},
		{
			path: '/party/:partyId',
			component: PartyPage
		},
		{
			path: '/search/:query',
			components: SearchPage
		},
		{
			path: '/dashboard',
			components: DashboardPage
		}
	]
};