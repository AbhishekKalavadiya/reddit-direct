import React, { useState } from 'react'
// import {
// 	Collapse,
// 	Navbar,
// 	NavbarToggler,
// 	NavbarBrand,
// 	Nav,
// 	NavbarText,
// 	Button,
// } from 'reactstrap'
// import { Link } from 'react-router-dom'
import './navigationBar.css'

const NavigationBar = ({toggle, onToggle, setView, view}) => {
	// const [isOpen, setIsOpen] = useState(false)

	// function toSignIn() {
	// 	console.log('hello')
	// }

	// const toggle = () => setIsOpen(!isOpen)

	return (
		<div className='navigationBar fixed-top'>
			<ul>
				<li className='navbar__name'><h3><strong>Reddit-Direct</strong></h3></li>

				<div className='navbar__selector'>
				
					<div className='navbar__options'>
						<label className='navbar__option'>r/</label>
						<select value={view} onChange={e => setView(e.target.value)}>
							<option value='wallpaper'selected>wallpaper</option>
							<option value="cats">cats</option>
							<option value='dankmemes'>dank-memes</option>
							<option value="aww">aww</option>	
							<option value="pics">pics</option>
							<option value="gaming">gaming</option>
						</select>
					</div>
					<li className='navbar__button'>
						<button  style={{ float: 'right' }} type="submit" onClick={onToggle}>
							{toggle ?'Show Pictures' :' Show Videos' }
						</button>
					</li> 
				</div>
			</ul>
			{/* <div className='navigationBar fixed-top' >
				{/* <img
					src="/docs/4.0/assets/brand/bootstrap-solid.svg"
					width="30"
					height="30"
					className="d-inline-block align-top"
					alt=""
				/> *
				<div className='title'>
					<h3><strong>Awwcute</strong></h3>
				</div>
				<div className='button'>
					{/* <div className="wrap "> */}
						{/* <div className="search"> *
							<button type="submit" className="filterButton" onClick={onToggle}>
								{toggle ?'Show Pictures' :' Show Videos' }
							</button>
							{/* <button type="submit" className="filterButton btn-outline-dark" onClick={()=>setDarkCard(prevMode => !prevMode)}>
								<i className="fa fa-search">{darkCard ?'Post Color to Light' :'Post Color to Dark' }</i>
							</button> */}
						{/* </div> */}
					{/* </div> *
				</div>
			</div> */}
			{/* <Navbar light expand="md" fixed='top' className='navbar navbar-fixed-top' style={{ backgroundColor: '#3A606E' }}>
				<NavbarBrand>
					<a className="navbar-brand" style={{alignText: "center"}} >
						<img
							src="/docs/4.0/assets/brand/bootstrap-solid.svg"
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt=""
						/>
						Aww Cute 
					</a>
				</NavbarBrand> */}
				{/* <NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<Link to="/404" style={{marginRight: "4px",marginBottom: '4px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
							<Button outline className="btn btn-outline-dark ma2">
								Cat
							</Button>
						</Link>
						<Link to="/404" style={{marginRight: "4px", marginBottom: '4px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
							<Button outline className="btn btn-outline-dark ma2">
								Dogs
							</Button>
						</Link>
						<Link to="/404" style={{marginRight: "4px",marginBottom: '4px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
							<Button outline className="btn btn-outline-dark ma2">
								Randoms
							</Button>
						</Link>
						<Link to="/404" style={{marginRight: "4px",marginBottom: '4px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
							<Button outline className="btn btn-outline-dark ma2">
								Store
							</Button>
						</Link>
					</Nav> */}
					{/* <div>
						<NavbarText className="mr-2">
							<Link to="/signin">
								<Button outline onClick={() => toSignIn()} className="btn btn-outline-success" >
									Log In
								</Button>
							</Link>
						</NavbarText>
						<NavbarText className="mr-2">
							<Link to="/signup">
								<Button outline  className="btn btn-outline-success" >Register</Button>
							</Link>
						</NavbarText>
					</div> */}
				{/* </Collapse> */}
			{/* </Navbar> */}

		</div>
	)
}

export default NavigationBar
