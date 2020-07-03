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

    handleBid = () =>
    this.setState((prevState) => ({ active: !prevState.active }))

    handleBuy = () =>
    this.setState((prevState) => ({ active: !prevState.active }))

    render() {
        const { active } = this.state
        return (
            <div>
                <Container fluid>
                    <Item.Group divided>
                        <Item>
                            <Item.Image src={this.state.artifact.image_url} size='medium' bordered />

                            <Item.Content>
                                <h3>${this.state.artifact.list_price}</h3>
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
                                        <Button.Group floated='right'>
                                            <Button 
                                            basic color = 'yellow'
                                            toggle active={active} onClick={this.handleBid}
                                            >Bid</Button>
                                            <Button.Or/>
                                            <Button 
                                            basic color = 'grey'
                                            toggle active={active} onClick={this.handleBuy}
                                            >Buy</Button>
                                        </Button.Group>
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



