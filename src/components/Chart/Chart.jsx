import styles from './Chart.module.css';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import { useState, useMemo } from 'react'

function Chart({ data = [], time="Day" }) {

    console.log("Chart received data:", data);

    // Converte os dados para o formato esperado pelo Recharts
    const chartData = useMemo(() => {
        if (!data) return [];
        return Object.keys(data).map(key => ({
            group: key,
            total: data[key].reduce((acc, item) => acc + item.quantidade, 0),
        }));
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
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    {commonComponents}
                    <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            );
            break;
        case 'bar':
            content = (
                <BarChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    {commonComponents}
                    <Bar dataKey="total" stackId="a" fill="#8884d8" />
                </BarChart>
            );
            break;
        default: 
            return null;
    }

    return content;
}

    console.log("Chart data:", chartData);

    return (

        <div className={styles.container}>

            <header className={styles.header}>
                <span className={styles.title}>Pessoas</span>
                <div className={styles.chartTypeSelector}>
                    <div onClick={() => setChartType('bar')} className={chartType === 'bar' ? styles.active : ''}>Barra</div>
                    <div onClick={() => setChartType('line')} className={chartType === 'line' ? styles.active : ''}>Linha</div>
                </div>
            </header>

            <ResponsiveContainer width="100%" height={500}>
                {renderChart()}
            </ResponsiveContainer>

        </div>

    );
}

export default Chart;
