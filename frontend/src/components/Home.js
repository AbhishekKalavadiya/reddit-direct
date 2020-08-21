import React, { useState, useEffect } from 'react'
import NavigationBar from './NavigationBar'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
import Footer from './Footer'
import Zoom from 'react-medium-image-zoom'
import {TwitterShareButton} from 'react-twitter-embed'
import ScrollArrow from './ScrollArrow'
import './Home.css'
import 'react-medium-image-zoom/dist/styles.css'

// import { Card } from 'react-bootstrap'
// import DropdownComments from './DropdownComments'

// The toast can be warning, error and success
toast.configure()

const POST_TYPES = {
	HOSTED_VIDEO: 'hosted:video',
	RICH_VIDEO: 'rich:video',
	IMAGE: 'image',
	GIFV: 'link'
}

const mapPostType = typeStr => {
	switch (typeStr) {
		case POST_TYPES.HOSTED_VIDEO:
			return 'video';
		case POST_TYPES.RICH_VIDEO:
			return 'image';
		case POST_TYPES.IMAGE:
			return 'image';
		case POST_TYPES.GIFV:
			return 'image';
		default:
			return null;
	}
}
const mapPostUrl = post => {
	if (!post.data)	return;

	const {data: {post_hint, url}} = post;
	switch (post_hint) {
		case POST_TYPES.HOSTED_VIDEO:
			return post.data.secure_media.reddit_video.fallback_url;
		case POST_TYPES.RICH_VIDEO:
			return post.data.media.oembed.thumbnail_url
		case POST_TYPES.IMAGE:
			return url;
		case POST_TYPES.GIFV:
			return post.data.thumbnail;
		default:
				return null;
	}
}

const parsePost = post => {
	return {
		type: mapPostType(post.data.post_hint),
		title: post.data.title,
		url: mapPostUrl(post),
		name: post.data.name,
		data: post.data,
	}
}

const Home = () => {
	const [posts, setPosts] = useState([])
	const [toggle, setToggle] = useState(false)
	const [darkCard, setDarkCard] = useState(getInitialMode())
	const [view, setView] = useState('wallpaper')

	

	const onToggle = () => setToggle(!toggle)

	useEffect(() => {
		getPosts()
	}, [view])

	useEffect(()=>{
		localStorage.setItem("dark", JSON.stringify(darkCard))
	}, [darkCard])

	function getInitialMode(){
		const isReturningUser = "dark" in localStorage;
		const savedMode = JSON.parse(localStorage.getItem('dark'))
		const userPrefersDark = getPrefColorScheme();

		if(isReturningUser){
			return savedMode;
		}
		else if (userPrefersDark){
			return true;
		}else {
			return false;
		}
	}

	function getPrefColorScheme(){
		if (!window.matchMedia) return;

		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	}

	const fetchMoreData = () => {
		nextPosts();
	}

	const getPosts = async () => {
		try {
			const request = await fetch(`https://www.reddit.com/r/${view}.json?limit=30&count=30`)
			const response = await request.json()
			const parsedPosts = response.data.children.map(parsePost)
			
			setPosts(parsedPosts)
		} catch (e) {
			return toast(`There was an error getting the posts ${e.message}`, {
				type: 'error',
			})
		}
	}

	const nextPosts = async () => {
		try {
			const request = await fetch(`https://www.reddit.com/r/${view}.json?limit=30&count=30&after=${posts[posts.length-1].name}`)
			const response = await request.json()
			const parsedPosts = response.data.children.map(parsePost);
			setPosts([...posts,...parsedPosts])
		} catch (e) {
			return toast(`There was an error getting the posts ${e.message}`, {
				type: 'error',
			})
		}
	}

	const filterVideos = post => {
		if (!post.type)	return
		return post.type.includes(toggle ?'video' :'image');
	}

	return (
		<div>
			<NavigationBar onToggle={onToggle} toggle={toggle} setView={setView} view={view}/>
			

			<div className='container'>
				<InfiniteScroll 
					className='loader'
					dataLength={posts.length}
					next={()=>fetchMoreData()}
					hasMore={true}
					loader={<h4 style={{textAlign: 'center'}} >Loading...</h4>}	
				>
					<div className='m-2'>
						<div className='row m-2'>
							{posts.filter(filterVideos).map( post => (
								<div key={post.data.id} className='all-post'>
									<div className='card'>
										<div className='card-body' style={{objectFit: 'contain'}}>{post.title}</div>
										<div className='card-post' >
											{post.type === 'video'
												? (<video  controls preload='auto'>
														<source src={post.url} type="video/mp4" />
													</video>)		
												:(post.data.preview.reddit_video_preview && post.data.preview.reddit_video_preview.is_gif  
													?(<video controls preload='auto'>
														<source src={post.data.preview.reddit_video_preview.fallback_url}/>
													</video>)
													:(!post.data.crosspost_parent
														?(post.data.domain === "i.redd.it"
															?(<Zoom transitionDuration={800} overlayBgColorEnd={'rgba(255, 255, 255, 0.70)'} zoomMargin={60} openText={'Zoom Image'}>
																<img src={post.url} alt={post.title} height='100%' width='100%'/>
															</Zoom>)
															:(<Zoom transitionDuration={800} overlayBgColorEnd={'rgba(255, 255, 255, 0.70)'} zoomMargin={60} openText={'Zoom Image'}>
																<img src={`${post.data.url_overridden_by_dest}.jpg`} alt={post.title} height='100%' width='100%'/>
															</Zoom>))
														:((post.data.crosspost_parent_list[0].post_hint === 'hosted:video' || post.data.crosspost_parent_list[0].domain === 'v.redd.it')
															?<video  controls preload='auto'>
																<source src={post.data.crosspost_parent_list[0].secure_media.reddit_video.fallback_url} type="video/mp4" />
															</video> 
															:(post.data.crosspost_parent_list[0].preview.reddit_video_preview && post.data.crosspost_parent_list[0].preview.reddit_video_preview.is_gif 
																?<video controls preload='auto'>
																	<source src={post.data.crosspost_parent_list[0].preview.reddit_video_preview.fallback_url}/>
																</video>
																:(post.data.crosspost_parent_list[0].domain === "i.redd.it"
																	?(<Zoom transitionDuration={800} overlayBgColorEnd={'rgba(255, 255, 255, 0.70)'} zoomMargin={60} openText={'Zoom Image'}>
																		<img src={post.data.crosspost_parent_list[0].url} alt={post.title} height='100%' width='100%'/>
																	</Zoom>)
																	:(<Zoom transitionDuration={800} overlayBgColorEnd={'rgba(255, 255, 255, 0.70)'} zoomMargin={60} openText={'Zoom Image'}>
																		<img src={`${post.data.crosspost_parent_list[0].url_overridden_by_dest}.jpg`} alt={post.title} height='100%' width='100%'/>
																	</Zoom>)	
																)
															)
														)
													)	
												)
											}			
											
										</div>
										<div className='button-twitter'style={{marginLeft: '40%', marginTop:'3%', marginBottom: '3%' }}>
 												<TwitterShareButton
 														url={post.url}
 														options={{ text: 'This is the cutest thing ever!' }}		
 													/>
 												{/* <DropdownComments /> */}
											</div> 
									</div>
								</div>
							))	}
						</div>
					</div>
				</InfiniteScroll>
			</div>
			<hr className='hr'></hr>
			<Footer />
			<div style={{marginLeft: '45%'}}>
				<ScrollArrow />
			</div>
		</div>
	)
}

export default Home

