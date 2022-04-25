import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardComp from './card';

function Withdraw(){
  const [show, setShow]     = useState(true);
  const [status, setStatus] = useState('');  

  return (
    <CardComp
      bgcolor="success"
      txtcolor="black"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <Button type="submit" 
      variant="dark" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Make Another Withdrawal
    </Button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/update/${email}/-${amount}`)
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
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <Button type="submit" 
      variant="dark" 
      onClick={handle}>
        Withdraw
    </Button>

  </>);
}

export default Withdraw