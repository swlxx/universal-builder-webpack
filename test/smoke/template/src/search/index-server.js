/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
// import React from 'react';
// import largeNumber from 'large-number';
// import logo from './images/logo.png';
// import './search.less';
const React = require('react');
const largeNumber = require('large-number');
const logo = require('./public/image/logo.png');
const s = require('./public/design/search.less');

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      Text: null,
    };
  }

  loadComponent() {
      import('./dynamic-import')
        .then((DynamicImport) => {
          this.setState({
            DynamicImport: DynamicImport.default,
          });
        });
  }

  render() {
    const { Text } = this.state;
    const addResult = largeNumber('999', '1');
    return (
      <div className="search-text">
        {
        Text ? <Text /> : null
        }
        { addResult }
        搜索文字的内容
        <img src={logo} onClick={this.loadComponent.bind(this)} />
      </div>
    );
  }
}

module.exports = <Search />;
