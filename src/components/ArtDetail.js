import React, { Component } from 'react'
import { Carousel, Jumbotron, Row, Col, ListGroup } from 'react-bootstrap'
import { Image, Loader, Button, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class ArtDetail extends Component {

    state = {
        artifact: null,
        images: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/artifacts/${this.props.id}`)
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
        fetch('http://localhost:3000/orders', {
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
            let updatedArtifact = {...this.state.artifact}
            updatedArtifact['orders'] = [...updatedArtifact['orders'], data]
            this.setState({artifact: updatedArtifact})
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
                    <Loader active inline='centered' />
                    <div style={{ textAlign: 'center' }}>Loading</div>
                </div>
            )
        } else {
            return (
                <div>
                    <Jumbotron>
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
                                <ListGroup variant="flush">

                                    <ListGroup.Item>${parseFloat(this.state.artifact.list_price).toFixed(2)}</ListGroup.Item>

                                    {this.state.artifact.century ?
                                        <ListGroup.Item>{this.state.artifact.century}</ListGroup.Item>
                                        : null}
                                    {this.state.artifact.technique ?
                                        <ListGroup.Item>{this.state.artifact.technique}</ListGroup.Item>
                                        : null}
                                    {this.state.artifact.dimensions ?
                                        <ListGroup.Item>{this.state.artifact.dimensions}</ListGroup.Item>
                                        : null}

                                </ListGroup>
                                <br />

                                <ListGroup horizontal>
                                        {this.state.artifact.orders.find(order => order.user_id === this.props.currentUser) ? <Button>Added to Cart</Button> : 
                                    <Button onClick={() => this.addToCart(this.state.artifact.id, this.props.currentUser)}>Add to Cart</Button>}
                                    <Button onClick={this.bidItem}>Bid</Button>
                                </ListGroup>

                            </Col>
                        </Row>
                        <br />
                        <Row>

                            <h3>{this.state.artifact.title}</h3>
                        </Row>
                        <Row>
                            <p>Verification: {this.state.artifact.verification}</p>
                            <p>{this.state.artifact.provenance}</p>
                            <p>{this.state.artifact.description}</p>

                        </Row>
                        <br />

                        <Button variant='danger' onClick={() => this.props.history.goBack()}>Back To Home</Button>
                    </Jumbotron>
                </div>
            )
        }
    }
}

export default withRouter(ArtDetail)

