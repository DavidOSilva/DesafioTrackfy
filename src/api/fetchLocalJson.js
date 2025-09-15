async function fetchLocalJson(path) {
    try {
        const response = await fetch(path); // Usa fetch para carregar o arquivo local
        const data = await response.json(); // Converte a resposta para JSON
        return data;
    } catch (error) {
        console.error("Erro ao carregar JSON local:", error);
        return null;
    }
}

export default fetchLocalJson;
