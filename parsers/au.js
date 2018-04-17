/* jshint node: true */
'use strict'

var Address = require('../address')
var compiler = require('./compiler')

// initialise the street regexes
// these are the regexes for determining whether or not a string is a street
// it is important to note that they are parsed through the reStreetCleaner
// regex to become more strict
// this list has been sourced from:
// https://www.propertyassist.sa.gov.au/pa/qhelp.phtml?cmd=streettype
//
// __NOTE:__ Some of the street types have been disabled due to collisions
// with common parts of suburb names.  At some point the street parser may be
// improved to deal with these cases, but for now this has been deemed
// suitable.

//pelias street suffix
//var reSplitStreet = /^(N|NTH|NORTH|E|EST|EAST|S|STH|SOUTH|W|WST|WEST)\,$/i;
//updated street suffix
var reSplitStreet = /^(N|NTH|NORTH|E|EST|EAST|S|STH|SOUTH|W|WST|WEST|NE|NW|SE|SW|CN|CENTRAL|EX|EXTENSION|LR|LOWER|LR|UP|UPPER)\,$/i
var onlyLotAndStreet = /^\s*LOT\s*(\d*)\,?\s*[a-zA-Z]/i

module.exports = function (text, opts) {
  var address = new Address(text, opts)

  // clean the address
  address
    .clean([
      // remove trailing dots from two letter abbreviations
      function (input) {
        return input.replace(/(\w{2})\./g, '$1')
      },

      // replace ',' to ', '
      function (input) {
        return input.replace(/(\s)?\,/g, ', ')
      },

      //to cover redundent UNIT UNIT 2
      function (input) {
        return input.replace(/^\s*(APT|APARTMENT|UNIT|U|SHOP|FLAT|SUITE)\s+(APT|APARTMENT|UNIT|U|SHOP|FLAT|SUITE|LEVEL|L|KIOSK)(\,)?\s+/i, 'UNIT ')
      },

      // convert unit to a unit format
      function (input) {
        return input.replace(/^\s*(APT|APARTMENT|UNIT|U|SHOP|FLAT|SUITE)\s*(\d+\w+|\d+|\w+\d+)(\,)?\s*/i, '$2/')
      },

      function (input) {
        //need Lot number e.g Lot 1, Belmore street
        if (onlyLotAndStreet.test(input)) {
          return input
        } else {// remove Lot number
          return input.replace(/^\s*LOT\s*(\d*)\,?\s*/i, '')
        }
      }
    ])

    // split the address
    .split(/\s/)

    // // extract the unit
    // .extract('unit', [
    //   (/^(?:\#|APT|APARTMENT|U|UNIT)\s?(\d+)/),
    //   (/^(\d+)\/(.*)/)
    // ])
    // extract the unit
    .extract('unit', [
      (/^(?:\#|APT|APARTMENT|UNIT|U|SHOP|FLAT)\s*(\d+\w+|\d+|\w+\d+)(?:\/)?(.*)?/i), //for U234/12A
      (/^(\d+\w+|\d+|\w+\d+|[A-Z])\/(.*)/) //for 234/12A
    ])

    // extract the street
    .extractStreet(reSplitStreet, opts.street)
  //.extractStreet( streetRegexes, reSplitStreet );
  if (opts && opts.state) {
    address.extract('state', opts.state)
  }

  if (opts && opts.country) {
    address.extract('country', opts.country)
  }

  if (opts && opts.rePostalCode) {
    address.extract('postalcode', [opts.rePostalCode])
  }

  // take remaining unknown parts and push them
  return address.finalize()
}
