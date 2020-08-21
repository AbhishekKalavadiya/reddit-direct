import React from 'react'
import CommentMessage from './CommentMessage'
import axios from 'axios'

class CommentList extends React.Component{

    constructor(props){
        super(props);
        this.state = { comments: [] }
      }
    
      componentDidMount(){
        fetch('http://localhost:7777/api/comments/')
          .then(resp => resp.json())
          .then(data => this.setState({ comments : data }))
          .catch(err => console.log(err));
      }
    
      componentWillReceiveProps = (nextProps) => {
        
        const data = JSON.stringify(nextProps.comment);
        console.log(data.data);
        if(data.type === "comment"){
            this.setState({ comments : [data.data, ...this.state.comments] })
          }
      } 
    
      commentList() {  
        return this.state.comments.map(currentcomment => {
          return <CommentMessage comment={currentcomment} socket={this.props.actions} key={currentcomment.id}/>;
        })
      }

      render() {
        return (
          <div className="commentList">
            { this.commentList() }
         </div>
        );
      }
    }

export default CommentList