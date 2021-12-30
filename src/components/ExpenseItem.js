import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

export const ExpenseItem = (props) => {
    // if not get data from backend { expenses, handleDeleted, handleEdit }
    // const { _id, charge, amount } = expenses;
    return (
        <li className="item">
            <div className="info">
                <span className="expense">{props.expenses.charge}</span>
                <span className="amount">{props.expenses.amount}</span>
            </div>
            <div>
                <button onClick={() => props.handleEdit(props.expenses._id)} className="edit-btn" aria-label='edit button'><MdEdit /></button>
                <button onClick={() => props.handleDeleted(props.expenses._id)} className="clear-btn" aria-label='delete button'><MdDelete /></button>
            </div>
        </li>
    )
}