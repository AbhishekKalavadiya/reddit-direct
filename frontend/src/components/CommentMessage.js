import React from 'react'
import { Comment} from 'semantic-ui-react'
import axios from 'axios'
import cogoToast from 'cogo-toast'

class CommentMessage extends React.Component{

	constructor(props){
		super(props);
		this.state = {
		  publisher : ''
		}
  
	  }
	  componentDidMount(){
		const jwt = sessionStorage.getItem("jwt-token");
		if(jwt === null){
		  console.log('not well logged in');
		}
		else{
			const headers = { headers: {
			  "Accept": "application/json",
			  "Content-type": "application/json",
			  "token": jwt,
			  }
			}
			axios.post('http://localhost:7777/api/cache/updownstate', {'commentid' : this.props.comment.id }, headers)
			  .then(resp => { this.setState(resp.data)})
			  .catch(err => console.log(err));  
			}
		
	  }
	  handleUpvoteDownvote(e){
		console.log(e.target.email);
		console.log(this.props);
		const json = { type: e.target.email };
		json.data = this.props;
		console.log(json);
		const jwt = sessionStorage.getItem("jwt-token");
		if(jwt === null){
			console.log('jwt-token is not found please signup/signin')
		}
		else {
		  console.log(this.state.publisher);
		  
		  if(this.state.publisher == json.data.comment.user.id){
			cogoToast.error(`You cant ${e.target.name} your own comment!`, { hideAfter : 5 })
		  }
		  else {
		  this.props.socket.send(JSON.stringify(json));
		  const headers = { headers: {
			"Accept": "application/json",
			"Content-type": "application/json",
			"token": jwt,
			}
		  }
		  // sync with mongo
		  axios.put('http://localhost:7777/api/comments/update', json.data.comment, headers)
			.then(res => { 
			  console.log(res);
			  //sync wtih redis
			  axios.put('http://localhost:7777/api/cache/updownstate', {'commentid' : json.data.comment.id }, headers)
			  .then(resp => this.setState(resp.data))
			  .catch(err => console.log(err));  
			  
			})
			.catch(err => console.log(err));
		  }
		}
	  }

 	// rawMarkup = () => {
	// 	var md = new Remarkable();
	// 	var rawMarkup = md.render(props.children.toString());
	// 	return { __html: rawMarkup };
	// }

	render(){
  	return(
		<div>
			<Comment.Group threaded>
				<Comment>
					<Comment.Avatar as='a' src='/images/avatar/small/matt.jpg' />
					<Comment.Content>
						<Comment.Author as='a'>mat</Comment.Author>
						<Comment.Metadata>
						<span>Today at 5:42PM</span>
						</Comment.Metadata>
						<Comment.Text>
							{this.props.comment.content }
						</Comment.Text>
					</Comment.Content>
				</Comment>
				<br/>
			</Comment.Group>
		</div>
	)
}
}
export default CommentMessage