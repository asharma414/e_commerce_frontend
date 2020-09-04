import React, { Component } from 'react'
import { Carousel, Jumbotron, Row, Col } from 'react-bootstrap'
import { Image, Loader, Button, List, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'


class ArtDetail extends Component {

    state = {
        artifact: null,
        images: []
    }

    componentDidMount() {
        fetch(url + `/artifacts/${this.props.id}`)
            .then(res => res.json())
            .then(data => {
                let images = []
                if (data.images) {
                    images = data.images.split(', ')
                }
                images.unshift(data.primary_image)
                this.setState({ artifact: data, images: images })
            }
            )
    }

    addToCart = (artifact_id, user_id) => {
        fetch(url + '/orders', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id,
                artifact_id: artifact_id
            })
        }).then(resp => resp.json())
            .then(data => {
                let updatedArtifact = { ...this.state.artifact }
                updatedArtifact['orders'] = [...updatedArtifact['orders'], data]
                this.setState({ artifact: updatedArtifact })
                localStorage.setItem('cart', parseInt(localStorage.getItem('cart')) + 1)
            })
    }

    bidItem = (e) => {
        console.log('bidding')
    }

    handleSlide = () => {
        this.setState({ index: (this.state.index + 1) % this.state.images.length })
    }

    handleBid = () =>
        this.setState((prevState) => ({ active: !prevState.active }))

    handleBuy = () =>
        this.setState((prevState) => ({ active: !prevState.active }))

    render() {
        const { active } = this.state
        if (!this.state.artifact) {
            return (
                <div>
                    <Loader active style={{marginTop: '20px'}} inline='centered' />
                    <div style={{ textAlign: 'center', color: '#a8a7b9' }}>Loading</div>
                </div>
            )
        } else {
            return (
                <div>
                    <Jumbotron className='artcard-jumbotron'>
                        <Row>
                            <Col>
                                {this.state.images.length > 1 ?
                                    <Carousel>
                                        {this.state.images.map(image =>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={image}
                                                    alt={this.state.images.indexOf(image) + 'slide'}
                                                />
                                            </Carousel.Item>
                                        )}
                                    </Carousel>
                                    :
                                    <Image src={this.state.images[0]} />
                                }
                            </Col>
                            <Col>
                                <List variant="flush">

                                    <List.Item>
                                        <Icon name='right triangle' />
                                        <List.Content>
                                            <List.Header>List Price</List.Header>
                                            <List.Description>${parseFloat(this.state.artifact.list_price).toFixed(2)}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>

                                    {this.state.artifact.accession_dated ?
                                        <List.Item>
                                            <Icon name='right triangle' />
                                            <List.Content>
                                                <List.Header>Dated</List.Header>
                                                <List.Description>{this.state.artifact.dated}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item> : null}


                                    {this.state.artifact.century ?
                                        <List.Item>
                                            <Icon name='right triangle' />
                                            <List.Content>
                                                <List.Header>Century</List.Header>
                                                <List.Description>{this.state.artifact.century}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item> : null}

                                    {this.state.artifact.culture ?
                                        <List.Item>
                                            <Icon name='right triangle' />
                                            <List.Content>
                                                <List.Header>Culture</List.Header>
                                                <List.Description>{this.state.artifact.culture}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item> : null}

                                    {this.state.artifact.technique ?
                                        <List.Item>
                                            <Icon name='right triangle' />
                                            <List.Content>
                                                <List.Header>Technique</List.Header>
                                                <List.Description>{this.state.artifact.technique}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item> : null}

                                    {this.state.artifact.dimensions ?
                                        <List.Item>
                                            <Icon name='right triangle' />
                                            <List.Content>
                                                <List.Header>Dimensions</List.Header>
                                                <List.Description>{this.state.artifact.dimensions}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item> : null}

                                    {this.state.artifact.medium ?
                                        <List.Item>
                                            <Icon name='right triangle' />
                                            <List.Content>
                                                <List.Header>Medium</List.Header>
                                                <List.Description>{this.state.artifact.medium}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item> : null}

                                    {this.state.artifact.accession_year ?
                                        <List.Item>
                                            <Icon name='right triangle' />
                                            <List.Content>
                                                <List.Header>Accession Year</List.Header>
                                                <List.Description>{this.state.artifact.accession_year}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item> : null}

                                    {this.state.artifact.accession_method ?
                                        <List.Item>
                                            <Icon name='right triangle' />
                                            <List.Content>
                                                <List.Header>Accession Method</List.Header>
                                                <List.Description>{this.state.artifact.accession_method}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item> : null}
                                </List>
                                <br />
                                <Row style={{ marginLeft: '8px' }}>
                                    {!this.state.artifact.sold ? this.state.artifact.orders.find(order => order.user_id === this.props.currentUser) ? <Button>Added to Cart</Button> :
                                        <Button style={{ color: '#58768d' }} onClick={() => this.addToCart(this.state.artifact.id, this.props.currentUser)}>Add to Cart</Button> : <Button>Sold</Button>}
                                    {/* <Button floated='right' style={{ color: '#58768d'}} onClick={this.bidItem}>Bid</Button> */}
                                </Row>

                            </Col>
                        </Row>


                        <Row style={{ marginLeft: '10px', marginTop: '5px' }}>
                            <h4><b>{this.state.artifact.title}</b></h4>
                        </Row>

                        <br />
                        <Row style={{ marginLeft: '10px' }}>

                            {this.state.artifact.verification ?
                                <p><b>Verification:</b> {this.state.artifact.verification}</p>
                                : null}

                            <br />

                            {this.state.artifact.description ?
                                <p><b>Description:</b> {this.state.artifact.description}</p>
                                : null}

                            <br />

                            {this.state.artifact.provenance ?
                                <p><b>Provenance:</b> {this.state.artifact.provenance}</p>
                                : null}
                        </Row>
                        <br />
                        <Row style={{ marginLeft: '10px' }}>
                            <Button style={{ color: '#58768d' }} onClick={() => this.props.history.goBack()}>Back</Button>
                        </Row>

                    </Jumbotron>
                </div>
            )
        }
    }
}

export default withRouter(ArtDetail)

