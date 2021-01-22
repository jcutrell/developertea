import 'tailwindcss/tailwind.css';
import tw, {styled, css} from 'twin.macro';
import {useContext} from 'react';
import Head from 'next/head';

import {store} from '../store.js';

import algoliasearch from 'algoliasearch/lite';
import {
  connectStateResults,
  InstantSearch,
  SearchBox,
  Hits,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'I0WT5HWUGY',
  'e67a4744e38e3902ff6a4cd32bb89863',
);

const Results = connectStateResults(({searchState, searchResults, children}) =>
  !searchState.query ? null : searchResults && searchResults.nbHits !== 0 ? (
    children
  ) : (
    <div>No results have been found for {searchState.query}.</div>
  ),
);

const ResultContainer = styled.div`
  position: absolute;
  background: #FFF;
  z-index: 500;
  width: 60%;
  left: 20%;
  ${tw`rounded-lg px-4 py-6 shadow-xl`}
`
const iconStyles = css`
  .ais-SearchBox
    .ais-SearchBox-input {
      width: 100%;
      ${tw`rounded-md`}
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
`

function SiteLayout({children}) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous" />
        <style>{iconStyles}</style>
      </Head>
      <nav tw={'py-6 px-4 md:px-0'}>
        <div tw="container mx-auto grid md:grid-cols-12">
          <div tw={'text-left col-span-4'}>
            <a
              tw="py-1"
              href="/"
              style={{lineHeight: '60px'}}
              tw={'text-xl font-semibold'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={56}
                height={50}
                viewBox="0 0 309.55 276.97"
                overflow="visible"
                tw={'mr-3'}
                style={{
                  display: 'inline',
                  float: 'left',
                }}>
                <style>{'.prefix__st1{fill:#002f8e}'}</style>
                <linearGradient
                  id="prefix__SVGID_1_"
                  gradientUnits="userSpaceOnUse"
                  x1={42.019}
                  y1={-4.201}
                  x2={42.019}
                  y2={215.598}
                  gradientTransform="rotate(-7.946 623.144 -1103.3)">
                  <stop offset={0} stopColor="#ff8f40" />
                  <stop offset={1} stopColor="#ff8e82" />
                </linearGradient>
                <path
                  d="M283.42 83.56l-95.21-15.77c-3.54-.59-7.14.61-9.63 3.19l-28.89 29.95a16.35 16.35 0 00-4.35 8.66l-21.31 129.23c-1.19 7.24 3.71 14.08 10.95 15.28l137.73 22.71c7.24 1.19 14.08-3.71 15.28-10.95l21.34-129.43c.52-3.14.11-6.36-1.18-9.26L291.61 89.9a10.91 10.91 0 00-8.19-6.34z"
                  fill="url(#prefix__SVGID_1_)"
                />
                <path
                  className="prefix__st1"
                  d="M226.85 131.63l31.19-23.43 29.34-22.04c.7-.52.43-1.63-.43-1.77l-50.93-8.4-50.93-8.4c-.86-.14-1.47.82-.98 1.53l20.71 30.3 22.03 32.21z"
                />
                <path
                  d="M235.72 75.94s14.32-47.76-32.98-67.85c-30.3-12.87-84.82-5.25-85.85 69.01-1 72.68-73.02 70.85-73.02 70.85"
                  fill="none"
                  stroke="#0faab2"
                  strokeWidth={6}
                  strokeMiterlimit={10}
                />
                <path
                  className="prefix__st1"
                  d="M.91 166.13l21.2 29.57a4.858 4.858 0 006.79 1.12l39.85-28.57a4.858 4.858 0 001.12-6.79l-21.2-29.57a4.858 4.858 0 00-6.79-1.12L2.03 159.33a4.887 4.887 0 00-1.12 6.8z"
                />
                <linearGradient
                  id="prefix__SVGID_2_"
                  gradientUnits="userSpaceOnUse"
                  x1={41.25}
                  y1={83.595}
                  x2={41.25}
                  y2={215.598}
                  gradientTransform="rotate(-7.946 623.144 -1103.3)">
                  <stop offset={0.031} stopColor="#ff4800" />
                  <stop offset={1} stopColor="#c70064" />
                </linearGradient>
                <path
                  d="M257.58 155.78c-43.34 6.06-30.03 29.85-76.17 36.3-21.1 2.95-39.5 12.38-53.26 21.75l-4.12 24.98c-1.19 7.24 3.71 14.08 10.95 15.28l137.73 22.71c7.24 1.19 14.08-3.71 15.28-10.95l20.91-126.78c-11.79 6.37-29.22 13.62-51.32 16.71z"
                  fill="url(#prefix__SVGID_2_)"
                />
              </svg>
              developer tea
            </a>
          </div>

          <div tw={'text-center col-span-4'}>
            <InstantSearch indexName="Episodes" searchClient={searchClient}>
              <SearchBox />
                <Results>
                  <ResultContainer>
                    <Hits
                      hitComponent={({hit}) => (
                        <div>
                          <a tw="text-left px-3 py-2 hover:bg-gray-100 block" href={`/episodes/${hit.id}`}>{hit.title}</a>
                        </div>
                      )}
                    />
                  </ResultContainer>
                </Results>
            </InstantSearch>
          </div>
          <div tw={'text-right col-span-4'}>
            <a tw="px-2 py-1" href="https://bit.ly/DevTeaOniTunes">
              iTunes
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
      <main tw={'px-4 md:px-0'}>{children}</main>
      <div className="ghost-footer"></div>
      <aside className="footer-cta pt-4">
        <div className="md:grid-cols-12">
          <div className="md:col-span-4 md:col-start-4 text-center pb-4">
            <h3>
              Developer Tea was a part of <a href="http://spec.fm">Spec</a> and
              is hosted by{' '}
              <a href="https://twitter.com/jcutrell">Jonathan Cutrell</a>,
              director of technology at <a href="https://pbs.org">PBS</a>.
            </h3>
          </div>
        </div>
      </aside>
      <footer className={['pt-2 pb-2', 'pb-8'].join(' ')}>
        <div className="container"></div>
      </footer>
    </div>
  );
}

export default SiteLayout;
