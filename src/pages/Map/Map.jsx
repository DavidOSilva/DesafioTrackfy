import { MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SideMenu from '../../components/SideMenu/SideMenu'
import { DataContext } from '../../contexts/Contexts'
import Icon from '../../components/Icon/Icon'
import styles from './Map.module.css'

import { useState, useContext, useMemo } from 'react'


function Map() {

  const { data, dataInfo } = useContext(DataContext); // Dados dos anexos vindos do contexto

  // Calcula o total de pessoas por área
  const totalPeoplePerArea = useMemo(() => {
    return (data ?? []).reduce((acc, item) => {
      if (!acc[item.area]) acc[item.area] = 0; // Inicializa a contagem se a área ainda não estiver no acumulador
      acc[item.area] += item.quantidade;
      return acc;
    }, {}); 
  }, [data]);

  // Obtem as coordenadas das areas
  const areaCoordinates = useMemo(() => {
    let areaCoords = {};
    (dataInfo.areas ?? []).forEach((item) => {
      areaCoords[item.nome] = [item.latitude, item.longitude];
    });
    return areaCoords;
  }, [dataInfo]);

  // Gerar cores para cada área
  const getAreaColor = (index) => {
      const colors = [ "#3511d4ff", "#4763ffff", "#7492FC", "#00E0B4", "#feda6cff"];
      return colors[index % colors.length];
  };

  return (
    <div className={styles.body}>

      <SideMenu page={'Map'} />

      <div className={styles.MainContainer}>

        <header className={styles.header}>
          <span className={styles.title}>Mapa</span>
          <span className={styles.headerText}>Desafio Técnico – Frontend</span>
        </header>

        <MapContainer 
          center={[-12.854396, -38.454726]}
          zoom={18}
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

          {/* Renderizar markers para cada área */}
          {Object.entries(areaCoordinates).map(([areaName, coordinates], index) => {
            const totalPeople = totalPeoplePerArea[areaName] || 0;
            const areaColor = getAreaColor(index);
            
            return (
              <Circle
                  key={areaName}
                  center={coordinates}
                  radius={12}
                  pathOptions={{
                    color: areaColor,
                    fillColor: areaColor,
                    fillOpacity: 0.6,
                    weight: 3
                  }}
                >
                <Popup>
                  <div className={styles.popup}>
                    <span className={styles.popupAreaName} style={{ color: areaColor }}>{areaName}</span>
                    <div className={styles.popupInfoContainer}>

                      <div className={styles.popupIconContainer}>
                        <Icon icon="fi fi-sr-users-alt" className={styles.popupIcon} />
                        <span className={styles.popupInfoText}>{totalPeople}</span>
                      </div>

                    </div>
                  </div>
                  
                </Popup>
              </Circle>
            );
          })}

        </MapContainer>

      </div>

    </div>
  )
}

export default Map