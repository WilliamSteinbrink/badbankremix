import { React, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context';
import CardComp from './card';

function Deposit() {
  const [ show, setShow ] = useState(true);
  const [ status, setStatus ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ email, setEmail ] = useState('');
  const ctx = useContext(UserContext);
  const userIndex = ctx.users.findIndex(el => {
    return el.email === email;
  });

  // Check to see if amount field is a valid number
  function validate(field) {
      
      if (!field) {
          // Checking to make sure there is an entry in amount field
          setStatus('Error: enter a number');
          setTimeout(() => setStatus(''), 3000);
          return false;
      } else if (isNaN(amount)) {
          // Checking amount field is a number
          setStatus('Error: enter a valid number.');
          setTimeout(() => setStatus(''), 3000);
          return false;
      } else if (amount <=0) {
          // Checking amount is greater than 0
          setStatus('Error: deposit must be positive.');
          setTimeout(() => setStatus(''), 3000);
          return false;
      }
      return true;
  }

  // Checking for valid email address of an existing user account
  function validateEmail(field) {
      if (!field) {
          // Check that email field is filled in.
          setStatus('Error: enter a valid email');
          setTimeout(() => setStatus(''), 3000);
          return false;
      } else if (!ctx.users.some(e => e.email === email)) {
          // Check that email field is an email of a user account
          console.log(ctx.users.some(e => e.email === email));
          setStatus('Enter a valid email or create an account');
          setTimeout(() => setStatus(''), 3000);
          return false;
      }
      return true;
  }
  
  function handleDeposit() {
      console.log(amount);
      // validating amount and email fields
      if (!validate(amount)) return;
      if (!validateEmail(email)) return;
      ctx.users[userIndex].balance += parseInt(amount);
      setShow(false);
  }
  
  function clearForm(){
      setAmount(0);
      setShow(true);
  }

  return (
      <CardComp
        bgcolor="light"
        txtcolor="black"
        header="Deposit"
        status={status}
        body={show ? (
            <>
            Email<br/>
            <input type="input" className="form-control" id="depositEmail" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
            Amount<br/>
            <input type="input" className="form-control" id="amount" disabled={!email} placeholder="Enter Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
            <Button type="submit" className="text-center" disabled={!amount} variant="dark" style={{maxWidth: '20rem'}} onClick={handleDeposit}>Make a Deposit</Button>
            </>
        ):(
            <>
            Success!<br/>
            You have deposited ${amount} to your account.<br/>
            Your new balance is ${ctx.users[userIndex].balance}.<br/>
            <Button type="submit" className="text-center" variant="dark" style={{maxWidth: '20rem'}} onClick={clearForm}>Make Another Deposit</Button>
            </>
        )
        }
        title="Deposit To Your Account"
        text={ctx.users[userIndex] ? `Your current balance is: $${ctx.users[userIndex].balance}.` : 'Please enter email or create an account.' }>
      </CardComp>
  );
}
export default Deposit;