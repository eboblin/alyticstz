
//stylesheets
import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.css';

import './styles/index.css';

//react-redux stuff
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux'

//own modules
import App from './App';
import { loadState, saveState } from './localStorage';
import { mainReducer } from './reducers'


//here we go!
const persistedState = loadState();
const store = createStore(mainReducer, persistedState);
store.subscribe(() => { saveState(store.getState());})

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
  )