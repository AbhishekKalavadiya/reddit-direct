import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cogoToast from 'cogo-toast'
import 'tachyons'
import axios from 'axios'

function SignIn(props) {
	const [signInEmail, setSignInEmail] = useState('')
	const [signInPassword, setSignInPassword] = useState('')

	function onSubmitSignIn(){
		

		const users = {
			email: signInEmail,
			password: signInPassword
		}

		axios.post('http://localhost:7777/user/login', users)
			.then(res => {
		 	 console.log(res.headers['token']);
		  	sessionStorage.setItem("jwt-token",res.headers['token']);
		 	 cogoToast.success('Logged in successfully!', { hideAfter : 5 })
			 	 .then(() => window.location = '/')
			})
			
			.catch(err => {
				console.log('user doesnot exist')
			})
	
		setSignInEmail('');
		setSignInPassword('');
			
	}

	return (
		<article className="br3 ba b--black-10 mv6 w-80 w-50-m w-40-l mw6 shadow-1 center">
			<main className="pa5 black-80">
				<div className="measure">
					<form id="sign_up" className="ba b--transparent ph0 mh0">
					<Link to='/' style={{margin: '0px', color: 'black'}}>
						<img
							src="/docs/4.0/assets/brand/bootstrap-solid.svg"
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt=""
						/>
						Aww Cute
					</Link >
						<legend className="f2 fw6 ph0 mh0">Log In</legend>
						
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="email-address">
								Email
							</label>
							<input
								className="pa2 input-reset ba hover-bg-black hover-white w-100"
								type="email"
								name="email-address"
								id="email-address"
								value={signInEmail}
								onChange={(e) => setSignInEmail(e.target.value)}
								required
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">
								Password
							</label>
							<input
								className="b pa2 input-reset ba hover-bg-black hover-white w-100"
								type="password"
								name="password"
								id="password"
								value={signInPassword}
								onChange={(e) => setSignInPassword(e.target.value)}
								required
							/>
						</div>
						
						{/* <Link to="/"> */}
							<button
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								onClick={()=>onSubmitSignIn()}
							>Sign In </button>
						{/* </Link >	 */}
							<br /> <br />
						
						<Link to="signup">
							<input
								className=" ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
								value="Sign up"
								type="submit"
							/>
						</Link>
					</form>
				</div>
			</main>
		</article>
	)
}

export default SignIn