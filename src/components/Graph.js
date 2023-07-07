import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { fetchBusinessById } from '../api';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import icon from '../assets/icon.svg'
import './Graph.css';

export default function Graph() {
    const { name, siren, results } = useParams();
    const [businessData, setBusinessData] = useState(null);
    const chart1Ref = useRef(null);
    const chart2Ref = useRef(null);
    const chart3Ref = useRef(null);
    const chart4Ref = useRef(null);
    const resultsArray = JSON.parse(results);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const business = await fetchBusinessById(resultsArray);
            setBusinessData(business);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (businessData) {
            if (chart1Ref.current) {
                if (chart1Ref.current.chartInstance) {
                    chart1Ref.current.chartInstance.destroy();
                }
            }
            if (chart2Ref.current) {
                if (chart2Ref.current.chartInstance) {
                    chart2Ref.current.chartInstance.destroy();
                }
            }
            if (chart3Ref.current) {
                if (chart3Ref.current.chartInstance) {
                    chart3Ref.current.chartInstance.destroy();
                }
            }
            if (chart4Ref.current) {
                if (chart4Ref.current.chartInstance) {
                    chart4Ref.current.chartInstance.destroy();
                }
            }

            if (chart1Ref.current) {
                const ctx1 = chart1Ref.current.getContext('2d');
                const myChart1 = new Chart(ctx1, {
                    type: 'bar',
                    data: {
                        labels: ['2016', '2017'],
                        datasets: [
                            {
                                label: "Chiffre d'affaire",
                                data: [businessData[1].ca, businessData[0].ca],
                                backgroundColor: 'rgba(78,89,255)',
                                borderColor: 'rgba(78,89,255)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                    },
                });
                chart1Ref.current.chartInstance = myChart1;
            }
            if (chart2Ref.current) {
                const ctx2 = chart2Ref.current.getContext('2d');
                const myChart2 = new Chart(ctx2, {
                    type: 'bar',
                    data: {
                        labels: ['2016', '2017'],
                        datasets: [
                            {
                                label: "EBITDA",
                                data: [businessData[1].ebitda, businessData[0].ebitda],
                                backgroundColor: 'rgba(78,89,255)',
                                borderColor: 'rgba(78,89,255)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                    },
                });
                chart2Ref.current.chartInstance = myChart2;
            }
            if (chart3Ref.current) {
                const ctx3 = chart3Ref.current.getContext('2d');
                const myChart3 = new Chart(ctx3, {
                    type: 'bar',
                    data: {
                        labels: ['2016', '2017'],
                        datasets: [
                            {
                                label: "Loss",
                                data: [businessData[1].loss, businessData[0].loss],
                                backgroundColor: 'rgba(78,89,255)',
                                borderColor: 'rgba(78,89,255)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                    },
                });
                chart3Ref.current.chartInstance = myChart3;
            }
            if (chart4Ref.current) {
                const ctx4 = chart4Ref.current.getContext('2d');
                const myChart4 = new Chart(ctx4, {
                    type: 'bar',
                    data: {
                        labels: ['2016', '2017'],
                        datasets: [
                            {
                                label: "Margin",
                                data: [businessData[1].margin, businessData[0].margin],
                                backgroundColor: 'rgba(78,89,255)',
                                borderColor: 'rgba(78,89,255)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                    },
                });
                chart4Ref.current.chartInstance = myChart4;
            }
        }
    }, [businessData]);



    if (!businessData) {
        return <div>Loading...</div>;
    }

    return (
        
        <div>
            <div className='header-graph'>
                <div>
                    
                <Link to="/">
                    <img alt='Back Button' src={icon}/>
                </Link>
                </div>
                <div className='infos-graph'>
                    <h4>{name}</h4>
                    <p>N° SIREN {siren}</p>
                </div>
            </div>
            <div>
                <canvas ref={chart1Ref} />
                <canvas ref={chart2Ref} />
                <canvas ref={chart3Ref} />
                <canvas ref={chart4Ref} />
            </div>
        </div>
    );
}
