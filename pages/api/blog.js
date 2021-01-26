import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { DateTime } from 'luxon';
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = join(process.cwd(), 'blog')

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug, fields = []) {
  const lSlug = slug.toLowerCase()
	const realSlug = lSlug.replace(/\.md$/, '')
	const fullPath = join(postsDirectory, `${realSlug}.md`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')
	const { data, content } = matter(fileContents)

	const items = {}

	// Ensure only the minimal needed data is exposed
	fields.forEach((field) => {
		if (field === 'slug') {
			items[field] = realSlug
		}
		if (field === 'content') {
			items[field] = content
		}

		if (field === 'date') {
			items[field] = DateTime.fromJSDate(data[field]).toString()
		} else {

      if (data[field]) {
        items[field] = data[field]
      }
    }
	})

	return items
}

export function getAllPosts(fields = []) {
	const slugs = getPostSlugs()
	const posts = slugs
		.map((slug) => getPostBySlug(slug, fields))
		// sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
	return posts
}

export async function markdownToHtml(markdown) {
	const result = await remark().use(html).process(markdown)
	return result.toString()
}
