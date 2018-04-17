# Address Parser for Australia Address


## Example Usage

The following is a simple example of how address it can be used:

```js
var addressit = require('addressit');

// parse a made up address, with some slightly tricky parts
var address = addressit('Shop 8, 431 St Kilda Rd Melbourne');
```

The `address` object would now contain the following information:

```
{ text: '8/431 ST KILDA RD MELBOURNE',
  parts: [],
  unit: 8,
  country: undefined,
  number: 431,
  street: 'ST KILDA RD',
  regions: [ 'MELBOURNE' ] }
```

For more examples, see the tests.

