import React from 'react';
import { MdSend } from 'react-icons/md';

export const ExpenseForm = ({ edit, charge, amount, handleCharge, handleAmount, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="expense">Charge</label>
                    <input type="text" value={charge} onChange={handleCharge} className="form-control" id="charge" placeholder="e.g. rent" name="charge"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" value={amount} onChange={handleAmount} className="form-control" id="amount" placeholder="e.g. 100" name="amount"></input>
                </div>
            </div>
            <button type="submit" className="btn">
                    { edit? 'Edit' : 'Submit' }
                <MdSend className="btn-send" /></button>
        </form>
    )
}