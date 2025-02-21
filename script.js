// AccesToken
mapboxgl.accessToken = 'pk.eyJ1IjoiZWRlc21pcm5vZmYiLCJhIjoiY203MzYyb2FuMGd5NDJpcW9jZmIzbDBoZyJ9.85YIXg-aDUr8dkTZ9AzzAg';

// Configuration de la carte
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // Fond de carte par défaut
    zoom: 12.2,
    center: [-1.67, 48.11],
    pitch: 50, // Inclinaison
    bearing: 0 // Rotation
});

// Fonction pour ajouter les couches
function addLayers() {
    map.addSource('mapbox-streets-v8', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-streets-v8'
    });


    // Routes
    map.addLayer({
        "id": "Routes",
        "type": "line",
        "source": "mapbox-streets-v8",
        "layout": {'visibility': 'visible'},
        "source-layer": "road",
        "filter": ["all", ["in", "class", "motorway", "trunk", "primary"]],
        "paint": {"line-color": "#FF7F50", "line-width": 3},
        "maxzoom":14
    });

 
    // Hydrologie
    map.addLayer({
        "id": "hydrologie",
        "type": "line",
        "source": "mapbox-streets-v8",
        "source-layer": "waterway",
        "paint": {"line-color": "#4dd2ff",
        "line-width": 6},
        "minzoom": 14
    });
  
    //Arrets
    map.addSource('Arrets', {
        type: 'vector',
        url: 'mapbox://ninanoun.58widelk'});
        map.addLayer({
        'id': 'Arrets',
        'type': 'circle',
        'source': 'Arrets',
        'source-layer': 'Bus-5ypx1k',
        'layout': {'visibility': 'none'},
        'paint': {'circle-radius': {'base': 1.5,'stops': [[13, 2], [22, 60]]}, 'circle-color': 'green',}, minzoom:12
        });


        /*
    // Equipements publics
    map.addSource('Equipements', {
        type: 'vector',
        url: 'mapbox://ninanoun.4xcn5ude'});
        map.addLayer({
        'id': 'Equipements',
        'type': 'circle',
        'source': 'Equipements',
        'source-layer': 'base-orga-var-6k0zky',
        'layout': {'visibility': 'visible'},
        'paint': {'circle-radius': {'base': 1.5,'stops': [[13, 2], [22, 60]]}, 'circle-color': '#16f337'}, minzoom:14
        });

    //Proprietes
    map.addSource('Proprietes', {
        type: 'vector',
        url: 'mapbox://ninanoun.a4kdgiot'
        });
        map.addLayer({
        'id': 'Proprietes',
        'type': 'line',
        'source': 'Proprietes',
        'source-layer': 'limites_proprietes',
        'layout': {'visibility': 'visible',
        'line-join': 'round','line-cap': 'round'},
        'paint': {'line-color': '#FFFFFF', 'line-width': 0.5},
        "minzoom": 15
        });

      */
        
    //BATIMENTS
    map.addSource('Batiments', {
        type: 'vector',
        url: 'mapbox://mastersigat.a4h4ovrl'
        });
        
        map.addLayer({
        'id': 'Batiments',
        'type': 'fill-extrusion',
        'source': 'Batiments',
        'source-layer': 'batiIGN-8zf03o',
        'layout': {'visibility': 'visible'},
        
        'paint':
        
        {'fill-extrusion-color': '#A9A9A9',
        'fill-extrusion-height':{'type': 'identity','property':      
        'HAUTEUR'},
        
        'fill-extrusion-opacity': 0.60,
        
        'fill-extrusion-base': 0},

        
        });



    // Ajout velos star, ++++++++fichier hébergé sur github
    map.addSource('velos', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/E-deSmirnoff/data/refs/heads/main/topologie-des-stations-le-velo-star.geojson'
    });

    map.addLayer({
        id: 'velos',
        type: 'circle',
        source: 'velos',
        paint: {
            'circle-color': 'blue',
            'circle-stroke-color': 'white',
            'circle-stroke-width': 2,
            'circle-radius': 6
        },
        'minzoom':14
    });

// AJOUT DU CADASTRE ETALAB

map.addSource('Cadastre', {
    type: 'vector',
    url: 'https://openmaptiles.geo.data.gouv.fr/data/cadastre-dvf.json' });
    
    map.addLayer({
    
    'id': 'Cadastre',
    'type': 'line',
    'source': 'Cadastre',
    'source-layer': 'parcelles',
    'layout': {'visibility': 'visible'},
    'filter':['>','contenance',1000],
    'paint': {'line-color': 'white'},
    'minzoom':16, 'maxzoom':19

});
    
    map.setPaintProperty('communeslimites', 'line-width', ["interpolate",["exponential",1],["zoom"],16,0.3,18,1]);





}

// Fonction pour afficher ou masquer une couche
function toggleLayer(layerId) {
    let visibility = map.getLayoutProperty(layerId, 'visibility');
    if (visibility === 'visible') {
        map.setLayoutProperty(layerId, 'visibility', 'none');
    } else {
        map.setLayoutProperty(layerId, 'visibility', 'visible');
    }
}

// Ajout des écouteurs d'événements pour les cases à cocher
document.getElementById('toggleRoutes').addEventListener('change', function() {
    toggleLayer('Routes');
});
document.getElementById('toggleHydrologie').addEventListener('change', function() {
    toggleLayer('hydrologie');
});
document.getElementById('toggleBatiments').addEventListener('change', function() {
    toggleLayer('Batiments');
});
document.getElementById('toggleVelos').addEventListener('change', function() {
    toggleLayer('velos');
});

// Gestion du changement de fond de carte
document.getElementById('style-selector').addEventListener('change', function () {
    map.setStyle(this.value);
    map.once('style.load', function() {
        addLayers(); // Recharge les couches après changement de style
    });
});








    // Ajout des couches au chargement initial
map.on('load', addLayers);

// Gestion du changement de style
document.getElementById('style-selector').addEventListener('change', function () {
    map.setStyle(this.value);
    map.once('style.load', addLayers); // Recharge les couches après changement de style
});