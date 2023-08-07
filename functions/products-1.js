const dotenv = require('dotenv')
dotenv.config()

const Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appSfAtTYrxIZocp9'
)

exports.handler = async function () {
  try {
    const response = await base('Projects')
      .select({
        view: 'Grid view',
      })
      .all()

    const products = response.map((product) => {
      const { id, _rawJson } = product
      const {
        name,
        featured,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        images,
      } = _rawJson.fields
      const { url } = images[0]
      return {
        id,
        name,
        featured,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        image: url,
      }
    })

    // console.log('#######')
    // console.log(products)
    // console.log('#######')

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: 'There was an error',
    }
  }
}
