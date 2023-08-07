require('dotenv').config()

const Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE
)

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  if (id) {
    try {
      // let find = await (await base('Projects').find(id))._rawJson
      let product = await base('Projects').find(id)

      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        }
      }
      product = { id: product._rawJson.id, ...product._rawJson.fields }

      return {
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server Error`,
      }
    }
  }
  return {
    statusCode: 400,
    body: 'Please provide product id',
  }
}
