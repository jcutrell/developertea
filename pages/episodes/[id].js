import Head from "next/head";
import { useRouter } from "next/router";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import tw, { styled } from "twin.macro";
import Link from "next/link";
import { DateTime } from 'luxon';

import Page from "../../components/Page";

const PAGESIZE = 30;

const H2special = (props) => <h2 tw="text-2xl font-bold mt-6 mb-4" {...props} />

const components = {
  H2special
};



const pubDate = (episode) =>
  `${DateTime.fromISO(episode.published_at).toLocaleString()}`;

export default function EpisodeIndex({ episode }) {
  const router = useRouter();
  const { id } = router.query;
  const { mdxSource } = episode;
  return (
    <Page>
      <Head>
        <title>Developer Tea :: {episode.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="grid grid-cols-8">
        <section tw="col-span-6 col-start-2">
          <Link href="/episodes">&laquo; All Episodes</Link>
          <h2 tw={"text-4xl font-semibold py-6"}>{episode.title}</h2>
          <p>Published {pubDate(episode)}</p>
          <iframe
            height="200px"
            width="100%"
            frameBorder="no"
            scrolling="no"
            seamless
            tw={"pt-2 pb-2 my-6"}
            src={`https://player.simplecast.com/${id}?dark=false`}
          ></iframe>
          <div>
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </section>
      </div>
    </Page>
  );
}

function avoidRateLimit(delay = 650){
  if (!process.env.IS_BUILD){
    return
  }
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export async function getStaticProps(context) {
  await avoidRateLimit()
  const episode_id = context.params.id;
  const res = await fetch(`https://api.simplecast.com/episodes/${episode_id}`, {
    headers: {
      authorization: `Bearer ${process.env.SIMPLECAST_API_KEY}`,
    },
  });
  const episode = await res.json();

  //const regex = /(<([^>]+)>)/ig;
  const result = episode.long_description.replace(/h2/gi, "H2special");


  episode.mdxSource = await serialize(result, { parseFrontmatter: false });

  return {
    props: {
      episode,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `https://api.simplecast.com/podcasts/${process.env.PODCAST_ID}/episodes?limit=1500&offset=0`,
    {
      headers: {
        authorization: `Bearer ${process.env.SIMPLECAST_API_KEY}`,
      },
    }
  );
  const episodes = await res.json();
  return {
    paths: episodes.collection.map((ep) => `/episodes/${ep.id}`),
    fallback: false,
  };
}
