/* jshint node: true */
'use strict';

var compiler = require('./parsers/compiler');
var reNumeric = /^\d+$/;

/**
  ### Address
**/
function Address(text, opts) {
  if (! (this instanceof Address)) {
    return new Address(text);
  }

  this.text = text;
  this.parts = [];
}

module.exports = Address;
var proto = Address.prototype;


/**
  #### Address#_extractStreetParts(startIndex)

  This function is used to extract from the street type match
  index *back to* the street number and possibly unit number fields.

  The function will start with the street type, then also grab the previous
  field regardless of checks.  Fields will continue to be pulled in until
  fields start satisfying numeric checks.  Once positive numeric checks are
  firing, those will be brought in as building / unit numbers and once the
  start of the parts array is reached or we fall back to non-numeric fields
  then the extraction is stopped.
**/
proto._extractStreetParts = function(startIndex, splitStreet, streetRegexes, lookups) {
  //startindex is index of part array where street type is located
  var index = startIndex;
  var streetParts = [];
  var numberParts;
  var floorType;
  var floorNumber;
  var parts = this.parts;
  var streetPartsLength = (splitStreet) ? 3 : 2;
  var testFn = function() {
    return true;
  };

  var levelRegex = /^(LEVEL|FLOOR|FL|LV|LVL|LOT|L|LOBBY)/;
  var lotRegex = /LOT/;
  //B101 B101, AB111
  var unitNumberRegex = /^(\d+|\w+\d+)(\,)?$/;

  while (index >= 0 && testFn()) {
    //TEXT
    var alphaPart = isNaN(parseInt(parts[index], 10)) && !(unitNumberRegex.test(parts[index]));
    //var alphaPart = isNaN(parseInt(parts[index], 10));
    if (streetParts.length < streetPartsLength || alphaPart) {
      // add the current part to the street parts
      streetParts.unshift(parts.splice(index--, 1));
    }
    else {
      if (!numberParts) {
        numberParts = [];
      } // if
      //Sujin : if previous part is "Level" let it arrary
      if (levelRegex.test(parts[index - 1])) {
        //if address start with LOT, LOT + number will be include number part.  e.g: LOT 14 george street,
        if(lotRegex.test(parts[index - 1])){
          numberParts.unshift(parts.splice(index--, 1));
          numberParts.unshift(parts.splice(index--, 1));
        }else{
          floorNumber = parts.splice(index--, 1);
          floorType = parts.splice(index--, 1);
        }
        // parts.splice(index--, 2)
        testFn = function () {
          return true;
        }
      } else {
        // add the current part to the building parts
        numberParts.unshift(parts.splice(index--, 1));
        testFn = function () {
          //if this part is text
         var isAlpha = isNaN(parseInt(parts[index], 10)) && !(unitNumberRegex.test(parts[index]));
          //var isAlpha = isNaN(parseInt(parts[index], 10));

          // if we have building parts, then we are looking
          // for non-alpha values, otherwise alpha
          return numberParts ? (!isAlpha) : isAlpha;
        }
      }
    } // if..else
  } // while

  //here is pelias source.
  //this.number = numberParts ? numberParts.join('/') : '';
  //this.street = streetParts.join(' ').replace(/\,/g, '');

  //Raymond source
  // this.number = numberParts ? numberParts.join('/') : '';
  // this.street = streetParts.join(' ').replace(/\,/g, '');
  // let streetNameParts = streetParts.slice(0, streetParts.length - ((splitStreet) ? 2 : 1))
  // this.streetName = streetNameParts.join(' ')


  this.floor_number = floorNumber ? floorNumber.toString().replace(/\,/g, '') : '';
  this.floor_type = floorType ? floorType.toString().replace(/\,/g, '') : '';

  if (numberParts){
    this.number = numberParts ? numberParts.join(' ').replace(/\,/g, '') : '';
  }
  let streetNameIndex = streetParts.length - ((splitStreet) ? 2 : 1);
  let streetTypeIndex = streetParts.length - ((splitStreet) ? 1 : 0);
  let streetNameParts = streetParts.slice(0, streetNameIndex);
  let streetName = streetNameParts.join(' ').replace(/\,/g, '');
  let streetTypeParts = streetParts.slice(streetNameIndex, streetTypeIndex ).join(' ').replace(/\,/g, '');
  let streetTypeFullName = '';
  for (var rgxIdx = 0; rgxIdx < streetRegexes.length; rgxIdx++) {
    if (streetRegexes[rgxIdx].test(streetTypeParts)){
      streetTypeFullName = lookups[rgxIdx];
      break;
    }
  }

  let streetSuffixParts = (splitStreet) ? ' ' + streetParts.slice(streetTypeIndex, streetParts.length).join(' ').replace(/\,/g, '') : '';
  this.street_name = streetName;
  this.street_type = streetTypeFullName;
  //this.streetType = streetTypeFullName;
  this.street = streetName + ' ' + streetTypeFullName  + streetSuffixParts;


};


