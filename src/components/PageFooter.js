import React, { Component } from 'react';
import Footer from 'rc-footer';

export default class PageFooter extends Component {
  render() {
    return (
      <div>
        <Footer
          backgroundColor="#005882"
          columns={[
            {
              url: 'https://classi-client.herokuapp.com/',
              description: 'Classical car listing site',
              openExternal: true,
            },
          ]}
          bottom="Copyright &copy; Classi 2020"
        />
      </div>
    );
  }
}
