import Helpers from '../modules/helpers';
// import InfoBubble from '../vendor/js-info-bubble/src/infobubble';

const FindShowroom = {
    maps: [],
    markers: [],
    mapWrappers: null,
    mapSelect: null,
    mapOptions: null,
    mapWrapperClass: 'sib-find-showroom',
    mapContainersClass: 'sib-find-showroom__map',
    mapDataClass: 'map-data',
    mapSelectClass: 'sib-find-showroom__select',
    mapOffset: -150,
    mapIcon: '/images/icon-star-locator.svg',
    markerBreakpoint: 992,
    markersOffset: {
        x:190,
        y: 80
    },
    panByMobile: {
        x: 0,
        y: -100
    },
    panByDesktopK: 4,

    setVars: () => {
        // Get map's section
        FindShowroom.mapWrappers = document.getElementsByClassName(FindShowroom.mapWrapperClass);

        if (FindShowroom.mapWrappers.length > 0) {
            // Get select element with all addresses
            FindShowroom.mapSelect = document.getElementById(FindShowroom.mapSelectClass);
            // Get available addresses in select menu
            FindShowroom.mapOptions = FindShowroom.mapSelect.getElementsByTagName('OPTION');
        }
    },
    init: () => {

        FindShowroom.setVars();

        if (FindShowroom.mapWrappers.length > 0) {

            // Go through each map
            for (let i = 0; i < FindShowroom.mapWrappers.length; i++) {
                let mapContainer = FindShowroom.mapWrappers[i].getElementsByClassName(FindShowroom.mapContainersClass)[0];

                // Get data about each address (address, lng, lat)
                let coordinatesData = FindShowroom.mapWrappers[i].getElementsByClassName(FindShowroom.mapDataClass);

                // Find active address, create map with center in this address
                if (coordinatesData[0].dataset.main === '1') {
                    // Take active address as center of new map
                    FindShowroom.maps[i] = new google.maps.Map(mapContainer, {
                        center: {
                            lat: parseFloat(coordinatesData[0].dataset.lat),
                            lng: parseFloat(coordinatesData[0].dataset.lng)
                        },
                        zoom: 20
                        // styles: FindShowroom.mapStyles
                    });
                }

                // Move map a bit, as we have to show green window with select element and active marker nearby
                FindShowroom.setMarker(i);

                // Add all markers
                FindShowroom.addMarkers(FindShowroom.mapWrappers[i], FindShowroom.maps[i]);
            }

            FindShowroom.binsEvents();
        }
    },
    binsEvents: () => {
        FindShowroom.selectAddress();
    },
    addMarkers: (mapWrapper, currentMap) => {
        // Get data about each marker
        let coordinatesData = mapWrapper.getElementsByClassName(FindShowroom.mapDataClass);

        const markers = [];
        for (let k = 0; k < coordinatesData.length; k++) {

            let longLat = {
                lat: parseFloat(coordinatesData[k].dataset.lat),
                lng: parseFloat(coordinatesData[k].dataset.lng)
            };

            // Add marker
            markers[k] = new google.maps.Marker({
                position: longLat,
                map: currentMap,
                icon: FindShowroom.mapIcon
            });

            // Add popup information window to marker
            FindShowroom.addMarkerInfo(currentMap, markers[k], coordinatesData[k].dataset.info);
        }

    },
    addMarkerInfo: (map, marker, info) => {
        let contentString = `<div class="sib-find-showroom__map-info">
                <div>
                    ${info}
                </div>
            </div>`;

        let infowindow = new google.maps.InfoWindow({
            content: contentString,
            pixelOffset: new google.maps.Size(FindShowroom.markersOffset.x, FindShowroom.markersOffset.y),
            disableAutoPan: true
        });

        infowindow.open(map, marker);
    },
    setMarker: (i) => {
        // Calculate how much to move marker based on width of green block
        let windowSize = Helpers.getWindowSize();

        if (windowSize > FindShowroom.markerBreakpoint) {
            FindShowroom.maps[i].panBy(-windowSize.width / FindShowroom.panByDesktopK, 0);
        } else {
            FindShowroom.maps[i].panBy(FindShowroom.panByMobile.x, FindShowroom.panByMobile.y);
        }
    },
    moveToLocation: (mapIndex, lat, lng) => {
        // Get center of the map
        let center = new google.maps.LatLng(lat, lng);

        // Move to new center
        FindShowroom.maps[mapIndex].panTo(center);

        // Move map a bit, so marker is not hidden behind green block
        FindShowroom.setMarker(mapIndex);
    },
    selectAddress: () => {
        // Select new address
        FindShowroom.mapSelect.addEventListener('change', (e) => {

            if (FindShowroom.mapSelect.value !== '0') {
                // Get data about selected address
                let optionNumber = FindShowroom.mapOptions[FindShowroom.mapSelect.value];

                // Move to selected address
                FindShowroom.moveToLocation(0, optionNumber.dataset.lat, optionNumber.dataset.lng);
            }
        });
    }
};

export default FindShowroom;
