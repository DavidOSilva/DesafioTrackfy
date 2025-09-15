import SideMenu from '../../components/SideMenu/SideMenu'
import FilterField from '../../components/FilterField/FilterField'
import fetchLocalJson from '../../api/fetchLocalJson'
import { getAreaInfo, groupDataByTime } from '../../utils/jsonManager'
import styles from './Dashboard.module.css'

import { useState, useEffect, useMemo } from 'react'

import { BiSolidBriefcase } from "react-icons/bi";

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
  const { areaNames, areaTypes } = useMemo(() => getAreaInfo(dataInfo.areas), [dataInfo.areas]); // Extrai nomes e tipos únicos de áreas
  const timeGroupedData = useMemo(() => groupDataByTime(data), [data]); // Agrupa dados por dia e semana
  
  // Exemplo de como acessar os dados agrupados:
  useEffect(() => {
    if (Object.keys(timeGroupedData.byDay).length > 0) {
      console.log("Dados agrupados por dia:", timeGroupedData.byDay);
      console.log("Dados agrupados por semana:", timeGroupedData.byWeek);
    }
  }, [timeGroupedData]);


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
              icon={BiSolidBriefcase}
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
              icon={"fi fi-sr-tags"}
          />

        </div>


      </div>

    </div>
  )

}

export default Dashboard