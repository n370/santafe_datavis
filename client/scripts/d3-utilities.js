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


var dependencies = ['d3'];

function Module(d3) {
  
  return { 
    
    // Los argumentos r,g,b son opcionales y accepatan 
    // valores boleanos. Si 
    // 
    // El argumento alpha es una string de texto com um
    // número entre 0 y 1 inclusive, depende de D3. 
    randomRGBAString: function(a,r,g,b) {
      
      var v = {
        r: r,
        g: g,
        b: b,
        a: a
      }

      var colorScale = d3.scale.linear()
        .domain([0, 10])
        .range([0, 255]);

      for (val in v) {
        if (val !== a) {
          var n = Math.floor((Math.random() * 10) + 1);
          val = Math.floor(colorScale(n));
        }
      }

      if (r === undefined || r === false) {
        r = v.r;
      } else {
        r = 0;
      }

      if (g === undefined || g === false) {
        g = v.g; 
      } else {
        g = 0;
      } 

      if (b === undefined || b === false) {
        b = v.b;
      } else {
        b = 0;
      }
      
      if (a) {
        var str = 'rgba('+r+','+g+','+b+','+a+')';
        console.log(str);
        return str;
      } else {
        var err = 'ERR : No alpha string value was passed as an argument';
        console.error(err);
        return null;
      }

    }

  }

}

define(dependencies, Module);