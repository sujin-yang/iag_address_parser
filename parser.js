/**
 * Created by s103915 on 19/4/18.
 */
'use strict'

exports.handler = (event, context, callback) => {
  //console.log(' HTTP method (' + event.httpMethod + ')')
  console.log(' event : ' + JSON.stringify(event, null, 2))
  var text = event.text
  var abbreviation = event.abbreviation

  if (text == undefined) {
    text = event.queryStringParameters.text
  }
  if (abbreviation == undefined) {
    abbreviation = event.queryStringParameters.abbreviation
  }

  console.log('address : ' + text)
  console.log('abbreviation : ' + abbreviation)

  var parse = require('./locale/en-AU')
  var parsed_address = parse(text)

  const response = {
    statusCode: 200,
    body: JSON.stringify(parsed_address),
    message: JSON.stringify(parsed_address),
    abbreviation: abbreviation
  }

  callback(null, response)

}