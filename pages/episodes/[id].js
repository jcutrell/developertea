import Head from 'next/head'
import {useRouter} from 'next/router'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import tw, {styled} from 'twin.macro'
import Link from 'next/link'

import Page from '../../components/Page'

const PAGESIZE = 30;

const Footer = styled.footer`
  margin: 2rem 0 auto;
  display: flex;
`;

const components = {
    h2: ({ children }) => (<h2 class="text-2xl font-bold mt-6 mb-4">{children}</h2>)
}

export default function EpisodeIndex({episode}) {
  const router = useRouter();
  const {id} = router.query;
  const { description_html } = episode;
  const content = hydrate(description_html)
  return (
    <Page>
      <Head>
        <title>Developer Tea :: {episode.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/episodes">&laquo; All Episodes</Link>
      <h2 tw={'text-4xl font-semibold py-6'}>{episode.title}</h2>
      <iframe
        height="200px"
        width="100%"
        frameBorder="no"
        scrolling="no"
        seamless
        tw={'pt-2 pb-6'}
        src={`https://player.simplecast.com/${id}?dark=false`}></iframe>
        {content} 
    </Page>
  );
}

export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const episode_id = context.params.id;
  const res = await fetch(`https://api.simplecast.com/episodes/${episode_id}`, {
    headers: {
      authorization: `Bearer ${process.env.SIMPLECAST_API_KEY}`,
    },
  });
  const episode = await res.json();
  episode.description_html = await renderToString(episode.long_description);

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      episode,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `https://api.simplecast.com/podcasts/${process.env.PODCAST_ID}/episodes?limit=1000&offset=0`,
    {
      headers: {
        authorization: `Bearer ${process.env.SIMPLECAST_API_KEY}`,
      },
    },
  );
  const episodes = await res.json();
  return {
    paths: episodes.collection.map(ep => `/episodes/${ep.id}`),
    fallback: false,
  };
}
