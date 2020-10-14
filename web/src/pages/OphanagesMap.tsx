import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css';

import { FiPlus, FiArrowRight } from 'react-icons/fi';

import mapMarkerImg from '../images/map-marker.svg';
import Leaflet from 'leaflet';
const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor:[170,2]
})

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Minas Gerais</strong>
                    <span>Belo Horizonte</span>
                </footer>
            </aside>

            <Map
                center={[-19.9155477, -43.9439658]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                    icon={mapIcon}
                    position={[-19.9155477, -43.9439658]}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        Lar das Crianças
                        <Link to="">
                            <FiArrowRight size={20} color="#fff"/>
                        </Link>
                    </Popup>
                </Marker>

            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>


    )
}

export default OrphanagesMap;