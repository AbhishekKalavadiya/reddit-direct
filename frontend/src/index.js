import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
// import SignIn from './cosmponents/SignIn'
// import SignUp from './components/SignUp'
import './index.css'


const App = () => {
	return (
		<BrowserRouter>
			<Route exact={true} path="/" component={Home} />
			{/* <Switch>
				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
			</Switch> */}
			<Route path="/404" component={PageNotFound} />
		</BrowserRouter>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))

if(module.hot) {
	module.hot.accept();
}
