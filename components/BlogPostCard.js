import {useContext} from 'react';
import tw, {styled} from 'twin.macro';
import {DateTime} from 'luxon';
import Link from 'next/link';
import striptags from 'striptags';

import {store} from '../store.js';

function stripHtml(html)
{
  return striptags(html);
}

const Excerpt = ({ post }) => {
  const html = `${stripHtml(post.content).split(/\.\s+/).slice(0, 1)}.`
  console.log(html);
  return (<div dangerouslySetInnerHTML={{ __html: html }} />)
}

export default function BlogPostCard({post, ...rest}) {
  const globalState = useContext(store);
  const {dispatch, state} = globalState;
  return (
    <div {...rest} tw={'relative text-left items-center'}>
      <Link href={`/blog/${post.slug}`} passHref tw={'h-full w-full block p-8 flex flex-col justify-center text-left'}>
          <span tw={'mb-4 font-bold'}>{post.title}</span>
          <div>
            <Excerpt post={post} />
          </div>
          <span tw={'text-sm text-gray-400'}>
            Published: {DateTime.fromISO(post.date).toLocaleString()}
          </span>
      </Link>
    </div>
  );
}
