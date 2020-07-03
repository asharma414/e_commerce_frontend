import React, { Component } from 'react'
import { Container, Header, Button, Icon, Image, Item, Label, List } from 'semantic-ui-react'

export default class ArtDetail extends Component {

    state = {
        artifact: {}
    }

    componentDidMount() {
        fetch(`http://localhost:3000/artifacts/${this.props.id}`)
            .then(res => res.json())
            .then(data => this.setState({ artifact: data }))
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Item.Group divided>
                        <Item>
                            <Item.Image src={this.state.artifact.image_url} size='medium' bordered />

                            <Item.Content>
                                <h4>${this.state.artifact.list_price}</h4>
                                <Item.Meta>
                                    <span className='cinema'></span>
                                </Item.Meta>
                                <Item.Description></Item.Description>
                                <Item.Extra>
                                    

                                    {/* <Label></Label> */}

                                    <List>
                                    <List.Item >
                                        <Icon name='right triangle' />
                                        <List.Content>
                                            {/* <List.Header></List.Header>  */}
                                            <List.Description>
                                                {this.state.artifact.dated}

                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item >
                                        <Icon name='right triangle' />
                                        <List.Content>
                                            {/* <List.Header></List.Header> */}
                                            <List.Description>
                                                {this.state.artifact.culture}

                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item >
                                        <Icon name='right triangle' />
                                        <List.Content>
                                            {/* <List.Header></List.Header> */}
                                            <List.Description>
                                                {this.state.artifact.medium}

                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    </List>
                                    <div>
                                    <Button  primary floated='right'>
                                        Buy
                            <Icon name='right chevron' />
                                    </Button>
                                   <br/>
                                   <br />
                                    <Button  primary floated='right'>
                                        Bid 
                            <Icon name='right chevron' />
                                    </Button>
                                  </div>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>

                    <Header as='h2'>{this.state.artifact.title}</Header>
                    <div>
                        <p>{this.state.artifact.century}</p>
                        <p>{this.state.artifact.verification ?
                            'Verification: ' + this.state.artifact.verification
                            :
                            null}
                        </p>

                        <p>
                            {this.state.artifact.description}
                        </p>
                    </div>
                </Container>
            </div>
        )
    }
}



