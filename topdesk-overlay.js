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
	chrome.storage.local.get(['classdata','mttqolOptions'], pasteRosterData); //
}

function pasteRosterData( data ) {
	let classdata = data['classdata']; // Modulecode, modulenaam, Lokaal, Docent, Klas, ID, Lesnaam, Datum
	let opleiding = '';
	data['mttqolOptions'] ? opleiding = data['mttqolOptions'].opleiding : null;

	
	let maanden = { 
		januari: 0, 
		februari: 1, 
		maart : 2,
		april : 3,
		mei : 4,
		juni : 5,
		juli : 6,
		augustus : 7,
		september : 8,
		oktober : 9,
		november : 10,
		december : 11 
		};
				
	let hashlist = {
		'' : '',
		'W' : '5b894d4cc48745ad8322bb25d2e1b5a1',
		'ES' : '8a583dd4b37c4634a7540bf8fd983762',
		'FM' : '8d8d4ce462124bc5b6b340fe78483059',
		'COM' : 'ec7805efa31a40f6ba12bc75e93a5627',
		'ICM' : '44dce431ad6544f3a7a0a5cb2aeb3310',
		'PABO' : '666c553758534f28bdecd206c2b0a53d',
		'PED' : 'e95e253238b34fc58d31716b29a734c6',
		'HRM' : 'bdb8b7d8a6654eb5afdaf7a60d70e071',
		'TW' : 'c87b6008e6ba4c548b4f527273227198',
		'MECH' : '66a75bf49a044605905fcf39b658622b',
		'E' : '45ae5549f87a4e58aea4a13520cc7b0d',
		'TBK' : '1c63a6ab26c64dc1996ddd72f260e9c8',
		'TN' : 'f8cda0380f394f6a8513186485e347c4',
		'NLE' : '561c6b46dadc4660bd93b25b95d6a2d5',
		'HBO-ICT' : 'fd82fa1d09974f6582b9feda7a94ef15',
		'PFT' : '7c2e5754a0404416a112b5c67926704b',
		'B' : 'e64f81b154234433ba15c286a6cdbd1e',
		'CV' : '35778a66e7214755873fa824c1e564ad',
		'RO' : 'aeb3de8588654cb9b89cf2b744607182',
		'BK' : '33ff836510b641449f991919a650fc3c',
		'MIB' : '358596e688134672a9356dbba7b0112c'
		};
	
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_searchlist2_searchlist_searchlist').value = opleiding;
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_searchlist2_searchlist_searchlist_unid').value = hashlist[ opleiding ];

	// automatically fill reason with 'overig'
	// document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_subcategory_subcategory_subcategory').value = 'Overig'; // reden roosterwijziging
	// document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_subcategory_subcategory_subcategory_unid').value = '31daba56e9ee418a9a55641721e288a2'; //hash van Overig
	
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_description_description_description').value = classdata[6]; 
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion3_openquestion_openquestion').value = classdata[5]; // ID
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion4_openquestion_openquestion').value = classdata[0];  // module
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion5_openquestion_openquestion').value = classdata[6]; // lesnaam
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion6_openquestion_openquestion').value = classdata[4]; // groep
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_openquestion7_openquestion_openquestion').value = classdata[3]; // docent

	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_selection1_selection_selection_option0').click();
	console.log(classdata);
	
	let temp = classdata[7].split(' ');
	let maand = maanden[ temp[2] ];
	let dag = temp[1];
	let jaar = temp[3];
	let uur = classdata[8].slice(0,2)
	let min = classdata[8].slice(3,5)
	let datum = new Date(jaar, maand, dag, uur, min);

	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_timefield1_timefield_timefield').value = datum.getFullYear() + '-' + ("0" + (datum.getMonth()+1) ).slice(-2) + "-" + ("0" + datum.getDate() ).slice(-2);
	document.getElementById('ssdform147f76c6e71847d1803beb82fe346e2e_timefield1_timefield_timefield_time').value = classdata[8].slice(0,5);
}