/**
  #### Address#clean

  The clean function is used to clean up an address string.  It is designed
  to remove any parts of the text that preven effective parsing of the
  address string.
**/
proto.clean = function(cleaners) {
  // ensure we have cleaners
  cleaners = cleaners || [];

  // apply the cleaners
  for (var ii = 0; ii < cleaners.length; ii++) {
    if (typeof cleaners[ii] == 'function') {
      this.text = cleaners[ii].call(null, this.text);
    }
    else if (cleaners[ii] instanceof RegExp) {
      this.text = this.text.replace(cleaners[ii], '');
    }
  } // for

  return this;
}

/**
 #### Address#extract(fieldName, regexes)

 The extract function is used to extract the specified field from the raw
 parts that have previously been split from the input text.  If successfully
 located then the field will be updated from the parts and that part removed
 from the parts list.
 **/
proto.extract = function (fieldName, regexes) {
  var match;
  var rgxIdx;
  var ii;
  var value;
  var lookups = [];
  var unitRegix = /^(APT|APARTMENT|UNIT|U)$/i;

  // if the regexes have been passed in as objects, then convert to an array
  if (typeof regexes == 'object' && typeof regexes.splice == 'undefined') {
    var newRegexes = [];

    // iterate through the keys in the regexes
    for (var key in regexes) {
      newRegexes[newRegexes.length] = regexes[key];
      lookups[newRegexes.length - 1] = key;
    }

    // update the regexes to point to the new regexes
    regexes = newRegexes;
  }

  // iterate over the unit regexes and test them against the various parts
  for (rgxIdx = 0; rgxIdx < regexes.length; rgxIdx++) {
    for (ii = this.parts.length; ii >= 0; ii-- ) {
      match = regexes[rgxIdx].exec(this.parts[ii]);

      // if we have a match, then process
      if (match) {
        // if we have a 2nd capture group, then replace the item with
        // the text of that group
        if (match[2]) {
          this.parts.splice(ii, 1, match[2]);
        }
        // otherwise, just remove the element
        else {
          this.parts.splice(ii, 1);
        } // if..else
        value = lookups[rgxIdx] || match[1];
        break;
      } else if (fieldName === 'state' && value === undefined) {
        var matchMultiplePart = false;
        var spacesInMatch = regexes[rgxIdx].source.split('\\s').length;
        if (spacesInMatch > 1) {
          var multiplePart = [];
          for (var partJoin = ii; partJoin > ii - spacesInMatch && partJoin >= 0; partJoin--) {
            multiplePart.push(this.parts[partJoin]);
          }
          multiplePart.reverse();
          multiplePart = multiplePart.join(' ');
          matchMultiplePart = regexes[rgxIdx].exec(multiplePart);

          if (matchMultiplePart) {
            // if we have a 2nd capture group, then replace the item with
            // the text of that group
            if (matchMultiplePart[2]) {
              this.parts.splice(ii - spacesInMatch + 1, spacesInMatch, matchMultiplePart[2]);
              ii -= spacesInMatch + 1;
            }
            //deleted by sujin. with this code NSW, ACT, WA, NT is unable to parsing
            //but if deleted, parsing error when state is full name with space (e.g : new south wales)
           //otherwise, just remove the element
           //  else {
           //    this.parts.splice(ii - spacesInMatch + 1, spacesInMatch);
           //    ii -= spacesInMatch + 1;
           //  } // if..else

            value = lookups[rgxIdx] || matchMultiplePart[1];
          }
        }
      } // if
    } // for
  } // for
  // update the field value

  // if(fieldName === 'unit' && unitRegix.test(value)){
  //   value = 'UNIT';
  // }
  //console.log("field name = " + fieldName + " value = " + value);
  this[fieldName] = value;

  return this;
};

