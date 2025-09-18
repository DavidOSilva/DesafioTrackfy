// Função para extrair nomes e tipos de áreas de um array de objetos de área
export const getAreaInfo = (areas) => {
  if (!areas || !Array.isArray(areas)) {
    return { areaNames: [], areaTypes: [] };
  }

  // Usando Set para obter apenas os tipos únicos
  const areaNames = [...new Set(areas.map(area => area.nome))];
  const areaTypes = [...new Set(areas.map(area => area.tipo))];

  return { areaNames, areaTypes };
};

// Função para obter nomes de áreas com base nos tipos selecionados
export const getAreaNamesByType = (areas, types) => {
  if (!areas || !Array.isArray(areas)) { // Verifica se areas é um array válido
    return [];
  }

  // Filtra as áreas com base nos tipos selecionados
  return areas
    .filter(area => types.includes(area.tipo)) // Mantém apenas as áreas cujo tipo está na lista de tipos selecionados
    .map(area => area.nome); // Extrai os nomes das áreas filtradas
};

// Da mesma forma, função para obter tipos de áreas com base nos nomes selecionados
// export const getAreaTypesByName = (areas, names) => {
//   if (!areas || !Array.isArray(areas)) { // Verifica se areas é um array válido
//     return [];
//   }

//   // Filtra as áreas com base nos nomes selecionados
//   return areas
//     .filter(area => names.includes(area.nome)) // Mantém apenas as áreas cujo nome está na lista de nomes selecionados
//     .map(area => area.tipo); // Extrai os tipos das áreas filtradas
// };

// Retorna o primeiro dia da semana (domingo) correspondente a essa data
const getStartOfWeek = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`); // Adiciona 'T00:00:00' para evitar problemas de fuso horário
  const day = date.getDay(); // retorna um número de 0 a 6, onde: 0 = Domingo, 1 = Segunda, ...
  const diff = date.getDate() - day; // calcula a diferença em relação ao início da semana
  const startOfWeek = new Date(date.setDate(diff));
  return startOfWeek.toISOString().split('T')[0];
};

export const groupDataByTime = (data) => {
  if (!data || !Array.isArray(data)) {
    return { byHour : {}, byDay : {}, byWeek: {}};
  }

  // Agrupar por hora:
  const byHour = data.reduce((acc, item) => {
    const hour = new Date(item.dataHora).getHours();
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(item);
    return acc;
  }, {});

  // Agrupar por dia:
  const byDay = data.reduce((acc, item) => {
    const date = item.dataHora.split('T')[0];
    if (!acc[date]) acc[date] = []; // Se a data não existe, inicializa com um array vazio
    acc[date].push(item); // Adiciona o item ao array existente
    return acc;
  }, {});

  // Agrupar por semana:
  const byWeek = data.reduce((acc, item) => {
    const week = getStartOfWeek(item.dataHora.split('T')[0]);
    if (!acc[week]) acc[week] = [];
    acc[week].push(item);
    return acc;
  }, {});

  return { byHour, byDay, byWeek };
};

export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}`; // /${year.slice(-2)}
}