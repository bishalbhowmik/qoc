

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllTransactionApi } from '../../../Api/Admin/TransactionApi'

export const Transaction = (props) => {

    const [transaction, setTransaction] = useState([])


    useEffect(() => {

        getAllTransactionApi().then(data => {
            if (data.error) throw data.message
            setTransaction([...data.data])
        }).catch(err => window.alert(err))

    }, [])



    let transactionShow

    if (transaction.length === 0) { transactionShow = <div className='text-center text-xl my-10'>No transaction Found</div> }
    else {
        transactionShow = transaction.map((item, index) => {

            return (
                <tr className={`hover my-3 ${item.status==='VALID' ? 'bg-green-200' : item.status==='FAILED' ? 'bg-red-200' : 'bg-yellow-200'}`}>
                    <td>{index + 1}</td>
                    <td>{item.userInfo.username}</td>
                    <td>{item.userInfo.mobile}</td>
                    <td>{item.userInfo.email}</td>
                    <td>{item.userInfo.role}</td>
                    <td>{item.amount}</td>
                    <td>{item.status}</td>
                    <td>{item.transId}</td>
                    <td>{item.tranDate}</td>
                </tr>
            )

        })
    }



    return (
        <div>

            <div className='my-16 text-center font-bold text-xl'>All Transactions</div>
            <table className="table my-10">
                <thead>
                    <tr className=' bg-red-700 text-white'>
                        <th>#</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Trans ID</th>
                        <th>Date</th>

                    </tr>
                </thead>
                <tbody> {transactionShow} </tbody>
            </table>

        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)