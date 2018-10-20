import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'mobx-react'
import SearchBar from './Components/Searchbar'


const root=(
    <Provider >
        <SearchBar />
    </Provider>
)
ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
