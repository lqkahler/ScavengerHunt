import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Container>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='Logo' />
          {this.props.children}
        </Container>
      </div>
    );
  }
}
