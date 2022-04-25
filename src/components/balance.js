import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardComp from './card';

function Balance(){
  const [show, setShow]     = useState(true);
  const [status, setStatus] = useState('');  

  return (
    <CardComp
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    Success!
    <Button type="submit" 
      varient="dark"
      txtcolor="black"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </Button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = useState('');
  const [balance, setBalance] = useState('');  

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(text);
            props.setShow(false);
            // setBalance(user.balance);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <Button type="submit" 
      variant="dark" 
      onClick={handle}>
        Check Balance
    </Button>

  </>);
}

export default Balance;