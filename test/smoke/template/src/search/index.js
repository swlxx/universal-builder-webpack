'use static';

/* document.write('search page'); */
import React from 'react';
import ReactDOM from 'react-dom';
import testLargeNumber from 'aa-number';
import './public/design/search.less';
import Logo from './public/image/logo.webp';
import { a } from './tree-shaking';
import '../../common';

/* if (false) {
  b();
}; */

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      DynamicImport: null,
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
    /* debugger; */
    const { DynamicImport } = this.state;
    const addResult = testLargeNumber('999', '1');
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div className="search-text">
        <div>
          <span>Search Page</span>
          <span>Search Page Watch</span>
          <span>{a()}</span>
          <img src={Logo} alt="logo" />
        </div>
        <div>
          {/* <button onClick={ this.loadComponent.bind(this) }>dynamic-import</button> */}
          <button onClick={() => this.loadComponent()} type="button">dynamic-import</button>
          { DynamicImport ? <DynamicImport /> : 'unLoad...' }
        </div>
        <div>
          <span>
            addResult:
            {addResult}
          </span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById('root'));
