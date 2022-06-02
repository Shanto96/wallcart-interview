/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { Provider } from "react-redux";
import { store } from "../lib/store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
