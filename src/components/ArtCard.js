import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export default class ArtCard extends Component {
    render() {
        return (
            <Card>
                    <Image src={this.props.artifact.image_url} wrapped size='small'/>
                <Card.Content>
                    <Card.Header>{this.props.artifact.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{this.props.artifact.century}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.artifact.description ? this.props.artifact.description.substring(0, 25)+'...' : null}
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
