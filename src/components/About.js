import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class About extends Component {
    render() {
        return (
            <div>
                <Jumbotron className='cart-jumbotron'>
                E-licit Art is a faux e-commerce platform meant to encourage users to think about the origins of art, its relationship to museums, and speculative valuations. 
                How do elite institutions acquire artwork? How much of it ends up on <a style={{ color: '#58768d' }} 
                href= 'https://www.bbc.com/culture/article/20150123-7-masterpieces-you-cant-see' rel="noopener noreferrer" target='_blank'>
                display or hidden in storage</a>? And how should we, as artistic consumers, think about their social and economic worth? 
                <br />
                <br />
                In recent years, some European and North American museums have started to reconsider the history and provenance of
                their Near Eastern and African collections, such as <a style={{ color: '#58768d' }} 
                href= 'https://www.theatlantic.com/international/archive/2018/03/iraq-war-archeology-invasion/555200/' rel="noopener noreferrer" target='_blank'>archaeological artifacts from Iraq</a> or <a style={{ color: '#58768d' }} 
                href= 'https://hyperallergic.com/456942/europol-seizure-of-looted-antiquities/' rel="noopener noreferrer" target='_blank'>looted antiquities</a>. 
                With E-licit Art, we think it's important for museum-goers to imagine the behind-the-scenes <i>trading</i> and <i>acquisition</i> of artworks, which includes their complex histories, 
                missing or lost verification information, and randomly assigned worth.
                <br />
                <br />
                The data for E-licit Art comes from the <a style={{ color: '#58768d' }} 
                href= 'https://www.harvardartmuseums.org/collections/api' rel="noopener noreferrer" target='_blank'>Harvard Art Museums API</a>.
                <br />
                <br />
                <br />
                <span className='small-font'>Created, Designed, and Developed by: Abhinav Sharma and Saima Akhtar</span>

                </Jumbotron>
            </div>
        )
    }
}

export default withRouter(About)