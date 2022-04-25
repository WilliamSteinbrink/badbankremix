import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardComp from './card';

function Deposit(){
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState('');  
  
    return (
      <CardComp
        bgcolor="warning"
        txtcolor="black"
        header="Deposit"
        status={status}
        body={show ? 
          <DepositForm setShow={setShow} setStatus={setStatus}/> :
          <DepositMsg setShow={setShow} setStatus={setStatus}/>}
      />
    )
  }
  
  function DepositMsg(props){
    return (<>
      Success
      <Button type="submit" 
        variant="dark" 
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
        }}>
          Deposit again
      </Button>
    </>);
  } 
  
  function DepositForm(props){
    const [email, setEmail]   = useState('');
    const [amount, setAmount] = useState('');
  
    function handle(){
      fetch(`/account/update/${email}/${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus(JSON.stringify(data.value));
              props.setShow(false);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Deposit failed')
              console.log('err:', text);
          }
      });
    }
  
    return(<>
  
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
        
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <Button type="submit" 
        variant="dark" 
        onClick={handle}>Deposit</Button>
  
    </>);
  }

  export default Deposit