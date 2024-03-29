//insert overlay Button

var buttonAdded = false;
var buttonAdded2 = false;
const config = { childList: true, subtree: true };

const observer = new MutationObserver( addBtn );
observer.observe(document.body, config);

//document.addEventListener('click',function() { observer.observe(document.body, config) } );

function addBtn() {
	
	if (document.getElementsByClassName('GNKVYU1FP')[1] && !buttonAdded) {
		//observer.disconnect();
		var dateRow = document.getElementsByClassName('GNKVYU1FP')[1];
		var div = document.createElement('div');
		div.className = 'GNKVYU1KP';
		var btn = document.createElement('button');
		btn.textContent = 'Copy';
		btn.id = 'timetable-overlay-copy-button';
		btn.className = 'gwt-Button';
		div.appendChild( btn );
		dateRow.appendChild( div );
		btn.addEventListener( 'click', saveView );
		
		div = document.createElement('div');
		div.className = 'GNKVYU1KP';
		btn = document.createElement('button');
		btn.textContent = 'Paste';
		btn.className = 'gwt-Button';
		btn.id = 'timetable-overlay-copy-button';
		div.appendChild( btn );
		dateRow.appendChild( div );
		btn.addEventListener( 'click', pasteView );
		buttonAdded = true;
	}
	
	if (document.getElementsByClassName('gwt-PopupPanelGlass')[0] && !buttonAdded2) {
		var sluitButton = document.getElementsByClassName('GNKVYU1HO')[0];
		var btn = document.createElement('button');
		var btnOuterDiv = document.createElement('div');
		var btnInnerDiv = document.createElement('div');
		let txt = document.createTextNode('&nbsp;');
		
		sluitButton.addEventListener('click', resetCopyBtn );
		btn.textContent = 'Copy';
		btn.className = 'gwt-Button';
		btnOuterDiv.className = 'GNKVYU1HO';
		
		sluitButton.parentElement.appendChild( btnOuterDiv );
		
		btnOuterDiv.appendChild( btnInnerDiv );
		btnInnerDiv.appendChild( btn );
		btnInnerDiv.appendChild( new Text( '\u00A0' ) );
		
		btn.addEventListener( 'click', copyClass );
		buttonAdded2 = true;
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
	let outString = '';
	
	let lesnaam = document.getElementsByClassName('gwt-Label GNKVYU1HR')[0].textContent; // lesnaam
	let datum = document.getElementsByClassName('GNKVYU1DS')[0].parentNode.firstChild.textContent; //datum en tijd
	let tijd = datum.slice( datum.length-13, datum.length );
	let list = document.getElementsByClassName('GNKVYU1DS')[0].getElementsByClassName('GNKVYU1BS');
	for (let i = 0; i < list.length; i++) {
		if (i==3) { // teachers 
			let tmpList = list[i].lastChild.getElementsByClassName('gwt-Label');
			data[i] = tmpList[0].textContent;
			for (let j = 1; j < tmpList.length; j++) {
				data[i] += ', ' + tmpList[j].textContent;
			}			
		} else if (i==4) { // groups are split in own divs.
			let tmpList = list[i].lastChild.getElementsByClassName('gwt-HTML');
			tmpList[0] ? data[i] = tmpList[0].textContent : data[i] = '';
			for (let j = 1; j < tmpList.length; j++) {
				data[i] += ', ' + tmpList[j].textContent;
			}
		}
		else {
			data[i] = list[i].lastChild.textContent; // vakcode, vak, locatie, docent, groep, id
		}
		
	}
	data[6] = lesnaam;
	data[7] = datum.slice(0, datum.length-13);
	data[8] = tijd;
	// console.log(data);
	navigator.clipboard.writeText( data[3] +'\t'+ data[5] +'\t'+ lesnaam +'\t'+ data[4] +'\t'+ datum.slice(0, datum.length-13) + '\t' + tijd );
	chrome.storage.local.set( {'classdata':data } );
}