import React, { Component } from 'react'
import { Accordion, Label } from 'semantic-ui-react'
import CommentBox from './CommentBox'

class DropdownComments extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
        <Accordion >
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
          style ={{width: '28%'}}
        >
          <Label color='#0000CD' content='Comments' />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
           <CommentBox />
          </p>
        </Accordion.Content>
      </Accordion>
    )
  }
};

export default DropdownComments
