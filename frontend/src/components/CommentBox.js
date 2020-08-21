import React from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

class CommentBox extends React.Component {

    constructor(props){
        super(props);
        const sock = new WebSocket('ws://localhost:7777/comment');
        sock.onopen = function() {
            console.log('open');
        };
    
        const self = this;
        sock.onmessage = function(e) {
              const message = JSON.parse(e.data);
              const dataToSend = JSON.stringify(message);
              self.setState({ comment: dataToSend });
        };
    
        this.state = {
          actions : sock,
          comment : {},
        }
      }

    render(){
    return(
        <div className= 'commentBox'>
            <CommentList { ... this.state  }/>
            <CommentForm { ... this.state  }/>
        </div>
    )
}
}
export default CommentBox