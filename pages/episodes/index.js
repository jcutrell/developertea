import Head from 'next/head';
import {useRouter} from 'next/router';
import tw, {styled} from 'twin.macro';
import EpisodeCard from '../../components/EpisodeCard';
import Link from 'next/link';
import colors from 'tailwindcss/colors';

const PAGESIZE = 20;

const Footer = styled.footer`
  margin: 2rem 0 auto;
`;

const PLink = styled.a`
  color: ${props => {
    return props.active ? 'white' : null;
  }};
  background-color: ${props => {
    return props.active ? colors.blue['900'] : 'transparent';
  }};
  ${tw`px-2 py-1 font-medium inline-block text-xs`}
  &:hover {
    color: ${props => {
      return props.active ? 'white' : 'inherit';
    }};
  }
`;

export default function EpisodeIndex({episodes}) {
  const router = useRouter();
  const {id, p = 1} = router.query;
  const pageCount = Math.ceil(episodes.count / PAGESIZE);

  return (
    <div>
      <Head>
        . <title>Developer Tea :: All Episodes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main tw={'md:grid grid-cols-12 container mx-auto'}>
        <aside
          tw={'md:col-span-4 md:col-start-1 md:h-screen md:sticky top-0 pt-6'}>
          <h3 tw={'text-3xl font-bold mb-4'}>All Episodes</h3>
          <p>
            I started Developer Tea in 2015 to help engineers find clarity,
            perspective, and purpose in regular short bursts of high-value
            content.
          </p>
          <p>
            If you'd like to ask a question, head over to the{' '}
            <a href="/contact">Contact</a> page.
          </p>

          <Footer tw={'mx-auto container py-9 grid grid-cols-12'}>
            <p tw={'mb-2 col-span-12'}>
              Page {p} of {pageCount}
            </p>
            <p tw={'col-span-12'}>
              {new Array(pageCount).fill(0).map((_, i) => (
                <Link href={`/episodes?p=${i + 1}`} passHref>
                  <PLink active={p == i + 1}>{i + 1}</PLink>
                </Link>
              ))}
            </p>
          </Footer>
          <form action="" tw={'pt-4'}>
            <h4 tw={'font-bold mb-2 text-xl'}>Get Updates</h4>
            <input
              type="email"
              placeholder="Email Address"
              tw={'block mb-4 rounded-md'}
            />
            <input
              type="submit"
              value="Subscribe"
              tw={
                'block font-bold text-xs leading-4 tracking-wider uppercase bg-blue-600 text-white px-3 py-2 rounded-md hover:cursor-pointer hover:bg-blue-900 transition'
              }
            />
          </form>
        </aside>

        <section tw={'md:col-span-6 md:col-start-6'}>
          {episodes.collection.map(ep => (
            <EpisodeCard
              episode={ep}
              tw={
                'shadow-md m-3 mb-5 text-gray-600 transition hover:text-gray-900 hover:shadow-lg align-middle rounded-lg'
              }
            />
          ))}
        </section>
      </main>
    </div>
  );
}

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
