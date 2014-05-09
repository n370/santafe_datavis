function nodo() {
	var stdin = process.stdin;
	var stdout = process.stdout;

	if (stdin.isTTY) {
	  stdin.setRawMode(true);
	  stdin.setEncoding('utf8');
      stdin.resume();
      stdout.write('\u000A>Bienvenido\u000A');      
	} else {
	  process.exit();
	}

	stdin.on('readable', function(){

      var input = stdin.read();
      console.log(input);

    });
}
  
nodo();