import React, { useState, useEffect } from 'react';
import { Alert } from './components/Alert';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseForm } from './components/ExpenseForm';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');
// const initialExprensesData = [
//   { id: uuidv4(), charge: "rent", amount: 5600 },
//   { id: uuidv4(), charge: "car", amount: 1600 },
//   { id: uuidv4(), charge: "bike", amount: 600 },
// ]

// const initialExprensesData = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

const initialExprensesData = [];

function App() {
  // *********************** State values *********************** //
  const [expenses, setExpenses] = useState(initialExprensesData);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  // *********************** State Alert *********************** //
  const [alert, setAlert] = useState({ show: false });
  // *********************** State Edit *********************** //
  const [edit, setEdit] = useState(false);
  // *********************** State Edit Item *********************** //
  const [id, setId] = useState(0);

  useEffect(() => {
    // localStorage.setItem('expenses', JSON.stringify(expenses));
    axios.get('http://localhost:3006/budgetCal').then(function (response) {
      const data = response.data.data;
      setExpenses(data);
    })
  }, [])

  const handleCharge = (e) => {
    setCharge(e.target.value);
  }

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        // let tempExpenses = expenses.map((exp) => { return exp.id === id ? { ...exp, charge, amount } : exp });
        // setExpenses(tempExpenses);
        // handleAlert({ type: "success", text: 'item edited !' });
        // setEdit(false);

        const payload = {
          charge: charge,
          amount: amount
        }
        axios.patch(`http://localhost:3006/budgetCal/${id}`, payload).then(function (response) {
          let tempExpenses = expenses.map((exp) => { return exp._id === id ? { ...exp, charge, amount } : exp });
          setExpenses(tempExpenses);
          handleAlert({ type: "success", text: 'item edited !' });
          setEdit(false);
        })
      } else {
        // const singleExpense = { id: uuidv4(), charge, amount };
        // const concatDataArray = expenses.concat(singleExpense);
        // //[...expenses, singleExpense];
        // setExpenses(concatDataArray);
        const payload = {
          _id: uuidv4(),
          charge: charge,
          amount: amount,
        }
        axios.post('http://localhost:3006/budgetCal', payload).then(function (response) {
          const concatDataArray = expenses.concat(payload);
          setExpenses(concatDataArray);
          handleAlert({ type: "success", text: 'item added !' });
          // window.location.reload();
        }).catch(function (error) {
          console.log(error);
        });
      }
      setCharge('');
      setAmount('');
    } else {
      handleAlert({ type: "danger", text: 'filed cannot be Empty and amount value has to be bigger than zero' });
    }
  }

  // clear all items 
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "info", text: 'Data has been deleted' })
  }

  const handleDeleted = (id) => {
    // let tempExpenses = expenses.filter(item => item.id !== id);
    // setExpenses(tempExpenses);
    // handleAlert({ type: "success", text: 'item deleted' })

    axios.delete(`http://localhost:3006/budgetCal/${id}`).then(function (response) {
      let tempExpenses = expenses.filter(item => item._id !== id);
      setExpenses(tempExpenses);
      handleAlert({ type: "success", text: 'item deleted' })
    })
  }

  const handleEdit = (id) => {
    // let expense = expenses.find(item => item.id === id);
    // let { charge, amount } = expense;
    // setCharge(charge);
    // setAmount(amount);
    // setEdit(true);
    // setId(id);
    let expense = expenses.find(item => item._id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} amount={amount} edit={edit} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} />
        <ExpenseList expenses={expenses} clearItems={clearItems} handleDeleted={handleDeleted} handleEdit={handleEdit} />
      </main>
      <h1>Total Spending: <span className="total">$ {expenses.reduce((acc, val) => {
        return (acc += parseInt(val.amount));
      }, 0)} </span></h1>
    </>
  )
}

export default App;