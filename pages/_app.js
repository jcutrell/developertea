import React from "react";
import SiteLayout from "../layouts/SiteLayout";
import "../styles/globals.css";
import { StateProvider } from "../store.js";
import SimplecastPlayer from "../components/SimplecastPlayer";
import { MDXProvider } from '@mdx-js/react'


function MainApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <StateProvider>
          <Component {...pageProps} />
          <SimplecastPlayer />
      </StateProvider>
    </SiteLayout>
  );
}

export default MainApp;
