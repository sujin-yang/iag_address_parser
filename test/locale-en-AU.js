var test = require('tape');

function expect(expected) {
  return require('./helpers/expect')(expected, {
    locale: require('../locale/en-AU.js')
  });
}

//test fail : street number is range and street name is same street type
// test('16/113-115 LANE ST, WENTWORTHVILLE, NSW, 2145', expect({
//   number: '113-115',
//   street: 'LANE STREET',
//   regions: ['WENTWORTHVILLE'],
//   state: 'NSW',
//   postalcode: '2145'
// }));


//U 11 321 BEACONSFIELD PARADE, ST KILDA WEST, VIC, 3182, AUS

//APT 57 12 SUTTON STREET ST, NORTH MELBOURNE, VIC, 3051, AUS
//4 THE FLAT , ST MARYS, TAS, 7215, AUS
//3A MERU PL, ST CLAIR, NSW, 2759, AUS
// //5/14-22 BRODIE ST, PADDINGTON, NSW, 2021, AUS



  // test('82 ESPLANADE,TURNERS BEACH,7315,TAS', expect({
  //   number: '82',
  //   street: 'ESPLANADE'
  // }));

test('UNIT 3, LEVEL 1, 171 CITY ROAD,SOUTHBANK,3006,VIC', expect({
  unit: '3',
  floor_number : '1',
  number: '171',
  street: 'CITY ROAD',
  regions: ['SOUTHBANK']
}));

test('LEVEL 5, 338-340 PITT STREET,SYDNEY,2000,NSW', expect({
  floor_number : '5',
  number: '338-340',
  street: 'PITT STREET'
}));

test('UNIT 103C, LEVEL 1, 25 HERDSMAN PARADE,WEMBLEY,6014,WA', expect({
  unit : '103C',
  floor_number : '1',
  number: '25',
  street: 'HERDSMAN PARADE'
}));


test('82 AAA ESPLANADE,TURNERS BEACH,7315,TAS', expect({
  number: '82',
  street: 'AAA ESPLANADE'
}));


// test('UNIT 11, 28-32 KINGSWAY,CRONULLA,2230,NSW,', expect({
//   unit: 'UNIT',
//   number: '11 28-32',
//   street: 'KINGSWAY',
//   regions: ['CRONULLA']
// }));
test('UNIT Unit1 20 GEORGE STREET, HORNSBY, NSW, 2077, AUS', expect({
  unit: '1',
  number: '20',
  street: 'GEORGE STREET',
  regions: ['HORNSBY']
}));


test('UNIT LO16, 150 ABBOTSFORD ROAD,PICTON,2571,NSW,', expect({
  unit: 'LO16',
  number: '150',
  street: 'ABBOTSFORD ROAD',
  regions: ['PICTON']
}));


test('UNIT Suite 1 104 COMMONWEALTH STREET, SURRY HILLS, NSW, 2010, AUS', expect({
  unit: '1',
  number: '104',
  street: 'COMMONWEALTH STREET',
  regions: ['SURRY HILLS']
}));

test('UNIT UNIT 2 78-80 MARINE PARADE, KINGSCLIFF, NSW, 2487, AUS', expect({
  unit: '2',
  number: '78-80',
  street: 'MARINE PARADE',
  regions: ['KINGSCLIFF']
}));



test('unit1 429D ALFRED ST NORTH STREET, NEUTRAL BAY, NSW, 2089, AUS', expect({
  unit: '1',
  number: '429D',
  street: 'ALFRED ST NORTH STREET',
  regions: ['NEUTRAL BAY']
}));

test('UNIT U4029 14-15 GOULD ST, TURNER, ACT, 2612, AUS', expect({
  unit: '4029',
  number: '14-15',
  street: 'GOULD STREET',
  regions: ['TURNER']
}));

test('u4029 14-15 GOULD ST, TURNER, ACT, 2612, AUS', expect({
  unit: '4029',
  number: '14-15',
  street: 'GOULD STREET',
  regions: ['TURNER']
}));

test('U U1 14-15 GOULD ST, TURNER, ACT, 2612, AUS', expect({
  unit: '1',
  number: '14-15',
  street: 'GOULD STREET',
  regions: ['TURNER']
}));

test('B/14-15 GOULD ST, TURNER, ACT, 2612, AUS', expect({
  unit: 'B',
  number: '14-15',
  street: 'GOULD STREET',
  regions: ['TURNER']
}));

test('U 1 14 GOULD ST, TURNER, ACT, 2612, AUS', expect({
  unit: '1',
  number: '14',
  street: 'GOULD STREET',
  regions: ['TURNER']
}));

