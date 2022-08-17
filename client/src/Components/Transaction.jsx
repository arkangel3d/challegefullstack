import Table from 'react-bootstrap/Table';
import TransactionRender from './TransactionRender';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { urlApi } from '../utils/config';
import Filters from './Filters';
import setTotalCategory from '../utils/setTotalCategory';

const Transaction = () => {

    const [transactions, setTransactions] = useState({
        original: [],
        current: [],
        filtered: []
    });
    const [category, setCategory] = useState('');
    const [amountCategory, setAmountCategory] = useState(0);
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        const getTransactions = async () => {
            try {
                const response = await axios.get(`${urlApi}/transaction/${id}`,{
                    headers: { authorization: `Bearer ${token}` }
                });
                   
                setUser(response.data);
                setTransactions({
                    current: response?.data.Transsactions.reverse(),
                    original: response?.data.Transsactions.reverse(),
                });
            } catch (error) {
                console.log(error);
                alert('Please reload the page');
                window.location.reload();
            }
        };
        getTransactions();
    }, []);

    const handleFilter = (filter) =>{
        setAmountCategory(0);
        setCategory('');
        if(filter === 'original'){
            
           return  setTransactions((prev) => ({
                ...prev,
                current: prev.original
            }))
        }
        setTransactions(prev =>{
            const filtered = prev.original.filter(transaction => transaction.category === filter);
            return {
                ...prev,
                current: filtered
            }
        })
        setCategory(filter);
    }
    useEffect(() => {
        setTotalCategory(transactions.current).then(res=>setAmountCategory(res.toFixed(2)))
    }, [category]);
   
    return(
        <div>
            <p>Balance: ${user.balance}</p> <p>{category && `${category} total :$${amountCategory} `}</p>
            <Filters handleFilter={handleFilter}/>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.current?.map((transaction, index) =>{
            return <TransactionRender key={index} data={transaction} />
        })}
      </tbody>       
    </Table>
        </div>
    )
};

export default Transaction;