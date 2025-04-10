//insert overlay Button

var buttonAdded = false;
var buttonAdded2 = false;
const config = { childList: true, subtree: true };

const observer = new MutationObserver( addBtn );
observer.observe(document.body, config);

//document.addEventListener('click',function() { observer.observe(document.body, config) } );

function addBtn() {
	
	if (document.getElementsByClassName('GNKVYU1HP')[1] && !buttonAdded) { // weeknumber
		// observer.disconnect();
		// console.log('go');
		var dateRow = document.getElementsByClassName('GNKVYU1HP')[1];
		var div = document.createElement('div');
		div.className = 'GNKVYU1MP';
		var btn = document.createElement('button');
		btn.textContent = 'Copy';
		btn.id = 'mttqol-overlay-copy-button';
		btn.className = 'gwt-Button';
		div.appendChild( btn );
		dateRow.appendChild( div );
		btn.addEventListener( 'click', saveView );
		
		div = document.createElement('div');
		div.className = 'GNKVYU1MP';
		btn = document.createElement('button');
		btn.textContent = 'Paste';
		btn.className = 'gwt-Button';
		btn.id = 'mttqol-overlay-copy-button';
		div.appendChild( btn );
		dateRow.appendChild( div );
		btn.addEventListener( 'click', pasteView );
		buttonAdded = true;
	}
	
	if (document.getElementsByClassName('gwt-PopupPanelGlass')[0] && !buttonAdded2) {
		var sluitButton = document.getElementsByClassName('GNKVYU1JO')[0];

		sluitButton.addEventListener('click', resetCopyBtn );
		
		var btn = document.createElement('button');		
		btn.textContent = 'Copy';
		btn.id = 'mttqol-copyclass';		
		btn.addEventListener( 'click', copyClass );
		formatBtn( btn );
		buttonAdded2 = true;
		
		var btnAutoPaste = document.createElement('button');
		btnAutoPaste.textContent = 'Auto TD';
		btnAutoPaste.id = 'mttqol-autotd';
		btnAutoPaste.addEventListener( 'click', copyClass );
		formatBtn( btnAutoPaste );


		function formatBtn( buttonElement ) {
			let btnOuterDiv = document.createElement('div');
			let btnInnerDiv = document.createElement('div');
			
			buttonElement.className = 'gwt-Button';
			btnOuterDiv.className = 'GNKVYU1JO';
			btnOuterDiv.appendChild( btnInnerDiv );
			btnInnerDiv.appendChild( buttonElement );
			btnInnerDiv.appendChild( new Text( '\u00A0' ) );
			sluitButton.parentElement.appendChild( btnOuterDiv );
		}
	}
	
}

function saveView() {
	var data = {};
	data.day2 = document.getElementsByClassName('wc-day-column day-2')[1].firstChild.innerHTML; //they have 2 'day2' id's. Naughty naughty.
	for (let i = 3; i<7; i++) {
		data['day'+i] = document.getElementById('day'+i).innerHTML;
	}
	chrome.storage.local.set( {'ttdata':data } );
}

function pasteView() {
	chrome.storage.local.get(['ttdata'], function(result) {
		document.getElementsByClassName('wc-day-column day-2')[1].firstChild.innerHTML += result.ttdata.day2.replaceAll('style="', 'style="Opacity:50%;') //they have 2 'day2' id's. Naughty naughty.
		for (let i = 3; i<7; i++) {		
			document.getElementById('day'+i).innerHTML += result.ttdata['day'+i].replaceAll('style="', 'style="Opacity:50%;');
		}	
		} );
}

function resetCopyBtn() {
	buttonAdded2 = false;
}

function copyClass() {
	
	let data = [];
	
	let lesnaam = document.getElementsByClassName('gwt-Label GNKVYU1JR')[0].textContent; // lesnaam
	let datum = document.getElementsByClassName('gwt-Label GNKVYU1AT')[0].textContent; //datum
	let tijd = document.getElementsByClassName('gwt-Label GNKVYU1BT')[0].textContent; //tijd
	let list = document.getElementsByClassName('GNKVYU1FS')[0].getElementsByClassName('GNKVYU1DS');
	
	for (let i = 0; i < list.length; i++) {
		let tmpList = [];
		switch( list[i].firstElementChild.textContent ) {
			// case 'Modulecode': 
			// case 'Module':
			// case 'Locatie(s)':
			case 'Docent(en)':
				tmpList = list[i].lastChild.getElementsByClassName('gwt-Label');
				tmpList[0] ? data[i] = tmpList[0].textContent : data[i] = '';
				for (let j = 1; j < tmpList.length; j++) {
					data[i] += ', ' + tmpList[j].textContent;
				}
				break;
			case 'Groep(en)': // groups are split in own divs.
				tmpList = list[i].lastChild.getElementsByClassName('gwt-HTML');
				tmpList[0] ? data[i] = tmpList[0].textContent : data[i] = '';
				for (let j = 1; j < tmpList.length; j++) {
					data[i] += ', ' + tmpList[j].textContent;
				}
				break;
			// case 'ID':
			default: 
				data[i] = list[i].lastChild.textContent;
		}		
	}
	data[6] = lesnaam;
	data[7] = datum;
	data[8] = tijd;

	navigator.clipboard.writeText( data[3] +'\t'+ data[5] +'\t'+ lesnaam +'\t'+ data[4] +'\t'+ datum + '\t' + tijd );
	
	if ( this.id == 'mttqol-autotd' ) {
		chrome.storage.local.set( {'classdata':data, 'autotd':true } );
		window.open("https://hhs.topdesk.net/tas/public/ssp/content/serviceflow?unid=d62326f88a0b4d80a1a4717b47ae3bc4");
	} else {
		chrome.storage.local.set( {'classdata':data, 'autotd':false } );
	}
}