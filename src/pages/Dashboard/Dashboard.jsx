import SideMenu from '../../components/SideMenu/SideMenu'
import FilterField from '../../components/FilterField/FilterField'
import Chart from '../../components/Chart/Chart'
import { DataContext } from '../../contexts/Contexts'
import { getAreaInfo, groupDataByTime, getAreaNamesByType } from '../../utils/jsonManager'
import styles from './Dashboard.module.css'

import { useState, useMemo, useContext } from 'react'

import { BiSolidBriefcase } from "react-icons/bi";

function Dashboard() {

  const { data, dataInfo } = useContext(DataContext); // Dados dos anexos vindos do contexto

  const { areaNames, areaTypes } = useMemo(() => getAreaInfo(dataInfo.areas), [dataInfo.areas]); // Extrai nomes e tipos únicos de áreas

  // Hooks para os filtros.
  const [selectedFilters, setSelectedFilters] = useState({
    role: [],
    areaName: [],
    areaType: [],
    time: ["Day"] // Valor padrão para o filtro de tempo,
  });
  const handleFilterChange = (filterName, newValues) => { // Atualiza filtros
      const updatedFilters = {
          ...selectedFilters,
          [filterName]: newValues
      };
      
      // Se o filtro de tipo de área for alterado, limpa as áreas incompatíveis.
      if (filterName === 'areaType' && newValues.length > 0) {
          const areaDetails = dataInfo.areas || [];
          const allowedAreaNames = getAreaNamesByType(areaDetails, newValues);
          updatedFilters.areaName = updatedFilters.areaName.filter(name => allowedAreaNames.includes(name)); // Remove áreas incompatíveis
      }

      setSelectedFilters(updatedFilters);
  }

  // Omite áreas incompatíveis com o tipo de área selecionado
  const areaNamesByTypeFilter = useMemo(() => {
    if (selectedFilters.areaType.length === 0) return areaNames; // Se nenhum tipo for selecionado, mostra todos os nomes
    else return getAreaNamesByType(dataInfo.areas, selectedFilters.areaType); // Filtra nomes de áreas com base nos tipos selecionados
  }, [selectedFilters.areaType, dataInfo.areas]);

  // Aplica os filtros aos dados
  const filteredData = useMemo(() => {
    const { role, areaName, areaType, time } = selectedFilters;

    // Aplica os filtros
    const ungroupedData = data.filter(item => {
        const roleMatch = role.length == 0 || role.includes(item.funcao); // Se não houver filtro, ou se o item corresponder ao filtro
        const areaTypeMatch = areaNamesByTypeFilter.includes(item.area); // Verifica se a área do item está na lista filtrada de nomes de área
        const areaNameMatch = areaName.length == 0 || areaName.includes(item.area);
        return roleMatch && areaNameMatch && areaTypeMatch;
    });

    // Agrupa os dados filtrados usando o tempo
    return groupDataByTime(ungroupedData)[`by${time[0]}`];
  }, [data, selectedFilters, areaNamesByTypeFilter]);

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
              label="Tipo da área"
              name="areaType"
              options={areaTypes.map(item => ({ value: item, label: item })) || []}
              selectedValues={selectedFilters.areaType || []}
              onChange={handleFilterChange}
              icon={"fi fi-sr-tags"}
          />

          <FilterField
              label="Área"
              name="areaName"
              options={areaNamesByTypeFilter.map(item => ({ value: item, label: item })) || []}
              selectedValues={selectedFilters.areaName || []}
              onChange={handleFilterChange}
              icon={"fi fi-ss-building"}
          />

        </div>

        <Chart data={filteredData} time={selectedFilters.time[0]} onTimeChange={handleFilterChange} areaNames={areaNamesByTypeFilter}/>

      </div>

    </div>
  )

}

export default Dashboard