/**
  #### Address#extractStreet

  This function is used to parse the address parts and locate any parts
  that look to be related to a street address.
**/
proto.extractStreet = function(reSplitStreet, new_regexes) {
  var reNumericesque = /^(\d*|\d*\w|\d*-\d*)$/;
  var parts = this.parts;
  var splitStreet = false;
  var lookups = [];

  // if the regexes have been passed in as objects, then convert to an array
  if (typeof new_regexes == 'object' && typeof new_regexes.splice == 'undefined') {
    var newRegexes = [];

    // iterate through the keys in the regexes
    for (var key in new_regexes) {
      newRegexes[newRegexes.length] = new_regexes[key];
      lookups[newRegexes.length - 1] = key;
    }

    // update the regexes to point to the new regexes
    new_regexes = newRegexes;
  }
  var streetRegexes = compiler(new_regexes);


  // This function is used to locate the "best" street part in an address
  // string.  It is called once a street regex has matched against a part
  // starting from the last part and working towards the front. In terms of
  // what is considered the best, we are looking for the part closest to the
  // start of the string that is not immediately prefixed by a numericesque
  // part (eg. 123, 42A, etc).
  // Sujin. It starts from end of stree part
  function locateBestStreetPart(startIndex) {
    var bestIndex = startIndex;
    var matchedStreetTypes = [];
    var matchedStreetTypesIndex = [];
    matchedStreetTypes.push(parts[startIndex]);
    matchedStreetTypesIndex.push(startIndex);

    // if the start index is less than or equal to 0, then return
    for (var ii = startIndex-1; ii >= 0; ii--) {
      // iterate over the street regexes and test them against the various parts
      for (var rgxIdx = 0; rgxIdx < streetRegexes.length; rgxIdx++) {
        // if we have a match, then process
        if (streetRegexes[rgxIdx].test(parts[ii])){
          if(parts[ii-1] && (! reNumericesque.test(parts[ii-1]))){
            matchedStreetTypes.push(parts[ii]);
            matchedStreetTypesIndex.push(ii);
            bestIndex = ii;
            break;
          }
        } // if
      } // for
    } // for

    //console.log("candidated street types: "+  matchedStreetTypes);

    if(matchedStreetTypes.length > 1 ){
      for (var j = matchedStreetTypes.length-1; j >= 0; j-- ) {
        if(matchedStreetTypes[j].indexOf(',') !== -1){
          bestIndex =  matchedStreetTypesIndex[j];
          break;
        }
      }
    }


    return bestIndex;
  } // locateBestStreetPart

  // iterate over the street regexes and test them against the various parts
  for (var partIdx = parts.length; partIdx--; ) {
    for (var rgxIdx = 0; rgxIdx < streetRegexes.length; rgxIdx++) {
      // if we have a match, then process
      // if the match is on the first part though, reject it as we
      // are probably dealing with a town name or something (e.g. St George)
      if (streetRegexes[rgxIdx].test(parts[partIdx]) && partIdx > 0) {
        var startIndex = locateBestStreetPart(partIdx);

        // if we are dealing with a split street (i.e. foo rd west) and the
        // address parts are appropriately delimited, then grab the next part
        // also
        if (reSplitStreet.test(parts[startIndex + 1])) {
          splitStreet = true;
          startIndex += 1;
        }

        this._extractStreetParts(startIndex, splitStreet, streetRegexes, lookups);
        return this;
      } // if
    } // for
  } // for

  return this;
};

/**
  #### Address#finalize

  The finalize function takes any remaining parts that have not been extracted
  as other information, and pushes those fields into a generic `regions` field.
**/
proto.finalize = function() {
  // update the regions, discarding any empty strings.
  this.regions = this.parts.join(' ').trim().split(/\,\s?/).filter(function (region) {
      return region.length;
  });
  //remove blank
  for (var i = 0; i < this.regions.length; i++) {
    this.regions[i] = this.regions[i].trim();
  }
  // reset the parts
  this.parts = [];
  return this;
};

/**
  #### Address#split

  Split the address into it's component parts, and remove any empty parts
**/
proto.split = function(separator) {
  // split the string
  var newParts = this.text.split(separator || ' ');

  this.parts = [];
  for (var ii = 0; ii < newParts.length; ii++) {
    if (newParts[ii]) {
      this.parts[this.parts.length] = newParts[ii];
    } // if
  } // for

  return this;
};

/**
  #### Address#toString

  Convert the address to a string representation
**/
proto.toString = function() {
  var output = '';

  if (this.building) {
    output += this.building + '\n';
  } // if

  if (this.street) {
    output += this.number ? this.number + ' ' : '';
    output += this.street + '\n';
  }

  output += this.regions.join(', ') + '\n';

  return output;
};
