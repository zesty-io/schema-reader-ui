// setup the YAML editor
var editor = ace.edit("testInput");
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/yaml");



var $testInput = $("#testInput")
var examplesURL = "https://raw.githubusercontent.com/zesty-io/schema-reader-ui/master/assets/examples/examples.json"


// build the dynamic content for examples
$.get(examplesURL, function(data){
	var i = 0
	$.each(JSON.parse(data).tabs,function(key,value){
		var $name = value.name
		var active = i == 0 ? `is-active` : ``
		var tab = `<a class="exampleTab ${active}" data-tab="${$name}">${$name}</a>`
		var panel = `<div class="panel-content example-content ${active}"  id="${$name}">`
		$('#exampleTabs').append(tab)
		$('#examplePanel').append(panel)
		i++

		$.get(value.url,function(data2){

			$.each(JSON.parse(data2).examples,function(key,value){
				var html = `<a class="panel-block panel-block-example" href="${value.url}">
					<span class="panel-icon">
						<i class="fas fa-book" aria-hidden="true"></i>
					</span>
					${value.name}
				</a>`

				$(`#${$name}`).append(html)
			})
		})

	})

})

// example UI Controls
// panel nav
$(document).on('click',"a.exampleTab",function(e){
	e.preventDefault()
	var $this = $(this)
	var name = $this.attr('data-tab')
	$('a.exampleTab').removeClass('is-active')
	$('.panel-content').removeClass('is-active')
	$(`#${name}`).addClass('is-active')
	$this.addClass('is-active')
})
// exmaple panel content
$(document).on('click',".panel-block-example",function(e){
	e.preventDefault()
	var $this = $(this)
	$('.panel-block').removeClass('is-active')
	$(this).addClass('is-active')
	$.get($this.attr('href')).done(function(data){
		$testInput.val('')
		$testInput.val(data)
		editor.setValue("");
		editor.setValue(data);
		parseYAML(data)
	})
})


// testing against the yaml scema reader endpoint
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

$("#submit").on('click',function(e){
	e.preventDefault()
	parseYAML(editor.getValue())
})


function parseYAML(yaml){
	settings.data = yaml
	$.ajax(settings).done(function(data){
			if(data.valid == true){
				var html = `<div class="notification is-success">
					<button class="delete"></button>
						<h2><strong>Valid ${data.schema.Type} schema file</strong></h2><br>
						<ul>
							<li><strong>Name:</strong> ${data.schema.Name}</li>
							<li><strong>Author:</strong> ${data.author}</li>

						</ul>
					</div>`
			} else {
				// there is an error, loop through the,
				var html = '<div class="notification is-danger"><button class="delete"></button>'
				$.each(data.errors,function(key,value){
					console.log(value)
					// move cursor position
					if( value.hasOwnProperty("position") ) {
						editor.selection.moveTo(value.position.line, value.position.column)
					}
					// append error message
					html += `<h3><strong>Error:</strong> ${value.type}</h3>
									<br><p>${value.message}</p>`
				})
				html += `</div>`
			}
			$( "#testOutput" ).html(html)

	})
}


$(document).on('click','.notification .delete', function(){
	$(this).parent().remove();
})
