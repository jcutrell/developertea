import Head from 'next/head'
import Page from '../components/Page'

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Developer Tea, Hot and Fresh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-xl font-medium">Developer Tea</h1> 
        <p>I'm <a href="https://twitter.com/jcutrell">@jCutrell</a> and my goal with Developer Tea is to help driven engineers find clarity, perspective, and purpose in their careers.</p>
      </main>
    </Page>
  )
}
