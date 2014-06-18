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
      console.log(a === undefined);
      console.log(r === undefined);
      console.log(g === undefined);
      console.log(b === undefined);

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

      if (r === undefined || r === true) {
        r = v.r;
      } else {
        r = 0;
      }

      if (g === undefined || g === true) {
        g = v.g; 
      } else {
        g = 0;
      } 

      if (b === undefined || b === true) {
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