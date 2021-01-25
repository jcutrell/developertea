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
            <div tw="grid grid-cols-9">
              <p tw="my-5 col-span-6">
                The sponsors of Developer Tea make this show happen, but even
                more importantly, they provide amazing things for you, the
                developer. Go check them out by clicking on their logo below!
              </p>
            </div>
            <div className="row sponsor-row">
              <div tw="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 my-12">
                {sponsors.map((sponsor) => (
                  <>
                    <a target="_blank" href={sponsor.link} tw="p-4 opacity-80 hover:opacity-100">
                      <img src={sponsor.img_url} tw="inline-block w-full" />
                      <span>{sponsor.blurb}</span>
                    </a>
                  </>
                ))}
              </div>
            </div>
            <div tw="grid grid-cols-12">
              <h2 className="text-xl font-medium col-span-12 mb-4 mt-10">Interested in being a sponsor?</h2>
              <div tw="col-span-6 text-sm">
                Developer Tea has over 10k regular listeners and has accumulated
                over 13 million unique listens since the first episode aired in
                January 2015.
                <a
                  tw="inline-block text-center border border-brandBlue-600 bg-brandBlue-800 text-white rounded-md px-4 py-2 my-6 transition duration-500 ease select-none focus:outline-none hover:text-white hover:bg-brandBlue-600"
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
    {
      blurb: "",
      link: "https://listennotes.com/",
      img_url:
        "/images/sponsors/listennotes.svg",
    },
  ];

  return {
    props: {
      sponsors,
    },
  };
}
