import React from 'react';
import { Provider} from 'react-redux';
import store from './store';
import ChangeableContent from './components/ChangeableContent';
import ChangeableMenu from './components/ChangeableMenu';


export default class App extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                    <div>
                        <div className="content">
                            <ChangeableMenu />
                            <ChangeableContent />
                        </div>
                    </div>
            </Provider>
        );
    }
}