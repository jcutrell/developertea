// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function(req, res){
  const _res = await fetch(`https://api.simplecast.com/podcasts/${process.env.PODCAST_ID}/episodes?limit=1&offset=0`, {
    headers: {
      'authorization': `Bearer ${process.env.SIMPLECAST_API_KEY}`
    }
  })
  const eps = await _res.json()
  const pick = Math.floor(Math.random() * eps.count);
  const pickres = await fetch(`https://api.simplecast.com/podcasts/${process.env.PODCAST_ID}/episodes?limit=1&offset=${pick}`, {
    headers: {
      'authorization': `Bearer ${process.env.SIMPLECAST_API_KEY}`
    }
  })

  const episodes = await pickres.json();

  if (!episodes){

    res.statusCode = 500
    res.json({ error: "Couldn't get an episode." })

  } else {

    const episode = episodes.collection[0];

    res.statusCode = 200
    res.json({ episode })
  }
}
