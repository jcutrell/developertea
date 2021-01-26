import Head from 'next/head'
import {useRouter} from 'next/router'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import tw, {styled} from 'twin.macro'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, markdownToHtml } from 'api/blog';

import Page from '../../components/Page'

const PAGESIZE = 30;

const Footer = styled.footer`
  margin: 2rem 0 auto;
  display: flex;
`;

const BlogPostContainer = styled.section`
  ${tw`my-12`}
  p {
    ${tw`my-6`}
  }
  blockquote {
    ${tw`text-xl pl-6 border-l-8`}
  }
  ul {
    ${tw`my-4`}
  }
`

const components = {
    h2: ({ children }) => (<h2 class="text-2xl font-bold mt-6 mb-4">{children}</h2>)
}

export default function BlogPost({post}) {
  const router = useRouter();
  const {slug} = router.query;
  return (
    <Page>
      <Head>
        <title>Developer Tea :: {post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/blog">&laquo; All Posts</Link>
      <BlogPostContainer tw="grid grid-cols-12">
        <div tw="col-span-6 col-start-4">
        <h2 tw={'text-3xl font-semibold py-8'}>{post.title}</h2>
          <div
            dangerouslySetInnerHTML={{__html: post.content }}
          />
        </div>
      </BlogPostContainer>
    </Page>
  );
}

export async function getStaticProps({ params }) {
	const post = getPostBySlug(params.slug, [
		'title',
		'date',
		'slug',
		'author',
		'content',
	])
	const content = await markdownToHtml(post.content || '')

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	}
}

export async function getStaticPaths() {
  
  const posts = getAllPosts(['slug'])

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			}
		}),
		fallback: false,
	}

}
