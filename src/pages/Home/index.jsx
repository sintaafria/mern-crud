import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

const Home = (props) => {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState([])

  const fetchData = () => {
    axios.get(`https://express-sinta.herokuapp.com/api/v4/product?name=${query}`)
    .then(res => {
      setData(res.data);
      })
  }

  const deleteItem = (id) => {
    if (window.confirm('Anda yakin menghapus item ini?')){
      axios.delete(`https://express-sinta.herokuapp.com/api/v4/product/${id}`)
      .then(() => fetchData())
    }
  }

  useEffect(()=>{
    fetchData();
  }, [query])

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input name="query" type="text" placeholder="Masukan kata kunci..." value={query} onChange={e => setQuery(e.target.value)}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map( (data, i)  => 
            <tr key={i}>
            <td>{i+1}</td>
            <td>{data.name}</td>
            <td className="text-center">Rp. {data.price}</td>
            <td className="text-center">
              <Link to={"/detail/"+data._id} className="btn btn-sm btn-info" >Detail</Link>
              <Link to={"/edit/"+data._id} className="btn btn-sm btn-warning">Edit</Link>
              <button className="btn btn-sm btn-danger" onClick={() => deleteItem(data._id)}>Delete</button>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Home;