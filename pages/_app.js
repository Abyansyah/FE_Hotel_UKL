import 'ahmad/styles/globals.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import store from 'ahmad/config/store';
import { DateRangeProvider } from 'ahmad/context/datePicker';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <DateRangeProvider>
          <Component {...pageProps} />
        </DateRangeProvider>
      </Provider>
    </>
  );
}
