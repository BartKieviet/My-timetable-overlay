//insert overlay Button

const config = { childList: true, subtree: true };

const observer = new MutationObserver( addBtn );
observer.observe(document.body, config);

function addBtn() {
	
	if (document.getElementsByClassName('GNKVYU1FP')[1]) {
		observer.disconnect();
		var dateRow = document.getElementsByClassName('GNKVYU1FP')[1];
		var div = document.createElement('div');
		div.className = 'GNKVYU1KP';
		var btn = document.createElement('button');
		btn.textContent = 'Copy';
		btn.id = 'timetable-overlay-copy-button';
		div.appendChild( btn );
		dateRow.appendChild( div );
		btn.addEventListener( 'click', saveView );
		
		div = document.createElement('div');
		div.className = 'GNKVYU1KP';
		btn = document.createElement('button');
		btn.textContent = 'Paste';
		btn.id = 'timetable-overlay-copy-button';
		div.appendChild( btn );
		dateRow.appendChild( div );
		btn.addEventListener( 'click', pasteView );
	}
}

function saveView() {
	var data = {};
	data.day2 = document.getElementsByClassName('wc-day-column day-2')[1].firstChild.innerHTML; //they have 2 'day2' id's. Naughty naughty.
	for (let i = 3; i<7; i++) {
		data['day'+i] = document.getElementById('day'+i).innerHTML;
	}
	// console.log( data );
	chrome.storage.local.set( {'ttdata':data } );
}

function pasteView() {
	chrome.storage.local.get(['ttdata'], function(result) {
		// console.log( result.ttdata );
		document.getElementsByClassName('wc-day-column day-2')[1].firstChild.innerHTML += result.ttdata.day2.replaceAll('style="', 'style="Opacity:50%;') //they have 2 'day2' id's. Naughty naughty.
		for (let i = 3; i<7; i++) {		
			document.getElementById('day'+i).innerHTML += result.ttdata['day'+i].replaceAll('style="', 'style="Opacity:50%;');
		}	
		} );
}

//GNKVYU1NQ