import React from 'react'
import { ExpenseItem } from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

export const ExpenseList = ({ expenses, handleDeleted, handleEdit, clearItems }) => {
    return (
        <>
            <ul className="list">
                {expenses.map((expenses) => {
                    return <ExpenseItem key={expenses.id} handleDeleted={handleDeleted} handleEdit={handleEdit} expenses={expenses}></ExpenseItem>
                })}
            </ul>
            {expenses.length > 0 && <button type="button" onClick={()=> clearItems()} className="btn" >
                <MdDelete className="btn-icon"></MdDelete>
                Clear Expense</button>}
        </>
    )
}