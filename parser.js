/**
 * Created by s103915 on 19/4/18.
 */
'use strict'

exports.handler = (event, context, callback) => {
  console.log(' HTTP method (' + event.httpMethod + ')')

  const text = event.queryStringParameters.text;
  console.log('address : ' + text )

  var parse = require('./locale/en-AU')
  var parsed_address = parse(text)

  const response = {
    statusCode :200,
    body:JSON.stringify({
      message:parsed_address
    })
  }

  callback(null, response)

}