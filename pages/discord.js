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
        <h1 className="text-xl font-medium mb-2">Join the Developer Tea Discord Community</h1> 
        <p className="mb-6">Join the Developer Tea Discord Community today to connect with other driven engineers and creators around the world.
          <ul>
            <li>Discuss episodes</li>
            <li>Get feedback on your work</li>
            <li>Ask any questions</li>
            <li>Make suggestions for future Developer Tea episodes and content</li>
          </ul>
          </p>
        <iframe src="https://discord.com/widget?id=798340795727216641&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
      </main>
    </Page>
  )
}
