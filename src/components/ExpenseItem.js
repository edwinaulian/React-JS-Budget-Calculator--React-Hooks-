import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

export const ExpenseItem = ({ expenses, handleDeleted, handleEdit }) => {

    const { id, charge, amount } = expenses;

    return (
        <li className="item">
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">{amount}</span>
            </div>
            <div>
                <button onClick={() => handleEdit(id)} className="edit-btn" aria-label='edit button'><MdEdit /></button>
                <button onClick={() => handleDeleted(id)} className="clear-btn" aria-label='delete button'><MdDelete /></button>
            </div>
        </li>
    )
}