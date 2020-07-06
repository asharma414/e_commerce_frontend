import React, { Component } from 'react'
import { Carousel, Jumbotron, Row, Col, ListGroup, Button } from 'react-bootstrap'

export default class ArtDetail extends Component {

    state = {
        artifact: {},
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

    handleSlide = () => {
        this.setState({ index: (this.state.index + 1) % this.state.images.length })
    }

    handleBid = () =>
        this.setState((prevState) => ({ active: !prevState.active }))

    handleBuy = () =>
        this.setState((prevState) => ({ active: !prevState.active }))

    render() {
        const { active } = this.state
        return (
            <div>
                <Jumbotron>
                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
                            <ListGroup variant="flush">
                                <ListGroup.Item>${parseFloat(this.state.artifact.list_price).toFixed(2)}</ListGroup.Item>
                    
                                <ListGroup.Item>{this.state.artifact.century}</ListGroup.Item>
                                <ListGroup.Item>{this.state.artifact.technique}</ListGroup.Item>
                                <ListGroup.Item>{this.state.artifact.dimensions}</ListGroup.Item>
                        
                            </ListGroup>
                            <ListGroup horizontal>
                                <Button variant='primary'>Buy</Button>
                                <Button variant='primary'>Bid</Button>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                    
                    <h3>{this.state.artifact.title}</h3>
                    </Row>
                    <Row>
                    <p>Verification: {this.state.artifact.verification}</p>
                        <p>{this.state.artifact.provenance}</p>
                        <p>{this.state.artifact.description}</p>
                      
                </Row>
                </Jumbotron>
            </div>
        )
    }
}



