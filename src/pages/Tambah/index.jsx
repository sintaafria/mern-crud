import { useState } from 'react';
import axios from 'axios';
import Input from "../../components/Input";
import './index.scss';
import * as Validator from 'validatorjs'
const qs = require('query-string')

const Tambah = () => {

  const initialState = {
    name: '',
    price: '',
    stock: '',
    status: true,
  }

  const [error, setError] = useState([])
  const [data, setData] = useState(initialState)

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

  const handleSubmit = (e) => {
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
      axios.post(`https://express-sinta.herokuapp.com/api/v4/product/`, requestBody)
      .then(alert('item baru telah ditambahkan'))
      .then(()=>{
        setData(initialState);
        setError([])
      })
     } 
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={data.name} onChange={handleChange} error={error.name}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={data.price} onChange={handleChange} error={error.price}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={data.stock} onChange={handleChange} error={error.stock}/>
          <Input name="status" type="checkbox" label="Active" checked={data.status} onChange={handleCheck}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;