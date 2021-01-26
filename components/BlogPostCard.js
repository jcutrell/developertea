import {useContext} from 'react';
import tw, {styled} from 'twin.macro';
import {DateTime} from 'luxon';
import Link from 'next/link';

import {store} from '../store.js';

export default function BlogPostCard({post, ...rest}) {
  const globalState = useContext(store);
  const {dispatch, state} = globalState;
  return (
    <div {...rest} tw={'relative text-left items-center'}>
      <Link href={`/blog/${post.slug}`} passHref>
        <a
          tw={'h-full w-full block p-8 flex flex-col justify-center text-left'}>
          <span tw={'mb-4 font-bold'}>{post.title}</span>
          <div>
            {post.content}
          </div>
          <span tw={'text-sm text-gray-400'}>
            Published: {DateTime.fromISO(post.date).toLocaleString()}
          </span>
        </a>
      </Link>
    </div>
  );
}