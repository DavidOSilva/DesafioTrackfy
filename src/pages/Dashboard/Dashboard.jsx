import SideMenu from '../../components/SideMenu/SideMenu'
import FilterField from '../../components/FilterField/FilterField'
import fetchLocalJson from '../../api/fetchLocalJson'
import { getAreaInfo } from '../../utils/jsonManager'
import styles from './Dashboard.module.css'

import { useState, useEffect, use } from 'react'

import { FaTag } from "react-icons/fa6";

function Dashboard() {

  // Carregando dados do JSON local.
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);
  useEffect(() => {
    Promise.all([ // Carrega ambos os arquivos JSON em paralelo
      fetchLocalJson('./src/const/AnexoI.json').then(data => setDataInfo(data)),
      fetchLocalJson('./src/const/AnexoII.json').then(data => setData(data['dadosPessoas']))
    ]).finally(() => setIsLoading(false)); // Seta isLoading para false quando ambos forem carregados
  }, []);
  const { areaNames, areaTypes } = getAreaInfo(dataInfo.areas); // Extrai nomes e tipos únicos de áreas

  // Hooks para os filtros.
  const [selectedFilters, setSelectedFilters] = useState({
    role: [],
    areaType: [],
    areaName: [],
    time: [],
  });
  const handleFilterChange = (filterName, newValues) => { // Atualiza filtros
      const updatedFilters = {
          ...selectedFilters,
          [filterName]: newValues
      };
      setSelectedFilters(updatedFilters);
  }

  return (
    <div className={styles.body}>

      <SideMenu page={'Dashboard'} />

      <div className={styles.MainContainer}>

        <header className={styles.header}>
          <span className={styles.title}>Dashboard</span>
          <span className={styles.headerText}>Desafio Técnico – Frontend</span>
        </header>

        <div className={styles.filtersContainer}>

          <FilterField
              label="Função"
              name="role"
              options={dataInfo?.funcoes?.map(item => ({ value: item, label: item })) || []}
              selectedValues={selectedFilters.role || []}
              onChange={handleFilterChange}
              icon={"fi fi-sr-briefcase"}
          />

          <FilterField
              label="Área"
              name="areaName"
              options={areaNames.map(item => ({ value: item, label: item })) || []}
              selectedValues={selectedFilters.areaName || []}
              onChange={handleFilterChange}
              icon={"fi fi-ss-building"}
          />

          <FilterField
              label="Tipo da área"
              name="areaType"
              options={areaTypes.map(item => ({ value: item, label: item })) || []}
              selectedValues={selectedFilters.areaType || []}
              onChange={handleFilterChange}
              icon={FaTag}
          />

        </div>


      </div>

    </div>
  )

}

export default Dashboard