import { MapContainer, TileLayer, ImageOverlay, Polygon, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SideMenu from '../../components/SideMenu/SideMenu'
import { DataContext } from '../../contexts/Contexts'
import styles from './Map.module.css'

import { useState, useContext } from 'react'


function Map() {

  const { data, dataInfo } = useContext(DataContext); // Dados dos anexos vindos do contexto

  return (
    <div className={styles.body}>

      <SideMenu page={'Map'} />

      <div className={styles.MainContainer}>

        <header className={styles.header}>
          <span className={styles.title}>Mapa</span>
          <span className={styles.headerText}>Desafio Técnico – Frontend</span>
        </header>

        <MapContainer 
          center={[-12.962195, -38.463982]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
          maxBounds={[[-90, -180], [90, 180]]}
          maxBoundsViscosity={1.0}
          preferCanvas={true}
        >
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
          />
        </MapContainer>

      </div>

    </div>
  )
}

export default Map