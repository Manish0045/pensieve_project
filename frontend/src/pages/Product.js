import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(
    ArcElement,
    Legend,
    Tooltip
);

const Product = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [labels, setLabels] = useState([]);
    const [arrayData, setArrayData] = useState([]);
    const [detailedData, setDetailedData] = useState([]);
    // console.log(id);
    useEffect(() => {
        fetch(`http://localhost:8000/gps/get/${id}`)
            .then((data) => data.json())
            .then((details) => {
                let a = [];
                setDetailedData(details.data);
                Array.from(details.data).map(e => a.push(e.location));
                const lbArray = Array.from(new Set(a));
                // console.log(lbArray);
                setLabels([...lbArray]);
                const uniqueCount = {};
                // let percentage = [];
                for (let element of a) {
                    if (uniqueCount[element]) {
                        uniqueCount[element] += 1
                    } else {
                        uniqueCount[element] = 1
                    }
                }
                // console.log(Object.values(uniqueCount));
                setArrayData(Object.values(uniqueCount));
                // let sum = 0;
                // for (let i = 0; i < arrayData.length; i++) {
                //     sum = sum + arrayData[i];
                // }
                // console.log(sum);
                // percentage.push(arrayData.map(c => {
                //     return Math.round((c / sum) * 100)
                // }));
                // console.log(...percentage);
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(labels.length);
    }, [id]);

    const data = {
        labels: labels,
        datasets: [
            {
                data: arrayData,
                backgroundColor: ['aqua', 'orangered', 'purple', 'grey', 'green', 'yellow'],
                borderColor: ['aqua', 'orangered', 'purple', 'grey', 'green', 'yellow']
            }
        ]
    }
    const options = {

    }

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <button button className='btn btn-primary' style={{ width: "150px", marginBottom: '50px' }} onClick={() => navigate('/home')}>Home</button>
            <div className='d-flex flex-row flex-end text-center'>
                <aside className='left d-flex flex-column justify-content-center align-items-center' style={{ width: "100%", float: 'left', border: "2px solid black" }}>
                    <h1>{id}</h1>
                    <h4>Aircraft</h4>
                    <table className='table' style={{ width: "450px", height: '200px' }}>
                        {
                            detailedData.map((e) => {
                                return (
                                    <>
                                        <tr key={e.id}>
                                            {
                                                Array.from(Object.values(e)).map((d) => {
                                                    return <td>{d}</td>
                                                })
                                            }
                                        </tr>
                                    </>
                                )
                            })

                        }
                    </table >

                </aside>
                <aside className='right p-4' style={{ float: 'right', width: "700px", border: "2px solid black" }}>
                    <div className='chart' style={{ height: "100%", width: "100%" }}>
                        <h2>Time Spent On Particular locations</h2>
                        <Pie
                            data={data}
                            options={options}
                        >
                        </Pie>
                    </div>
                </aside>
            </div >
        </div>
    )
}

export default Product;