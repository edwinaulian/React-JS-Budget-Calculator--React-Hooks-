import React from 'react'
import { ExpenseItem } from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

export const ExpenseList = (props) => {
    // { expenses, handleDeleted, handleEdit, clearItems }
    return (
        <>
            <ul className="list">
                {props.expenses.map((expenses) => {
                    return <ExpenseItem handleDeleted={props.handleDeleted} handleEdit={props.handleEdit} expenses={expenses} key={expenses._id} ></ExpenseItem>
                })}
            </ul>
            {props.expenses.length > 0 && <button type="button" onClick={() => props.clearItems()} className="btn" >
                <MdDelete className="btn-icon"></MdDelete>
                Clear Expense</button>}
        </>
    )
}