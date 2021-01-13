import Head from 'next/head'
import Page from '../components/Page'
import EpisodeIndex from './episodes/index.js';

const PAGESIZE = 20;

export default EpisodeIndex;

export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const p = context?.query?.p || 1;
  const res = await fetch(
    `https://api.simplecast.com/podcasts/${
      process.env.PODCAST_ID
    }/episodes?limit=${PAGESIZE}&offset=${(p - 1) * PAGESIZE}`,
    {
      headers: {
        authorization: `Bearer ${process.env.SIMPLECAST_API_KEY}`,
      },
    },
  );
  const episodes = await res.json();

  return {
    props: {
      episodes,
    },
  };
}
