import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Input from "../../components/Input";
import * as Validator from 'validatorjs'
const qs = require('query-string')

const Edit = () => {

  const params = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const fetchData = () => {
    axios.get(`https://express-sinta.herokuapp.com/api/v4/product/${params.id}`)
    .then(res => {
      setData(res.data);
    })
  }

  useEffect(()=>{
    fetchData();
  }, [])

  const handleChange = event => {
    setData({
        ...data,
        [event.target.name]: event.target.value
    })
  }

  const handleCheck = event => {
    setData({
      ...data,
      status: !data.status
    })
  }

  const checkedStatus = (status) => {
    if (status === "true"){
      return true
    }
    if (status === "false"){
      return false
    }
    else{
      return status
    }
  }

  const edit = (e) => {
    e.preventDefault();

    const requestBody = qs.stringify(data);

    const rules = {
      name: 'required',
      price: 'required',
      stock: 'required',
    };

    let validation = new Validator(data, rules);
    validation.passes();
    let errorMessage = validation.errors.all();

    if (Object.entries(errorMessage).length !== 0){
      setError(errorMessage);
    }else{
      axios.put(`https://express-sinta.herokuapp.com/api/v4/product/${params.id}`, requestBody)
      .then(alert('item telah diedit'))
      .then(setError([]))
     } 
  }


  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={edit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={data.name} onChange={handleChange} error={error.name}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={data.price} onChange={handleChange} error={error.price}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={data.stock} onChange={handleChange} error={error.stock}/>
          <Input name="status" type="checkbox" label="active"  checked={checkedStatus(data.status)} onChange={handleCheck}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;