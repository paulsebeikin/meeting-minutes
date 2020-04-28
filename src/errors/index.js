const fs    = require('fs');
const path  = require('path');

const errors = fs.readdirSync(__dirname);
const basename = path.basename(__filename);

errors.filter(file => {
  return file !== basename;
})
.forEach( file => {
  var n = file.substring(0, file.indexOf('.'));
  module.exports[n] = require(`./${ n }`);
});