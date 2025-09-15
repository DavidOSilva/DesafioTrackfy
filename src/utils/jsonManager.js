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
    return { byDay : {}, byWeek: {}};
  }

  // Agrupar por dia:
  const byDay = data.reduce((acc, item) => {
    const date = item.data;
    if (!acc[date]) acc[date] = []; // Se a data não existe, inicializa com um array vazio
    else {
      acc[date].push(item); // Adiciona o item ao array existente
    }
    return acc;
  }, {});

  // Agrupar por semana:
  const byWeek = data.reduce((acc, item) => {
    const week = getStartOfWeek(item.data);
    if (!acc[week]) acc[week] = [];
    acc[week].push(item);
    return acc;
  }, {});

  return { byDay, byWeek };
};