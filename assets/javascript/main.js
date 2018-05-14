
var $testInput = $("#testInput")
var starterExamplesURL = "https://raw.githubusercontent.com/zesty-io/schema-reader-ui/master/assets/examples/starters.json"

$.get(starterExamplesURL, function(data){
	var json = JSON.parse(data)
	$.each(json.examples,function(key,value){
		console.log(value)

		var html = `<a class="panel-block" href="${value.url}">
			<span class="panel-icon">
				<i class="fas fa-book" aria-hidden="true"></i>
			</span>
			${value.name}
		</a>`

		$("#starters").append(html)
	})

})

$(document).on('click',".panel-block",function(e){

	e.preventDefault()
	$('.panel-block').removeClass('is-active')
	$(this).addClass('is-active')
	$.get($(this).attr('href')).done(function(data){
		$testInput.val('')
		$testInput.val(data)
		parseYAML(data)
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
	parseYAML($(this).val())
})

function parseYAML(yaml){
	settings.data = yaml
	$.ajax(settings).done(function(data){
		$( "#testOutput" ).html( JSON.stringify(data) );
	})
}
