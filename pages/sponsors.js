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
        <h1 tw="text-2xl font-bold">Developer Tea Sponsors</h1>
        <section className="sponsors" tw="md:pt-5 md:pb-5">
          <div tw="container">
            <div tw="grid grid-cols-9">
              <p tw="my-5 col-span-6">
                The sponsors of Developer Tea make this show happen, but even
                more importantly, they provide amazing things for you, the
                developer. Go check them out by clicking on their logo below!
              </p>
            </div>
            <div className="row sponsor-row">
              <h2 tw="text-xl font-medium mt-8">2026 Sponsors</h2>
              <div tw="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 my-4">
                {sponsors.map((sponsor) => (
                  <a key={sponsor.name} name={sponsor.name} target="_blank" href={sponsor.link} tw="mr-8 opacity-80 hover:opacity-100">
                    <div style={{backgroundImage: `url(${sponsor.img_url})`}} tw="inline-block w-full bg-contain h-40 bg-no-repeat bg-center"></div>
                    <span>{sponsor.blurb}</span>
                  </a>
                ))}
              </div>
            </div>
            <div tw="grid grid-cols-12">
              <h2 tw={"text-xl font-medium col-span-12 mb-4 mt-10"}>Interested in being a sponsor?</h2>
              <div tw="col-span-6 text-sm">
                Developer Tea has over 10k regular listeners and has accumulated
                over 13 million unique listens since the first episode aired in
                January 2015.
                <div>
                <a
                  tw="inline-block text-center border border-brandBlue-600 bg-brandBlue-800 text-white rounded-md px-4 py-2 my-6 transition duration-500 ease-in-out select-none focus:outline-none hover:text-white hover:bg-brandBlue-600"
                  href="/contact"
                >
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
      name: "Unblocked",
      blurb: "",
      link: "http://getunblocked.com/developertea",
      img_url:
        "/images/sponsors/unblocked.svg",
    },
    {
      name: "SerpApi",
      blurb: "",
      link: "https://serpapi.com?utm_source=developer_tea",
      img_url:
        "/images/sponsors/serpapi.png",
    },
  ];

  return {
    props: {
      sponsors,
    },
  };
}
