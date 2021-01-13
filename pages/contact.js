import Head from 'next/head'
import Page from '../components/Page'
import tw, {styled} from 'twin.macro';

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Developer Tea, Hot and Fresh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="contact">
            <div className="container">
                <div className="col-sm-12 col-sm-offset-2 col-lg-6 col-lg-offset-5">
                    <h1 tw={"text-4xl mb-3"}>Contact Me (Jonathan).</h1>
                    <p>I'd love to meet you, or hear what you have to say. Got an idea for the show? Want to grab a coffee? Drop me a line here. This will come directly to me.</p>
                    <form action="//formspree.io/developertea@gmail.com" method="POST">
                        <div tw="py-2">
                          <input type="text" name="name" placeholder="Name" tw={"rounded-md"} /> 
                        </div>
                        <div tw="py-2">
                          <input type="email" name="_replyto" required placeholder="Your best email" tw={"rounded-md"} />
                        </div>
                        <div tw="py-2">
                          <label for="reason" tw={"block py-2"}>What would you like to talk about?</label>
                          <select name="reason" tw={"rounded-md"}>
                            <option value="question">I have a question for you.</option>
                            <option value="suggestion">I have a suggestion for you.</option>
                            <option value="sponsor">I'd like to know more about sponsoring Developer Tea.</option>
                            <option value="hello">I just want to say hi.</option>
                          </select>
                        </div>
                        <input type="hidden" name="_next" value="http://developertea.com/contact/success" />
                        <div className="form-control">
                            <textarea placeholder="Your message here..." name="message" cols="30" rows="10" tw={"rounded-md"}></textarea>
                        </div>
                        <div className="form-control actions">
                            <input type="submit" tw={"px-5 py-3 bg-blue-700 hover:bg-blue-800 hover:cursor-pointer rounded-md text-white"} value="Send" />
                        </div>
                    </form>
                </div>
            </div>
        </section>

      </main>
    </Page>
  )
}