test('UNIT324 71 BEESTON ST, TENERIFFE, QLD, 4005, AUS', expect({
  unit: '324',
  number: '71',
  street: 'BEESTON STREET',
  regions: ['TENERIFFE']
}));

test('UNIT324 71A-74A BEESTON ST, TENERIFFE, QLD, 4005, AUS', expect({
  unit: '324',
  number: '71A-74A',
  street: 'BEESTON STREET',
  regions: ['TENERIFFE']
}));


test('324/71 BEESTON ST, TENERIFFE, QLD, 4005, AUS', expect({
  unit: '324',
  number: '71',
  street: 'BEESTON STREET',
  regions: ['TENERIFFE']
}));

test('unit 324 10 71 BEESTON ST, TENERIFFE, QLD, 4005, AUS', expect({
  unit: '324',
  number: '10 71',
  street: 'BEESTON STREET',
  regions: ['TENERIFFE']
}));


test('86 URALBA ST, LISMORE, NSW, 2480, AUS', expect({
  number: '86',
  street: 'URALBA STREET',
  regions: ['LISMORE']
}));

test('U 1 1 SMALL RD, BENTLEIGH, VIC, 3204, AUS', expect({
  unit: '1',
  number: '1',
  street: 'SMALL ROAD',
  regions: ['BENTLEIGH']
}));

test('2304 NEWELL HWY, COONABARABRAN, NSW, 2357, AUS', expect({
  number: '2304',
  street: 'NEWELL HIGHWAY',
  regions: ['COONABARABRAN'],
  state: 'NSW',
  postalcode: '2357'
}));

test('LOT 25 GARTRELL STREET,ROSEWORTHY, 5371, SA', expect({
  number: 'LOT 25',
  street: 'GARTRELL STREET',
  regions: ['ROSEWORTHY'],
  state: 'SA',
  postalcode: '5371'
}));




test('UNIT G8, 19 OGILVIE ROAD,MOUNT PLEASANT,6153,WA,', expect({
  unit: 'G8',
  number: '19',
  street: 'OGILVIE ROAD',
  regions: ['MOUNT PLEASANT'],
}));

test('UNIT 609, LEVEL 6, 480 COLLINS STREET, MELBOURNE, 3000, VIC', expect({
  unit: '609',
  floor_number: '6',
  number: '480',
  street: 'COLLINS STREET'
}));


test('705/220 MONA ROAD WAY, ST IVES, NSW, 2075', expect({
  number: '220',
  street: 'MONA ROAD WAY',
  regions: ['ST IVES'],
  state: 'NSW',
  postalcode: '2075'
}));

test('LOT 1 1 BEACHSIDE CT ,SHELLY BEACH, QLD, 4551', expect({
  number: '1',
  street: 'BEACHSIDE COURT',
  regions: ['SHELLY BEACH'],
  state: 'QLD',
  postalcode: '4551'
}));

test('705/220-221 MONA ROAD ST, IVES , NSW, 2075', expect({
  unit:'705',
  number: '220-221',
  street: 'MONA ROAD STREET',
  regions: ['IVES'],
  state: 'NSW',
  postalcode: '2075'
}));

test('705/220 MONA ROAD, ST IVES, NSW, 2075', expect({
  number: '220',
  street: 'MONA ROAD',
  regions: ['ST IVES'],
  state: 'NSW',
  postalcode: '2075'
}));

test('705/220 MONA ROAD ST IVES NSW 2075', expect({
  number: '220',
  street: 'MONA ROAD',
  regions: ['ST IVES'],
  state: 'NSW',
  postalcode: '2075'
}));

test('705/220 MONA ROAD, GREEN POINT, NSW, 2075', expect({
  number: '220',
  street: 'MONA ROAD',
  regions: ['GREEN POINT'],
  state: 'NSW',
  postalcode: '2075'
}));


test('LOT 39 4 PAUL AVE, ST IVES, NSW, 2075', expect({
  number: '4',
  street: 'PAUL AVENUE',
  regions: ['ST IVES'],
  state: 'NSW',
  postalcode: '2075'
}));

test('LOT 39 PAUL AVE, ST IVES, NSW, 2075', expect({
  number:'LOT 39',
  street: 'PAUL AVENUE',
  state: 'NSW',
  postalcode: '2075'
}));

test('4 ASHFORD GROVE, CLAIR, NSW, 2759', expect({
  number: '4',
  street: 'ASHFORD GROVE',
  regions: ['CLAIR'],
  state: 'NSW',
  postalcode: '2759'
}));

test('3 BRUNO ST, KANGAROO FLAT, VIC, 3555', expect({
  number: '3',
  street: 'BRUNO STREET',
  regions: ['KANGAROO FLAT'],
  state: 'VIC',
  postalcode: '3555'
}));

