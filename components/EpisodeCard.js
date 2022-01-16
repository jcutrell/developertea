import {useContext} from 'react';
import tw, {styled} from 'twin.macro';
import {DateTime} from 'luxon';
import Link from 'next/link';

import {store} from '../store.js';

const PageContainer = styled.section`
  padding: 2rem 10%;
`;

const duration = episode => `~${Math.round(episode.duration / 60)}m`;
const pubDate = episode => `${DateTime.fromISO(episode.published_at).toLocaleString()}`;

export default function EpisodeCard({episode, ...rest}) {
  const globalState = useContext(store);
  const {dispatch, state} = globalState;
  return (
    <div {...rest} tw={'relative text-left items-center bg-white'}>
      <Link href={`/episodes/${episode.id}`} passHref>
        <a
          tw={'h-full w-full block p-8 flex flex-col justify-center text-left'}>
          <span tw={'mb-4 font-bold'}>{episode.title}</span>
          <p tw={'my-2 text-sm text-gray-500'}>{episode.description}</p>
          <span tw={'text-sm text-gray-400'}>
            Published: {pubDate(episode)}
            <br />
            Length: {duration(episode)}
          </span>
        </a>
      </Link>
      <button
        onClick={e => {
          dispatch({type: 'setPlayerId', value: episode.id});
        }}
        tw={'border-2 border-blue-100 text-brandBlue-800 py-2 px-3 rounded-md text-xs m-8 mt-0 hover:bg-brandBlue-600 hover:text-white hover:border-brandBlue-600'}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="15px"
          height="15px"
          viewBox="0 0 311.59 332.27"
          tw={'fill-current'}
          style={{
            float: "left",
            marginRight: "6px",
            display: 'inline-block',
            overflow: 'visible',
            'enable-background': 'new 0 0 311.59 332.27',
          }}
          xmlSpace="preserve">
          <path
            d="M0,0v332.27h311.59V0H0z M132.81,292.27v-52.92c0-24.56-19.98-44.54-44.54-44.54H40V40h205.76l-85.07,91.71V84.72h-40v96.88
            c0,11.62,9.46,21.08,21.08,21.08h96.88v-40h-52.13l85.07-91.71v221.3H132.81z"
          />
        </svg>
        Load in Player
      </button>
    </div>
  );
}
