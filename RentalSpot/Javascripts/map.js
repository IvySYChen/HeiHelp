"use strict";

//================================================================================
// Map
//================================================================================
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), { zoom: 13, center: center_position, gestureHandling: 'greedy' });

    initCenter();
    initCircle();
    initCluster();
    initControl();
    initInfoWindow();
}

function updateMap(houses, university) {
    getArray(houses);
    updateCenter(university);
    updateCircle();
    updateMarkers(houses);
}

//================================================================================
// Paging
//================================================================================
let origin_array = [];

function getArray(array) {
    origin_array = JSON.parse(JSON.stringify(array));
}

//================================================================================
// Marker
//================================================================================
let marker_array = [];

class MapMarker {
    constructor(house) {
        this.location = { 'lat': house['latitude'], 'lng': house['longitude'] };
        this.price = house['price'];
        this.distance = house['distance'];
        this.image_url = house['image_url'];
        this.address = house['address'];
        this.page_index = house['pagenum'];
        this.index = house['index'];
    }

    addMarkerInstance(instance) {
        this.instance = instance;
        this.instance.addListener('mouseover', () => {
            info_window.open(map, this.instance);
            let contentString = `
                <div id='pop'>
                    <div id="pop_image_div">
                        <img src="${this.image_url}" alt="House" id="pop_image">
                    </div>
                    <div id="pop_address">
                        ${this.address}
                    </div>
                </div>`;
            info_window.setContent(contentString);
        })

        this.instance.addListener('mouseout', () => {
            info_window.close(map, this.instance);
        })

        this.instance.addListener('click', () => {
            this.mapChangePage(31, this.page_index + 1, origin_array, this.index);
        })
    }

    mapChangePage(pagetotal, pageindex, array, index) {
        $('#pagebutton').val(pageindex);
        changepage(pageindex, array);
        if ($('#pagebutton').val() == pagetotal) {
            pagedownhover1();
        }
        else {
            pagedownhover2();
        }
        if ($('#pagebutton').val() == 1) {
            pageuphover1();
        }
        else {
            pageuphover2();
        }
        let listnum = index % 6;

        $('html, body').animate({
            scrollTop: $("#li" + listnum).offset().top
        }, 1000);
        $('#li' + listnum).css("background", "#f2faf8");
        setTimeout(function () {
            $('#li' + listnum).css("background", "white");
        }, 1000);
    }

    showDefault() {
        this.instance.setIcon(default_icon);
        this.instance.setLabel();
    }

    showPrice() {
        this.instance.setIcon(bubble_icon);
        this.instance.setLabel('$' + this.price.toString());
    }

    showDistance() {
        this.instance.setIcon(bubble_icon);
        this.instance.setLabel(this.distance.toFixed(2).toString() + ' km');
    }
}

function deleteMarkers() {
    for (let i = 0; i < marker_array.length; i++) {
        marker_array[i].instance.setMap(null);
    }
    marker_array = [];
}

function addMarkers(marker) {
    if (marker.length > 1) {
        marker_array.push(...marker);
    } else {
        marker_array.push(marker);
    }
}

function compareDistance(a, b) {
    if (a.distance > b.distance) return 1;
    if (a.distance < b.distance) return -1;
    return 0;
}

function sortMarkers() {
    marker_array.sort(compareDistance);
}

function binarySearch(value) {
    let items = marker_array;
    if (items.length == 0) return -1;
    let firstIndex = 0;
    let lastIndex = items.length - 1;
    let middleIndex = Math.floor((lastIndex + firstIndex) / 2);

    while (items[middleIndex].distance != value && firstIndex < lastIndex) {
        if (value < items[middleIndex].distance) {
            lastIndex = middleIndex - 1;
        } else if (value > items[middleIndex].distance) {
            firstIndex = middleIndex + 1;
        }
        middleIndex = Math.floor((lastIndex + firstIndex) / 2);
    }

    return (items[middleIndex].distance > value) ? middleIndex - 1 : middleIndex;
}

//================================================================================
// Cluster
//================================================================================
let cluster;

function initCluster() {
    cluster = new MarkerClusterer(map, [],
        {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            minimumClusterSize: 8
        });
}

function updateMarkers(positions) {
    cluster.clearMarkers();
    deleteMarkers();

    let markers = positions.map(function (house, i) {
        let location = { 'lat': house['latitude'], 'lng': house['longitude'] };

        let marker = new MapMarker(house);
        marker.addMarkerInstance(new google.maps.Marker({ position: location, icon: default_icon }));
        addMarkers(marker);

        return marker.instance;
    });

    sortMarkers();
    let index = binarySearch(radius / 1000);

    for (let i = 0; i <= index; i++) {
        cluster.addMarker(marker_array[i].instance);
    }
}

function updateClusters() {
    cluster.clearMarkers();

    let index = binarySearch(radius / 1000);

    for (let i = 0; i <= index; i++) {
        cluster.addMarker(marker_array[i].instance);
    }
}

//================================================================================
// Circle
//================================================================================
let circle;
let radius = 2000;

function initCircle() {
    circle = new google.maps.Circle({
        strokeColor: '#fbc314',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#fbc314',
        fillOpacity: 0.1,
        map: map,
        center: center_position,
        radius: radius,
        visible: false,
        clickable: false,
        editable: true
    });

    circle.addListener('radius_changed', function () {
        let circle_text = document.getElementById('circleText');
        radius = circle.getRadius();
        circle_text.innerHTML = (radius / 1000).toFixed(2) + ' km';

        updateClusters();
    })
}

