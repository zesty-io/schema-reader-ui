
var starterExamplesURL = "https://raw.githubusercontent.com/zesty-io/schema-reader-ui/master/assets/examples/starters.json"

$.get(starterExamplesURL, function(data){
	var json = JSON.parse(data)
	$.each(json.examples,function(key,value){
		console.log(value)
	})

})


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
		$( "#testOutput" ).html( JSON.stringify(data) );
	})
})
