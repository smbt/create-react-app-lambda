// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311
import {APIGatewayEvent, Context, Callback} from 'aws-lambda'

import axios from 'axios'

export async function handler(event: APIGatewayEvent, context: Context) {
    console.log('dad joke')
    try {
        const response = await axios.get('https://icanhazdadjoke.com', {headers: {Accept: 'application/json'}})
        const data = response.data
        return {
            statusCode: 200,
            body: JSON.stringify({msg: data.joke}),
        }
    } catch (err) {
        console.log('err in dad joke')
        console.log(err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({msg: err.message}), // Could be a custom message or object i.e. JSON.stringify(err)
        }
    }
}
