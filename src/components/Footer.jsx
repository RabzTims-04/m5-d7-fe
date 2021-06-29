import React, { Component } from 'react';
import {Container} from 'react-bootstrap'

class Footer extends Component {
    render() {
        return (
            <footer className="text-muted" style={{ paddingTop: 50, paddingBottom: 50 }}>
                <Container>{`${new Date().getFullYear()} - © Amazon | Developed for homework projects.`}</Container>
            </footer>
        );
    }
}

export default Footer;