function updateCircle() {
    circle.setCenter(center_position);
    circle.setVisible(true);
}

//================================================================================
// Center
//================================================================================
let center_position = { lat: 43.656997, lng: -79.390331 };
let school_center = {
    'UTSU': { lat: 43.656997, lng: -79.390331 },
    'RU': { lat: 43.654639, lng: -79.374772 }
}
let center_marker;

function initCenter() {
    let center_icon = {
        url: "../Image/school_icon.png",
        scaledSize: new google.maps.Size(34, 47) // scaled size
    }

    center_marker = new google.maps.Marker({
        position: center_position, map: map, icon: center_icon
    });
}

function updateCenter(school) {
    center_position = school_center[school];
    center_marker.setPosition(center_position);
}

//================================================================================
// InfoWindow
//================================================================================
let info_window;

function initInfoWindow() {
    info_window = new google.maps.InfoWindow({ maxWidth: 300 });
};

//================================================================================
// Control
//================================================================================
let icon_state = 'default';
let default_icon;
let bubble_icon;
let state_color = "#90c4f9";
let origin_color = "#fbc314";

function initControl() {
    default_icon = {
        url: "../Image/house_icon.png",
        scaledSize: new google.maps.Size(34, 47) // scaled size
    }

    bubble_icon = {
        path: `M10.3,0.2h25.3c5.5,0,10,4.6,10,10.3l0,0c0,5.7-4.5,10.3-10,10.3H10.3c-5.5,0-10-4.6-10-10.3l0,0
       C0.2,4.9,4.7,0.2,10.3,0.2z`,
        fillColor: 'white',
        fillOpacity: 0.8,
        scale: 1.3,
        strokeColor: 'black',
        strokeWeight: 1,
        labelOrigin: new google.maps.Point(20, 11)
    };

    let iconControlDiv = document.createElement('div');
    iconControl(iconControlDiv, map);
    iconControlDiv.index = 1;
    iconControlDiv.style.paddingTop = "10px";
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(iconControlDiv);
}

function iconControl(controlDiv, map) {
    controlDiv.style.clear = "both"; // Set CSS for the control border

    const defaultUI = document.createElement("div");
    defaultUI.id = "defaultUI";
    defaultUI.title = "Click to show default icon";
    controlDiv.appendChild(defaultUI); // Set CSS for the control interior

    const defaultText = document.createElement("div");
    defaultText.id = "defaultText";
    defaultText.innerHTML = "Default";
    defaultUI.appendChild(defaultText); // Set CSS for the setCenter control border

    const priceUI = document.createElement("div");
    priceUI.id = "priceUI";
    priceUI.title = "Click to show icon with price";
    controlDiv.appendChild(priceUI); // Set CSS for the control interior

    const priceText = document.createElement("div");
    priceText.id = "priceText";
    priceText.innerHTML = "Price";
    priceUI.appendChild(priceText);

    const distanceUI = document.createElement("div");
    distanceUI.id = "distanceUI";
    distanceUI.title = "Click to show icon with distance";
    controlDiv.appendChild(distanceUI); // Set CSS for the control interior

    const distanceText = document.createElement("div");
    distanceText.id = "distanceText";
    distanceText.innerHTML = "Distance";
    distanceUI.appendChild(distanceText);

    const centerUI = document.createElement("div");
    centerUI.id = "centerUI";
    centerUI.title = "Click to re center the map";
    controlDiv.appendChild(centerUI); // Set CSS for the control interior

    const centerText = document.createElement("div");
    centerText.id = "centerText";
    centerText.innerHTML = "Center";
    centerUI.appendChild(centerText);

    const circleUI = document.createElement("div");
    circleUI.id = "circleUI";
    circleUI.title = "Radius of the circle";
    controlDiv.appendChild(circleUI); // Set CSS for the control interior

    const circleText = document.createElement("div");
    circleText.id = "circleText";
    circleText.innerHTML = (radius / 1000).toFixed(2) + " km";
    circleUI.appendChild(circleText);

    // Setup the click event listeners: simply set the map to Chicago.
    defaultUI.addEventListener('click', function () {
        if (icon_state != 'default') {
            marker_array.forEach(item => item.showDefault());
            document.getElementById(icon_state + 'UI').style.backgroundColor = origin_color;
            document.getElementById('defaultUI').style.backgroundColor = state_color;
            icon_state = 'default';
        }
    });

    priceUI.addEventListener('click', function () {
        if (icon_state != 'price') {
            marker_array.forEach(item => item.showPrice());
            document.getElementById(icon_state + 'UI').style.backgroundColor = origin_color;
            document.getElementById('priceUI').style.backgroundColor = state_color;
            icon_state = 'price';
        }
    });

    distanceUI.addEventListener('click', function () {
        if (icon_state != 'distance') {
            marker_array.forEach(item => item.showDistance());
            document.getElementById(icon_state + 'UI').style.backgroundColor = origin_color;
            document.getElementById('distanceUI').style.backgroundColor = state_color;
            icon_state = 'distance';
        }
    });

    centerUI.addEventListener('click', function () {
        map.panTo(center_position);
    });
}