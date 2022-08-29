import Table from "react-bootstrap/Table";
import TransactionRender from "./TransactionRender";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { urlApi } from "../utils/config";
import Filters from "./Filters";
import setTotalCategory from "../utils/setTotalCategory";
import Button from "react-bootstrap/Button";
import ModalTransaction from "./ModalAddTransaction";

const Transaction = () => {
  const [transactions, setTransactions] = useState({
    original: [],
    current: [],
    filtered: [],
  });
  const [category, setCategory] = useState("");
  const [amountCategory, setAmountCategory] = useState(0);
  const { id } = useParams();
  const [user, setUser] = useState({});
  
  const token = localStorage.getItem("token");
  const getTransactions = async () => {
    try {
      const response = await axios.get(`${urlApi}/transaction/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      setTransactions({
        current: response?.data.Transsactions.reverse(),
        original: response?.data.Transsactions.reverse(),
      });
    } catch (error) {
      console.log(error);
      alert("Please reload the page");
      window.location.reload();
    }
  };
  useEffect(() => {
     getTransactions();
  }, []);

  const handleFilter = (filter) => {
    setAmountCategory(0);
    setCategory("");
    let type = "category";
    if (filter === "original") {
      return setTransactions((prev) => ({
        ...prev,
        current: prev.original,
      }));
    }
    if (filter === "income" || filter === "expense") {
      type = "type";
    }
    setTransactions((prev) => {
      const filtered = prev.original.filter(
        (transaction) => transaction[type] === filter
      );
      return {
        ...prev,
        current: filtered,
      };
    });
    setCategory(filter);
  };
  useEffect(() => {
    setTotalCategory(transactions.current).then((res) =>
      setAmountCategory(res.toFixed(2))
    );
  }, [category]);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [data, setData] = useState({});
  const handleShow = () => {
    setActive(true);
    setShow(true);
  };
  const handleOnclik = (e) => {
    const id =e.target.closest("tr").id;
    const data = transactions.current.find((transaction) => {
      return transaction.id === parseInt(id);
    });
    setData(data);
    setActiveUpdate(true);

    if (show) {
      return setShow(false);
    }
    setShow(true);
    
    
   
  }
  
  return (
    <div>
      <div className="balance">
        <span>Balance: ${user.balance}</span> <br />
        <span>{category && `${category} total :$${amountCategory} `}</span>
      </div>

      <div className="filters">
        <Filters handleFilter={handleFilter} transactions={transactions}/>
      </div>
      <div className="addButton">
        <Button onClick={handleShow}>+</Button>
      </div>

      {active &&<div className="modal"><ModalTransaction  state={show} getTransactions={getTransactions} setTransactions={setTransactions} setActive={setActive}/></div>}
      {activeUpdate && <div className="modal"><ModalTransaction state={show} getTransactions={getTransactions} setTransactions={setTransactions} data={data} setActiveUpdate={setActiveUpdate}/></div>}
      <div className="tableContainer">
      <Table className="table" striped bordered hover>
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
          {transactions.current?.map((transaction, index) => {
            return <TransactionRender key={index} data={transaction} handleOnclik={handleOnclik} />;
          })}
        </tbody>
      </Table>
      </div>
      
    </div>
  );
};

export default Transaction;
