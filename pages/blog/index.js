import Head from 'next/head';
import {useRouter} from 'next/router';
import tw, {styled, css} from 'twin.macro';
import BlogPostCard from '../../components/BlogPostCard';
import Link from 'next/link';
import colors from 'tailwindcss/colors';
import Mailchimp from 'react-mailchimp-form'
import { getAllPosts } from '../../lib/blog_api';

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

const chimpForm = css`
  .mailchimp-form input {
      ${tw`px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none  w-full`}
  }
  .mailchimp-form button {
    ${tw`mt-3 bg-brandBlue-600 text-white px-3 py-2 rounded-md text-sm`}
  }

  .mailchimp-form button:hover {
    ${tw`bg-brandBlue-800`}
  }
`

export default function PostIndex({posts}) {
  const router = useRouter();
  const {id, p = 1} = router.query;

  return (
    <div>
      <Head>
        . <title>Developer Tea :: All Episodes</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{chimpForm}</style>
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

          <h2 tw="mb-4 text-lg">Get more from Developer Tea.</h2>
          <p tw="mb-2">Sign up to receive periodic news and content beyond these episodes.</p>
          <Mailchimp
            action='https://hackingtheimpossible.us7.list-manage.com/subscribe/post?u=fea32c85d97c14702c688f06e&amp;id=e9dda73d5e'
            fields={[
              {
                name: 'EMAIL',
                placeholder: 'Your best email',
                type: 'email',
                required: true
              }
            ]}

            className="mailchimp-form"

          />

        </aside>

        <section tw={'md:col-span-6 md:col-start-6'}>
          {posts.map(post => (
            <BlogPostCard
              post={post}
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
  const posts = getAllPosts([
     'title',
     'date',
     'slug',
     'author',
     'excerpt',
   ])

   return {
     props: { posts },
   }
}
