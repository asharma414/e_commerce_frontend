import React, { Component } from 'react'
import { Card, Icon, Image, Popup } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class ArtCard extends Component {
    render() {
        if (this.props.artifact.title.length > 50) {
        return (
           
            <Popup
                trigger={
                    <Card onClick={() => this.props.history.push(`/artifacts/${this.props.artifact.id}`)}>
                        <Image style={{ width: 'auto' }} src={this.props.artifact.primary_image} wrapped size='small' />
                        <Card.Content>
                            <Card.Header>{this.props.artifact.title.length <= 50 ? this.props.artifact.title : this.props.artifact.title.substring(0, 50) + '...'}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{this.props.artifact.century}</span>
                            </Card.Meta>
                            <Card.Description>
                                {this.props.artifact.description ? this.props.artifact.description.substring(0, 25) + '...' : null}
                            </Card.Description>
                            {/* <Card.Description>
                        {this.props.artifact.category.name}
                    </Card.Description> */}
                        </Card.Content>
                        <Card.Content extra >
                            <span style={{ color: '#58768d' }}>
                                <Icon name='dollar sign' />
                                {parseFloat(this.props.artifact.list_price).toFixed(2)}
                            </span>
                        </Card.Content>
                    </Card>
                }
            >
               
                <Popup.Header>Full title</Popup.Header>
                <Popup.Content>
                  
               { this.props.artifact.title}
                </Popup.Content>

            </Popup> 
        )} else {

           return (
            <Card onClick={() => this.props.history.push(`/artifacts/${this.props.artifact.id}`)}>
            <Image style={{ width: 'auto' }} src={this.props.artifact.primary_image} wrapped size='small' />
            <Card.Content>
                <Card.Header>{this.props.artifact.title.length <= 50 ? this.props.artifact.title : this.props.artifact.title.substring(0, 50) + '...'}</Card.Header>
                <Card.Meta>
                    <span className='date'>{this.props.artifact.century}</span>
                </Card.Meta>
                <Card.Description>
                    {this.props.artifact.description ? this.props.artifact.description.substring(0, 25) + '...' : null}
                </Card.Description>
                {/* <Card.Description>
            {this.props.artifact.category.name}
        </Card.Description> */}
            </Card.Content>
            <Card.Content extra >
                <a style={{ color: '#58768d' }}>
                    <Icon name='dollar sign' />
                    {parseFloat(this.props.artifact.list_price).toFixed(2)}
                </a>
            </Card.Content>
        </Card> 
        )}
    }
}

export default withRouter(ArtCard)
