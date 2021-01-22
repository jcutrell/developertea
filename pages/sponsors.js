import Head from "next/head";
import Page from "../components/Page";
import tw from "twin.macro";

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
            <div tw="grid">
              <p tw="my-5">
                The sponsors of Developer Tea make this show happen, but even
                more importantly, they provide amazing things for you, the
                developer. Go check them out by clicking on their logo below!
              </p>
              <div className="row sponsor-row">
                <div tw="grid grid-cols-10 my-5">
                  {sponsors.map((sponsor) => (
                    <>
                      <a target="_blank" href={sponsor.link}>
                        <img src={sponsor.img_url} />
                      </a>
                      <p>{sponsor.blurb}</p>
                    </>
                  ))}
                </div>
              </div>
              <p className="">
                Developer Tea has over 10k regular listeners and has accumulated
                over 13 million unique listens since the first episode aired in
                January 2015.
              </p>
              <div tw="my-6">
                <a
                  tw="border border-brandBlue-600 bg-brandBlue-800 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none hover:text-white hover:bg-brandBlue-600"
                  href="/contact"
                >
                  Learn About Becoming a Sponsor
                </a>
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
      blurb: "",
      link: "https://linode.com/developertea",
      img_url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Official_Linode_logo.svg/1200px-Official_Linode_logo.svg.png",
    },
  ];

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      sponsors,
    },
  };
}
