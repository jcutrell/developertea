import "tailwindcss/tailwind.css";
import tw, { styled, css } from "twin.macro";
import { useContext } from "react";
import Head from "next/head";

import { store } from "../store.js";

import algoliasearch from "algoliasearch/lite";
import {
  connectStateResults,
  InstantSearch,
  SearchBox,
  Hits,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "I0WT5HWUGY",
  "e67a4744e38e3902ff6a4cd32bb89863"
);

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    !searchState.query ? null : searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>No results have been found for {searchState.query}.</div>
    )
);

const iconStyles = css`
  html {
    font-size: 14px;
  }

  .ais-SearchBox .ais-SearchBox-input {
    width: 100%;
    ${tw`rounded-md`}
  }

  .ais-Hits-item {
    list-style: none;
  }

  .ais-SearchBox-form {
    position: relative;
  }
  .ais-SearchBox-submit {
    display: none;
  }
  .ais-SearchBox-reset {
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 10px;
    width: 8px;
    height: 8px;
    z-index: 500;
  }
`;

const ResultContainer = styled.div`
  position: absolute;
  background: #fff;
  z-index: 500;
  width: 60%;
  left: 20%;
  ${tw`rounded-lg px-4 py-6 shadow-xl`}
`;

function SiteLayout({ children }) {
  return (
    <div tw="bg-gray-50">
      <Head>
        <style>{iconStyles}</style>
      </Head>
      <nav tw={"py-16 pt-10 px-4"}>
        <div tw="container mx-auto grid md:grid-cols-12">
          <div tw={"md:col-span-3 md:col-start-2"}>
            <a
              tw="py-1"
              href="/"
              style={{ display: "block" }}
            >
              <img
                src="/images/dt-logo.svg"
                alt="Developer Tea"
                style={{
                  height: "120px",
                  display: "block",
                  maxWidth: "100%",
                }}
              />
            </a>
          </div>

          <div tw={"text-center col-span-4 pt-3 px-4"}>
            <InstantSearch indexName="Episodes" searchClient={searchClient}>
              <SearchBox />
              <Results>
                <ResultContainer>
                  <Hits
                    hitComponent={({ hit }) => (
                      <div>
                        <a
                          tw="text-left px-3 py-2 hover:bg-gray-100 block"
                          href={`/episodes/${hit.id}`}
                        >
                          {hit.title}
                        </a>
                      </div>
                    )}
                  />
                </ResultContainer>
              </Results>
            </InstantSearch>
          </div>
          <div tw={"text-right col-span-3 leading-10 text-sm pt-5"}>
            <a tw="px-2 py-1" href="https://bit.ly/DevTeaOniTunes">
              iTunes
            </a>
            <a tw="px-2 py-1" href="/blog">
              Blog
            </a>
            <a tw="px-2 py-1" href="/">
              Episodes
            </a>
            <a tw="px-2 py-1" target="_blank" href="/sponsors">
              Sponsors
            </a>
            <a tw="px-2 py-1" href="/contact">
              Contact
            </a>
          </div>
        </div>
      </nav>
      <main tw={"px-4 md:px-0"}>{children}</main>
      <div className="ghost-footer"></div>
      <aside className="footer-cta" tw="pt-4">
        <div tw="md:grid-cols-12">
          <div tw="md:col-span-4 md:col-start-4 text-center pb-4">
            Developer Tea was a part of <a href="http://spec.fm">Spec</a> and is
            hosted by{" "}
            <a href="https://twitter.com/jcutrell">Jonathan Cutrell</a>,
            engineering manager at{" "}
            <a href="https://www.getgarner.com">Garner</a>.
          </div>
        </div>
      </aside>
    </div>
  );
}

export default SiteLayout;
