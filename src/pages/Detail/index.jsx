import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import './index.scss';

const Detail = () => {

  const params = useParams();
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get(`https://express-sinta.herokuapp.com/api/v4/product/${params.id}`)
    .then(res => {
      setData(res.data);
      })
  }

  useEffect(()=>{
    fetchData();
  }, [])


  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {data._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {data.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {data.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {data.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;