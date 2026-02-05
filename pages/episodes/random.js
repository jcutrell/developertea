import Head from 'next/head'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Page from '../../components/Page';
const PAGESIZE = 30

const Footer = styled.footer`
  margin: 2rem 0 auto;
  display: flex;
`

export default function EpisodeIndex({ episode }) {
  const router = useRouter()
  const { id } = episode;
  return (
    <Page>
      <Head>
        <title>Developer Tea :: {episode.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <a href="/episodes">&laquo; All Episodes</a>
      <h2>{episode.title}</h2>
      <iframe height="200px" width="100%" frameBorder="no" scrolling="no" seamless src={`https://player.simplecast.com/${id}?dark=false`}></iframe>
      <div>
        <div dangerouslySetInnerHTML={{__html: episode.long_description}}></div>
      </div>
    </Page>
  )
}

export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`https://api.simplecast.com/podcasts/${process.env.PODCAST_ID}/episodes?limit=1&offset=0`, {
    headers: {
      'authorization': `Bearer ${process.env.SIMPLECAST_API_KEY}`
    }
  })
  const eps = await res.json()

  // Keep trying to find a published episode (not scheduled)
  const now = new Date();
  let episode = null;
  let attempts = 0;
  const maxAttempts = 10;

  while (!episode && attempts < maxAttempts) {
    const pick = Math.floor(Math.random() * eps.count);
    const pickres = await fetch(`https://api.simplecast.com/podcasts/${process.env.PODCAST_ID}/episodes?limit=1&offset=${pick}`, {
      headers: {
        'authorization': `Bearer ${process.env.SIMPLECAST_API_KEY}`
      }
    })
    const episodes = await pickres.json();
    const candidate = episodes.collection[0];
    const publishedAt = new Date(candidate.published_at);

    if (publishedAt <= now) {
      episode = candidate;
    }
    attempts++;
  }

  // Fallback to first episode if no published episode found
  if (!episode) {
    const pickres = await fetch(`https://api.simplecast.com/podcasts/${process.env.PODCAST_ID}/episodes?limit=1&offset=0`, {
      headers: {
        'authorization': `Bearer ${process.env.SIMPLECAST_API_KEY}`
      }
    })
    const episodes = await pickres.json();
    episode = episodes.collection[0];
  }

  return {
    props: {
      episode,
    },
  }
}

