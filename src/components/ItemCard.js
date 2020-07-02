import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export default class ItemCard extends Component {
    render() {
        return (
            <Card>
                <div className="ui floated small image">
                    <img src={this.props.artifact.image_url} />
                </div> 
                <Card.Content>
                    <Card.Header>{this.props.artifact.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{this.props.artifact.century}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.artifact.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='dollar sign' />
                        {parseFloat(this.props.artifact.list_price).toFixed(2)}
                    </a>
                </Card.Content>
            </Card>
        )
    }
}
