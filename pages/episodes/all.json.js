import Head from "next/head";
import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";
import EpisodeCard from "../../components/EpisodeCard";
import Link from "next/link";
import colors from "tailwindcss/colors";
const PAGESIZE = 20;

const Footer = styled.footer`
  margin: 2rem 0 auto;
`;

const PLink = styled(Link)`
  color: ${(props) => {
    return props.active ? "white" : null;
  }};
  background-color: ${(props) => {
    return props.active ? colors.blue["900"] : "transparent";
  }};
  ${tw`px-2 py-1 font-medium inline-block text-xs`}
  &:hover {
    color: ${(props) => {
      return props.active ? "white" : "inherit";
    }};
  }
`;

export default function EpisodeIndex({ episodes }) {
  const router = useRouter();
  const { id, p = 1 } = router.query;
  const pageCount = Math.ceil(episodes.count / PAGESIZE);

  return (
    <div>
      <Head>
        <title>Developer Tea :: All Episodes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main tw={"md:grid grid-cols-12 container mx-auto"}>
        All Episodes:
        <textarea>{JSON.stringify(episodes.collection)}</textarea>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const p = context?.query?.p || 1;
  const res = await fetch(
    `https://api.simplecast.com/podcasts/${process.env.PODCAST_ID}/episodes?limit=3000`,
    {
      headers: {
        authorization: `Bearer ${process.env.SIMPLECAST_API_KEY}`,
      },
    }
  );
  const episodes = await res.json();

  return {
    props: {
      episodes,
    },
  };
}
