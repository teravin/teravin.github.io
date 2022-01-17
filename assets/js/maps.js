var planes = [
    ["Jakarta, Indonesia",-6.1875577,106.8346548,"Cik 9 Building<br/>Jl. Cikini Raya No.9<br/>Menteng, Jakarta Pusat"],
    ["Tangerang, Indonesia",-6.2561944,106.6085891, "Scentia Garden Ruko Darwin Blok DRWT No.032<br/>Kelapa Dua, Tangerang"],
    ["Yogyakarta, Indonesia",-7.7647251,110.4096416, "Jl. Seturan Raya Kav. Madukismo, Griya Citra Prima No.19C<br/>Depok, Sleman, Yogyakarta"],
    ["Singapore",1.2911684,103.8489753, "1 Coleman Street #01-06<br/>The Adelphi, Singapore 179803"],
];
var center = [-2.180242, 109.161887];

var map = L.map('map').setView(center, 5);
map.scrollWheelZoom.disable();
this.map.on('click', () => { this.map.scrollWheelZoom.enable();});
this.map.on('mouseout', () => { this.map.scrollWheelZoom.disable();});
mapLink = 
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    }).addTo(map);

var iconOffice = L.icon({
    iconUrl: 'assets/images/marker.png',
    iconSize: [40, 38], // size of the icon
    popupAnchor: [0,-15]
});

var customOptions = {
    'maxWidth': '500',
    'className' : 'custom'
}

var markers = [];
for (var i = 0; i < planes.length; i++) {
    marker = new L.marker([planes[i][1],planes[i][2]], {icon: iconOffice})
        .bindPopup(customPopup(i), customOptions)
        .addTo(map)
        .on('click', onClickMarker);
    markers.push(marker);
}

function onClickMarker(e){
    map.setView(e.latlng, 8);
    var marker = e.target;
    marker._popup._closeButton.onclick = function( ){
        map.setView(center, 5);
    }
}

function customPopup(id){
    var popup = `<b>${planes[id][0]}</b><br/><br/>${planes[id][3]}`;
    return popup;
}

function markerFunction(id){
    markers[id].openPopup();
    map.setView([planes[id][1],planes[id][2]], 8);
    markers[id]._popup._closeButton.onclick = function( ){
        map.setView(center, 5);
    }
}