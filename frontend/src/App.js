import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  useEffect(() => {
    axios.get('/api/values')
      .then(res => {
        console.log('response ', res);
        setLists(res.data);
      });
  });

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');
  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post(`/api/value`, {value: value})
      .then(res => {
        if(res.data.success) {
          console.log('response', res);
          setLists([...lists, res.data]);
          setValue('');
        } else {
          alert('값을 DB에 넣는데 실패했습니다.');
        }
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">

          {lists && lists.map((list, index) => (<li key={index}>{list.value}</li>))}
          <br />

          <form className="example" onSubmit={submitHandler}>
            <input 
              type="text"
              placeholder="입력해주세요."
              onChange={changeHandler}
              value={value}
            />
          <button type="submit">확인</button>
          </form>
        </div>

      </header>
    </div>
  );
}

export default App;
