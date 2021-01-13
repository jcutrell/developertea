import Head from 'next/head';
import Page from '../components/Page';

export default function Home({ sponsors }) {
  return (
    <Page>
      <Head>
        <title>Developer Tea, Hot and Fresh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-xl font-medium">Developer Tea Sponsors</h1>
        <section className="sponsors vp-md-top-5 vp-md-bottom-5">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-3">
                <h1>Sponsors</h1>
                <p>
                  The sponsors of Developer Tea make this show happen, but even
                  more importantly, they provide amazing things for you, the
                  developer. Go check them out by clicking on their logo below!
                </p>
                <div className="row sponsor-row">
                  {sponsors.map(sponsor => (
                    <div className="col-md-8 vp-xs-top-3 cp-xs-bottom-3">
                      <a target="_blank" href={sponsor.link}>
                        <img src={sponsor.img_url} />
                      </a>
                      <p>{sponsor.blurb}</p>
                    </div>
                  ))}
                </div>
                <div className="row sponsor-row vm-xs-top-4">
                  <p className="text-center col-md-12 col-md-offset-2">
                    Developer Tea has over 10k regular listeners and has
                    accumulated over 12 million unique listens since the first
                    episode aired in January 2015.
                  </p>
                  <a
                    className="col-md-12 col-md-offset-2 text-center btn btn-primary"
                    href="/contact">
                    Learn About Becoming a Sponsor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}

export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //
  const sponsors = [
    {
      blurb: "Linode is awesome.",
      img_url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Official_Linode_logo.svg/1200px-Official_Linode_logo.svg.png"
    }
  ]

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      sponsors,
    },
  }
}
