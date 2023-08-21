import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
// import Product from './Product';
const Homepage = () => {
    // const location = useLocation();
    const [gpsData, setGpsData] = useState([]);
    const navigate = useNavigate();
    // console.log(props);
    // let { setIsloggedin } = props;
    // setIsloggedin(true);
    useEffect(() => {
        fetch('http://localhost:8000/gps/get', { method: 'GET' })
            .then((res) => res.json())
            .then(result => {
                setGpsData(result.data);
                // console.log(result.data);
            })
            .catch((err) => {
                console.log(err)
            })
        console.log('Homepage');
    }, [])

    const handleClick = () => {
        navigate('/');
        console.log('Logged Out');
    }

    // console.log(gpsData);
    return (
        <div className='container d-flex flex-column gap-5'>
            <h2>GPS Summary</h2>
            <div className='search_box'>
                <input type="text" /><span>search</span>
            </div>
            <table className='table table-striped table-hover'>
                {
                    gpsData.map((e) => {
                        return (
                            <>
                                <tr key={e.id}>
                                    {
                                        Array.from(Object.values(e)).map((d) => {
                                            return (
                                                <td style={{ padding: "5px" }}>{d}</td>
                                            )
                                        })
                                    }
                                    <td>
                                        <NavLink to={`/product/${e.device_id}`}>
                                            {"===>"}
                                        </NavLink>
                                    </td>
                                </tr>
                            </>
                        );
                    })
                }
            </table>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item disabled">
                        <a className="page-link" href="/" tabindex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="/">1</a></li>
                    <li className="page-item active" aria-current="page">
                        <a className="page-link" href="/">2</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="/">Next</a>
                    </li>
                </ul>
            </nav>

            <button className='btn btn-primary' onClick={handleClick} style={{ width: "100px" }}>Logout</button>
        </div >
    )
}

export default Homepage
