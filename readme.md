Visualizador de Datos del Ministerio de Justicia de Santa Fe
------------------------------------------------------------

### IPEC — Instituto Provincial de Estadistica y Censos
#### Centro Estadistico de Servicios 
Santa Fe, La Capital 2014

#### Presentación
El presente proyecto es una iniciativa del Departamento de Teleproceso y Telecomunicaciones con objetivo de atualizar las herramientas digitales de la província para visualización de datos estadísticos.

#### Herramientas
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [HTTP](http://www.w3.org/Protocols/rfc2616/rfc2616.html), [Google Fonts](http://www.google.com/fonts), [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [jQuery](http://jquery.com/), [D3](http://d3js.org/), [HTML](http://www.w3.org/html/wg/drafts/html/master/), [CSS](http://www.w3.org/TR/css-2010/), [JSON](http://json.org/), [GeoJSON](http://geojson.org/), [TopoJSON](http://github.com/mbostock/topojson), [Bower](http://bower.io/), [Mapshaper](https://github.com/mbloch/mapshaper), [QGIS](http://www.qgis.org/). 

#### Rodando
Instale [Git](http://git-scm.com/).  
Instale [Node.js](http://nodejs.org/).  
Cloná el repositório.

	$ git clone https://github.com/n370/santafe_datavis.git
	$ cd santafe_datavis

Instale [Bower](http://bower.io/) y en seguida las dependencias deste proyecto.

	$ bower install

Cargá un servidor HTTP para los archivos estáticos.

	$ cd client
    $ python -m SimpleHTTPServer 1337

o
        
    $ cd client
	$ php -S localhost:1337

Visitá [http://localhost:1337/main.html](http://localhost:1337/main.html) en tu navegador.

#### Contribuyendo
Estamos contentos por que querés contribuir, pero atención al estilo del código:

- 80 columnas.
- Indentación con 2 espacios. No utilice tabs.
- Primá por la legibilidad.

Instale [Git](http://git-scm.com/).  
Instale [Node.js](http://nodejs.org/).  
Forkeá este repositório.  
Creá una rama en tu repositorio local:

	$ git checkout -b mi_rama

Instale [Bower](http://bower.io/) y en seguida las dependencias deste proyecto.

	$ bower install

Si necesario, instale nuevas dependencias.

	$ bower install --save bower_component

Seguí con unas modificaciones!

Commitá estos cambios:

	$ git commit -am 'Un mensage relevante. Cuanto más mejor, pero no más de 70 columnas por línea.'

Hacé un `push` de tu rama:

	$ git push origin mi_rama

Creá un Pull Request acá.