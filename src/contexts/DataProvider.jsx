import { useState, useEffect } from "react";
import { DataContext } from "./Contexts";
import fetchLocalJson from '../api/fetchLocalJson'

export default function DataProvider({children}) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataInfo, setDataInfo] = useState([]);

    // Carregando dados do JSON local.
    useEffect(() => {
        Promise.all([ // Carrega ambos os arquivos JSON em paralelo
        fetchLocalJson('./src/const/AnexoI.json').then(data => setDataInfo(data)),
        fetchLocalJson('./src/const/AnexoII.json').then(data => setData(data['dadosPessoas']))
        ]).finally(() => setIsLoading(false)); // Seta isLoading para false quando ambos forem carregados
    }, []);

    const value = {
        data, setData,
        dataInfo, setDataInfo,
        isLoading, setIsLoading
    };

    return(
        // Assim, qualquer componente filho pode acessar os dados do contexto.
        <DataContext.Provider value={value}>
            {children} 
        </DataContext.Provider>
    );
} 