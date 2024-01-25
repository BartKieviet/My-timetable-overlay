if (document.URL.indexOf('d62326f88a0b4d80a1a4717b47ae3bc4')) {
	
	div = document.getElementById('xfgFormSsdform147f76c6e71847d1803beb82fe346e2e'); // mag niet in het form, anders word hij verstuurd door de button de drukken.
	if (div) { 
		var btn = document.createElement('button');
		btn.textContent = 'Paste timetable data';
		btn.id = 'timetable-overlay-copy-button';
		btn.className = 'gwt-Button';
		div.parentNode.insertBefore( btn, div );
		btn.addEventListener( 'click', getData );
	}
}

function getData() {
	chrome.storage.local.get(['classdata'], pasteRosterData);
}

function pasteRosterData( data ) {
	let classdata = data['classdata']; // Modulecode, modulenaam, Lokaal, Docent, Klas, ID, Lesnaam, Datum
	//
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_searchlist2_searchlist_searchlist').value = 'TN'; // opleidingscode
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_subcategory_subcategory_subcategory').value = 'Overig'; // reden roosterwijziging
	
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_description_description_description').value = classdata[6]; 
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion3_openquestion_openquestion').value = classdata[5]; // ID
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion4_openquestion_openquestion').value = classdata[1];  // module
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion5_openquestion_openquestion').value = classdata[6]; // lesnaam
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion6_openquestion_openquestion').value = classdata[4]; // groep
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion7_openquestion_openquestion').value = classdata[3]; // docent
}