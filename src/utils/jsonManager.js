export const getAreaInfo = (areas) => {
  if (!areas || !Array.isArray(areas)) {
    return { areaNames: [], areaTypes: [] };
  }

  // Usando Set para obter apenas os tipos únicos
  const areaNames = [...new Set(areas.map(area => area.nome))];
  const areaTypes = [...new Set(areas.map(area => area.tipo))];

  return { areaNames, areaTypes };
};