import ToggleSelector from '../ToggleSelector/ToggleSelector';

import styles from './Chart.module.css';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useState, useMemo } from 'react'

function Chart({ data = [], time="Day", onTimeChange = () => {} }) {

    console.log("Chart received data:", data);

    // Converte os dados para o formato esperado pelo Recharts
    const chartData = useMemo(() => {
        if (!data) return [];
        return Object.keys(data).map(key => {
            let formattedGroup = key;
            
            // Formatar data
            if (time !== "Hour" && /^\d{4}-\d{2}-\d{2}$/.test(key)) {
                const [year, month, day] = key.split('-');
                formattedGroup = `${day}/${month}`; // /${year.slice(-2)}
            } else formattedGroup = `${key}h`; // Mantém o formato original para Week ou outros
            
            return {
                group: formattedGroup,
                total: data[key].reduce((acc, item) => acc + item.quantidade, 0),
            };
        });
    }, [data]);

    // Estado para o tipo de gráfico
    const [chartType, setChartType] = useState('line'); // 'bar' ou 'line'
    // Renderiza o gráfico com base no tipo selecionado
    const renderChart = () => {
    let content = null
    const commonComponents = (
        <>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis allowDecimals={false} />
            <Tooltip />
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
                    <Line type="monotone" dataKey="total" stroke="#5577ff" activeDot={{ r: 8 }} />
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
                    <Bar dataKey="total" stackId="a" fill="#5577ff" />
                </BarChart>
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
                        onChange={setChartType}
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
