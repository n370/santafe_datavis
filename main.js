/*
{
  "authors": [
    {
      "name": {
        "first": "Dylson",
        "last": "Valente Neto",
        "alias": ["n370", "n370n370"]
      },  
      "email": ["dvalenteneto@santafe.gov.ar"]
    } 
  ],
  "contributors": [    
    {
      "name": {
        "first": "Dylson",
        "last": "Valente Neto",
        "alias": ["n370", "n370n370"]
      },  
      "email": ["dvalenteneto@santafe.gov.ar"]
    } 
  ] 
}
*/

function nodo() {
  var stdin = process.stdin;
  var stdout = process.stdout;
  var input;
  var input_log;

  var mode = {
    command: {
      salir: 'salir',
      nuevo: 'nuevo',  
    },
    text: {
      
    }
  }

  if (stdin.isTTY) {

    stdin.setRawMode(true); 
    stdin.on('readable', function(){
      input = stdin.read();
      if (input !== null) {

        input = input.toString();
        input_log = input_log + input;
        
        if (input === '\u000D') {
          stdout.write('\u000A'); 
        }
        
        if (input === '\u003A') {
          stdout.write('\u003A');

          // enter command mode
        }

        if (input_log.substring(input_log.length - 7, input_log.length) === ':salir\r') {
            process.exit();
        }
      
      } else {
        // When this script starts running, a [Null] 
        // chunk of data is pushed into the readable 
        // stream firing a readable event. Allowing
        // also that realdable stream to be read.
        //
        // Thus the following.
        stdout.write('\u000A> Bienvenido\u000A\u000A> ');
      }
    });

  } else {

    process.exit();

  }
}
  
nodo();