import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";
import EpisodeCard from "../../components/EpisodeCard";
import Link from "next/link";
import colors from "tailwindcss/colors";

const BeehiivEmbed = dynamic(() => import("../../components/BeehiivEmbed"), {
  ssr: false,
  loading: () => <div style={{ height: "315px" }} />,
});

const PAGESIZE = 20;

const Footer = styled.footer`
  margin: 2rem 0 auto;
`;

const PLink = styled(Link)`
  color: ${(props) => (props.active ? "white" : null)};
  background-color: ${(props) =>
    props.active ? colors.blue["900"] : "transparent"};
  ${tw`px-2 py-1 font-medium inline-block text-xs`}
  &:hover {
    color: ${(props) => (props.active ? "white" : "inherit")};
  }
`;

export default function EpisodeIndex({ episodes }) {
  const router = useRouter();
  const { id, p = 1 } = router.query;
  const currentPage = Number(p);
  const pageCount = Math.ceil(episodes.count / PAGESIZE);

  return (
    <div>
      <Head>
        <title>Developer Tea :: All Episodes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://subscribe-forms.beehiiv.com/embed.js"
        strategy="lazyOnload"
      />
      <main tw={"md:grid grid-cols-12 container mx-auto"}>
        <aside
          tw={"md:col-span-3 md:col-start-2 md:h-screen md:sticky top-0 pt-6"}
        >
          <h3 tw={"text-3xl font-bold mb-4"}>All Episodes</h3>
          <p>
            I started Developer Tea in 2015 to help engineers find clarity,
            perspective, and purpose in regular short bursts of high-value
            content.
          </p>
          <p>
            If you'd like to ask a question, head over to the{" "}
            <a href="/contact">Contact</a> page.
          </p>

          <Footer tw={"mx-auto container py-9 grid grid-cols-12"}>
            <p tw={"mb-2 col-span-12"}>
              Page {currentPage} of {pageCount}
            </p>
            <p tw={"col-span-12"}>
              {new Array(pageCount).fill(0).map((_, i) => (
                <PLink
                  active={currentPage === i + 1}
                  href={`/episodes?p=${i + 1}`}
                  key={`plink-${i}`}
                >
                  {i + 1}
                </PLink>
              ))}
            </p>
          </Footer>
          <BeehiivEmbed />
        </aside>

        <section tw={"md:col-span-5 md:col-start-6"}>
          {episodes.collection.map((ep) => (
            <EpisodeCard
              episode={ep}
              key={ep.id}
              tw={
                "shadow-lg m-3 mb-12 text-gray-600 transition hover:text-gray-900 hover:shadow-xl align-middle rounded-lg"
              }
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const p = context?.query?.p || 1;
  const res = await fetch(
    `https://api.simplecast.com/podcasts/${
      process.env.PODCAST_ID
    }/episodes?limit=${PAGESIZE}&offset=${(p - 1) * PAGESIZE}`,
    {
      headers: {
        authorization: `Bearer ${process.env.SIMPLECAST_API_KEY}`,
      },
    }
  );
  const episodes = await res.json();

  // Filter out scheduled episodes (episodes with published_at in the future)
  const now = new Date();
  const filteredEpisodes = {
    ...episodes,
    collection: (episodes.collection || []).filter(episode => {
      const publishedAt = new Date(episode.published_at);
      return publishedAt <= now;
    })
  };

  return {
    props: {
      episodes: filteredEpisodes,
    },
  };
}
