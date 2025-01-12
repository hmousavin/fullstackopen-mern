const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  console.warn(`⛔️ the REDIS_URL is invalid!! we have ${REDIS_URL} as the url ⛔️`)
  
  getAsync = async (key) => await Number(redis.getAsync(key)) || 0;
  setAsync = async (key, value) => await redis.setAsync(key, value);
} else {
  console.log(`💪 here is the REDIS_URL: ${REDIS_URL} 💪`)

  const client = redis.createClient({
    url: REDIS_URL
  })
  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)    

  client.on('connect', () => {
    console.log('✅ Connected to Redis successfully!');
  });
  client.on('error', (err) => {
    console.error(`🚫 Redis Client Error: ${err} 🚫`);
  });
}

module.exports = {
  getAsync,
  setAsync
}