import ToggleSelector from '../ToggleSelector/ToggleSelector';
import FilterField from '../FilterField/FilterField';
import { formatDate } from '../../utils/jsonManager';

import styles from './Chart.module.css';
import { Pie, PieChart, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useMemo } from 'react'

function Chart({ data = [], time="Day", onTimeChange = () => {}, areaNames = [] }) {

    // Estado para o tipo de gráfico
    const [chartType, setChartType] = useState('line'); // 'bar' ou 'line'
    const handleChartTypeChange = (newType) => {
        setSelectedFilters({...selectedFilters, instantsTime: []}); // Limpa seleção de instantes ao mudar o tipo de gráfico
        setChartType(newType);
    }

    // Para o gráfico de pizza, o usuário seleciona as instâncias de tempo que deseja visualizar
    const [selectedFilters, setSelectedFilters] = useState({
        instantsTime: []
    });
    const handleFilterChange = (filterName, newValues) => { 
          const updatedFilters = {
              ...selectedFilters,
              [filterName]: newValues
          };
          setSelectedFilters(updatedFilters);
    }


    // Converte os dados para o formato esperado pelo Recharts (Line e Bar)
    const chartData = useMemo(() => {
        if (!data) return [];

        return Object.keys(data).map(key => {
            let formattedGroup = key;
            
            // Formatar data
            if (time !== "Hour" && /^\d{4}-\d{2}-\d{2}$/.test(key)) formattedGroup = formatDate(key);
            else formattedGroup = `${key}h`; // Mantém o formato original para Week ou outros
            
            // Criar objeto com total para cada área
            const groupData = { group: formattedGroup };
            let totalGeneral = 0;
            
            // Inicializar todas as áreas com 0
            areaNames.forEach(area => {
                groupData[area] = 0;
            });
            
            // Somar quantidades por área
            data[key].forEach(item => {
                groupData[item.area] = (groupData[item.area] || 0) + item.quantidade;
                totalGeneral += item.quantidade;
            });
            
            groupData.Total = totalGeneral;
            
            return groupData;
        });
    }, [data]);


    // Filtrar dados por instantes de tempo selecionados, util para gráfico de pizza.
    const filteredData = useMemo(() => {
        const { instantsTime } = selectedFilters;

        if (instantsTime.length === 0) return data;

        return Object.fromEntries(
            instantsTime
            .filter(timeKey => data[timeKey]) // 
            .map(timeKey => [timeKey, data[timeKey]])
        );
    }, [data, selectedFilters.instantsTime]);
    // Converte os dados, mas para o gráfico de pizza (agregação por área e filtro de instantes de tempo)
    const pieChartData = useMemo(() => {
        if (chartType !== 'pie' || !filteredData || Object.keys(filteredData).length === 0) return [];
            
        const areasTotals = {};
        
        // Agregar quantidades por área de todos os instantes selecionados
        Object.keys(filteredData).forEach(timeKey => {
            filteredData[timeKey].forEach(item => {
                if (!areasTotals[item.area])  areasTotals[item.area] = 0;
                areasTotals[item.area] += item.quantidade;
            });
        });
        
        // Converter para formato do PieChart
        return Object.keys(areasTotals).map(area => ({
            name: area,
            value: areasTotals[area]
        }));
    }, [data, filteredData, chartType]);

    // Gerar cores para cada área
    const getAreaColor = (index) => {
        const colors = [
            "#3511d4ff", "#4763ffff", "#7492FC", "#00E0B4", "#feda6cff"
        ];
        return colors[index % colors.length];
    };

    // Componente de tooltip personalizado para gráfico de barras
    const CustomBarTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const totalGeral = payload.reduce((sum, entry) => sum + entry.value, 0);
            
            return (
                <div className={styles.customTooltip}>
                    <p className={styles.tooltipLabel}>{`${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color, margin: '2px 0' }}>
                            {`${entry.name}: ${entry.value} pessoas`}
                        </p>
                    ))}
                    <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #ccc' }} />
                    <p className={styles.tooltipTotal}>
                        <strong>{`Total Geral: ${totalGeral} pessoas`}</strong>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Renderiza o gráfico com base no tipo selecionado
    const renderChart = () => {
    let content = null
    const commonComponents = (
            <>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="group" />
                <YAxis allowDecimals={false} />
                <Legend />
            </>
        );

        switch(chartType){
            case 'line':
                content = (
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 8,
                            left: 8,
                            bottom: 5,
                        }}
                    >
                        {commonComponents}
                        <Tooltip />
                        <Line type="monotone" dataKey="Total" stroke="#5577ff" activeDot={{ r: 8 }} />
                    </LineChart>
                );
                break;
            case 'bar':
                content = (
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 8,
                            left: 8,
                            bottom: 5,
                        }}
                    >
                        {commonComponents}
                        <Tooltip content={<CustomBarTooltip />}/>
                        {/* Renderizar uma barra para cada área */}
                        {areaNames.map((area, index) => (
                            <Bar 
                                key={area}
                                dataKey={area} 
                                stackId="areas" 
                                fill={getAreaColor(index)}
                                name={area}
                            />
                        ))}
                    </BarChart>
                );
                break;
            case 'pie':
                // Implementação do gráfico de pizza pode ser adicionada aqui
                content = (
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            outerRadius={180}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={getAreaColor(index)} 
                                />
                            ))}
                        </Pie>
                        <Tooltip 
                            formatter={(value, name) => [value, `${name} pessoas`]}
                            labelFormatter={() => ''}
                        />
                        <Legend 
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => `${value}`}
                        />
                    </PieChart>
                );
                break;
            default: return null;
        }

        return content;
    }

    return (

        <div className={styles.container}>

            <header className={styles.header}>
                <span className={styles.title}>Pessoas por período</span>
                <div className={styles.selectors}>
                    { chartType === 'pie' && (
                        <div className={styles.instantsTimeFilter}>
                            <FilterField
                                label="Instante de tempo"
                                name="instantsTime"
                                options={Object.keys(data).map(key => ({
                                    value: key,
                                    label: time !== "Hour" && /^\d{4}-\d{2}-\d{2}$/.test(key) ? formatDate(key) : `${key}h`
                                })) || []}
                                selectedValues={selectedFilters.instantsTime || []}
                                onChange={handleFilterChange}
                                icon={"fi fi-sr-time-quarter-past"}
                            />
                        </div>
                    )}
                    <ToggleSelector
                        options={{
                                Hour: { label: '', icon: "fi fi-br-clock-three" },
                                Day: { label: '', icon: "fi fi-br-calendar-day" },
                                Week: { label: '', icon: "fi fi-br-calendar-week" },
                        }}
                        value={time}
                        onChange={(newTime) => onTimeChange && onTimeChange('time', [newTime])}
                        legend="Período de exibição"
                    />
                    <ToggleSelector
                        options={{
                            line: { label: '', icon: "fi fi-br-chart-line-up" },
                            bar: { label: '', icon: "fi fi-br-stats" },
                            pie: { label: '', icon: "fi fi-bs-chart-pie-alt"},
                        }}
                        value={chartType}
                        onChange={handleChartTypeChange}
                        legend="Tipo de gráfico"
                    />
                </div>
            </header>

            <ResponsiveContainer width="100%" height={500}>
                {renderChart()}
            </ResponsiveContainer>

        </div>

    );
}

export default Chart;
