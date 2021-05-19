import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';
import store from './redux/store';
ReactDOM.render(
  <Provider store={store}>
    <ParallaxProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ParallaxProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
