// -*- js3-indent-level: 8; js3-indent-tabs-mode: t -*-

document.addEventListener( 'DOMContentLoaded', onDOMContentLoaded, false );

function onDOMContentLoaded() {
	console.log('test');
	var version_span = document.getElementById( 'mttqol-version' );

	version_span.textContent = chrome.runtime.getManifest().version;

	var IDLIST = ['mttqol-opleiding'];

	chrome.storage.local.get( 'mttqolOptions', setupOptions );
	
	IDLIST.forEach( changeSave );
}

function wire( idCheck, idText ) {
	document.getElementById( idCheck ).addEventListener( 'change', function() {
		document.getElementById( idText ).disabled = !document.getElementById( idCheck ).checked
	} );
}

function changeSave( id ) {
	document.getElementById( id ).addEventListener( 'change', saveOptions );
}

function saveOptions() {
	let Options = {};
	Options[ 'opleiding' ] = document.getElementById('mttqol-opleiding').value;
	
	let toSave = {};
	toSave[ 'mttqolOptions' ] = Options;
	chrome.storage.local.set( toSave );
}

function setupOptions( Options ) {
	Options = Options[ 'mttqolOptions' ];
	console.log(Options);
	if ( Object.keys( Options ).length === 0 ) {
		saveOptions();
	} else {
		for (var key in Options) {
			document.getElementById( 'mttqol-' + key ).value = Options[ key ];
		}
	}
}