document.addEventListener( 'DOMContentLoaded', onDOMContentLoaded, false );

function onDOMContentLoaded() {
	var open_options = document.getElementById( 'mttqol-open-options' );
	open_options.addEventListener( 'click', onOpenOptionsClick, false );
}

function onOpenOptionsClick( event ) {
	event.preventDefault();
	chrome.runtime.openOptionsPage();
}
