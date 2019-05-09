import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ChangeableContent from './components/ChangeableContent';
import ChangeableMenu from './components/ChangeableMenu';
import './components/style.css';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={ store }>
              <div className="content">
                  <ChangeableMenu />
                  <ChangeableContent />
              </div>
            </Provider>
        );
    }
}
