/*
{
  "authors": [
    {
      "name": {
        "first": "Dylson",
        "last": "Valente Neto",
        "alias": ["n370", "n370n370"]
      },  
      "email": ["dylson@tevincocin.com"]
    } 
  ]
}
*/

function SpaceToUnderscore(input_string) { 
  var output_string = imput_string.toLowerCase();
  output_string = output_string.split(' ');
  output_string = output_string.join('_');
  return output_string; 
}

function getCssPropertyNumber(selector, property) {
  var result = new String();
  var val = $(selector).css(property);
  for (var i = 0; i < val.length; i++ ) {
    var digit = parseInt(val[i]);
    if (digit <= 9) {
      result = result + digit;
    } 
  }
  return parseInt(result);
}