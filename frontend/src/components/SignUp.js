import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'tachyons'

function SignUp(props) {
	const [signUpName, setSignUpName] = useState('')
	const [signUpEmail, setSignUpEmail] = useState('')
	const [signUpPassword, setSignUpPassword] = useState('')

	function onSubmitSignUp(){
		

		const users = {
			username: signUpName,
			email: signUpEmail,
			password: signUpPassword
		}
		fetch(`http://localhost:7777/user/signup`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(users)
		})
			.then(response => response.json())
			.then(response => {console.log(response, 'USer Added'); sessionStorage.setItem("jwt-token",response.headers['token']);})
			.catch(err => {
				alert('Email already exist')
			})
		

		setSignUpEmail('');
		setSignUpName('');
		setSignUpPassword('')
			
			
	}

	return (
		<article className="br3 ba b--black-10 mv6 w-80 w-50-m w-40-l mw6 shadow-1 center">
			<main className="pa5 black-80">
				<div className="measure">
					<form id="sign_up"   className="ba b--transparent ph0 mh0">
					<Link to='/' style={{margin: '0px', color: 'black'}}>
						<img
							src="/docs/4.0/assets/brand/bootstrap-solid.svg"
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt=""
						/>
						Aww Cute
					</Link>
						<legend className="f2 fw6 ph0 mh0">Register</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="Name">
								Name
							</label>
							<input
								className="pa2 input-reset ba hover-bg-black hover-white w-100"
								type="text"
								name="Name"
								id="Name"
								value={signUpName}
								onChange={(e) => setSignUpName(e.target.value)}
								required
							/>
							<label className="db fw6 lh-copy f6" htmlFor="email-address">
								Email
							</label>
							<input
								className="pa2 input-reset ba hover-bg-black hover-white w-100"
								type="email"
								name="email-address"
								id="email-address"
								value={signUpEmail}
								onChange={(e) => setSignUpEmail(e.target.value)}
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
								value={signUpPassword}
								onChange={(e) => setSignUpPassword(e.target.value)}
								required
							/>
						</div>
						<Link to="/">
							<button
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								onClick={()=>onSubmitSignUp()}
								type="submit"
							>Submit</button>
						</Link>
					</form>
				</div>
			</main>
		</article>
	)
}

export default SignUp
