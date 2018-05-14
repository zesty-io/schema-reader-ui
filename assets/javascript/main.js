var parseEndpoint = "https://us-central1-zesty-dev.cloudfunctions.net/schemaReader"

var settings = {
  "async": true,
  "crossDomain": true,
  "url": parseEndpoint,
  "method": "POST",
  "headers": {
    "Content-Type": "text/plain",
    "Cache-Control": "no-cache",
  }
}

$("#testInput").on('change',function(){
	console.log('running')
	var $this = $(this)
	settings.data = $this.val()

	$.ajax(settings).done(function(data){
		console.log(data)
		$( "#testOutput" ).html( JSON.stringify(data) );
	})
})
