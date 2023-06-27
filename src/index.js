import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import Course from './Components/Course';

// REDUX
import { Provider } from 'react-redux';
import store from './store/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// ROUTER DOM
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "courses/:courseId",
    element: <Course />,
  },
]);

// Create the persistor
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