test('56 BENVENUE RD, ST LEONARDS, TAS, 7250', expect({
  number: '56',
  street: 'BENVENUE ROAD',
  regions: ['ST LEONARDS'],
  state: 'TAS',
  postalcode: '7250'
}));

test('4 THE FLAT, ST MARYS, TAS, 7215', expect({
  number: '4',
  street: 'THE FLAT',
  regions: ['ST MARYS'],
  state: 'TAS',
  postalcode: '7215'
}));

test('16/113-115 LANE ST, WENTWORTHVILLE, NSW, 2145', expect({
  number: '113-115',
  street: 'LANE STREET',
  regions: ['WENTWORTHVILLE'],
  state: 'NSW',
  postalcode: '2145'
}));

test('16/113-115 LANE ST, WENTWORTHVILLE, NSW, 2145', expect({
  number: '113-115',
  street: 'LANE STREET',
  regions: ['WENTWORTHVILLE'],
  state: 'NSW',
  postalcode: '2145'
}));



test('5/14-22 BRODIE ST, PADDINGTON, NSW, 2021', expect({
  number: '14-22',
  street: 'BRODIE STREET',
  regions: ['PADDINGTON'],
  state: 'NSW',
  postalcode: '2021'
}));

test('16/113 LANE ST, ST LIVES, NSW, 2145', expect({
  unit: '16',
  number: '113',
  street: 'LANE STREET',
  regions: ['ST LIVES'],
  state: 'NSW',
  postalcode: '2145'
}));

test('3A MERU PL, ST CLAIR, NSW, 2759', expect({
  number: '3A',
  street: 'MERU PLACE',
  regions: ['ST CLAIR'],
  state: 'NSW',
  postalcode: '2759'
}));

test('56 BENVENUE RD, ST LEONARDS, TAS, 7250', expect({
  number: '56',
  street: 'BENVENUE ROAD',
  regions: ['ST LEONARDS'],
  state: 'TAS',
  postalcode: '7250'
}));


test('5/14-22 BRODIE ST, PADDINGTON, NSW, 2021', expect({
  number: '14-22',
  street: 'BRODIE STREET',
  regions: ['PADDINGTON'],
  state: 'NSW',
  postalcode: '2021'
}));


test('6/12 BARRINGTON RD, TERRIGAL, QLD 2112', expect({
  number: '12',
  street: 'BARRINGTON ROAD',
  regions: ['TERRIGAL'],
  state: 'QLD',
  postalcode: '2112'
}));

test('78a BELMORE ST, RYDE, NSW, 2112', expect({
  number: '78a',
  street: 'BELMORE STREET',
  regions: ['RYDE'],
  state: 'NSW',
  postalcode: '2112'
}));


test('2649 Logan Road Eight Mile Point QLD, 4113', expect({
  number: '2649',
  street: 'Logan ROAD',
  state: 'QLD',
  regions: ['Eight Mile Point'],
  postalcode: '4113'
}));

test('1 Queen Street, Brisbane 4000', expect({
  "number": '1',
  "street": "Queen STREET",
  "regions": ["Brisbane"],
  postalcode: '4000'
}));

test('754 Robinson Rd West, Aspley, QLD, 4035', expect({
  number: '754',
  street: 'Robinson ROAD West',
  state: 'QLD',
  regions: ['Aspley'],
  postalcode: '4035'
}));

test('Sydney 2000', expect({
  "regions": ["Sydney"],
  postalcode: '2000'
}));

test('Perth', expect({
  "regions": ["Perth"]
}));

test('1/135 Ferny Way, Ferny Grove 4054', expect({
  "unit": '1',
  "number": '135',
  "street": "Ferny WAY",
  "regions": ["Ferny Grove"],
  postalcode: '4054'
}));

// test('Eight Mile Point 4113', expect({
//   "regions": ["Eight Mile Point"],
//   postalcode: '4113'
// }));

test('8/437 St Kilda Rd Melbourne, VIC ', expect({
  "unit": '8',
  "number": '437',
  "street": "St Kilda ROAD",
  "state": "VIC",
  "regions": ["Melbourne"]
}));

test('Shop 8, 431 St Kilda Rd Melbourne', expect({
  "unit": '8',
  "number": '431',
  "street": "St Kilda ROAD",
  "regions": ["Melbourne"]
}));

// Check behavior with a failing address
test('BOOM', expect({
  "regions": ["BOOM"],
  postalcode: undefined
}));

// 9999 is not a valid Australian postal code.
// If we don't recognize the postal code, it goes in the region field.
test('Eight Mile Plains 9999', expect({
  "regions": ["Eight Mile Plains 9999"],
  postalcode: undefined
}));

