import { React, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context';
import CardComp from './card';

function Withdraw() {
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
          setStatus('Error: Withdrawal amount must be positive.');
          setTimeout(() => setStatus(''), 3000);
          return false;
      } else if (amount > ctx.users[userIndex].balance) {
        // Checking if amount is greater than user's balance
        setStatus('Error: Not enough funds.');
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
  
  function handleWithdraw() {
      console.log(amount);
      // validating amount and email fields
      if (!validate(amount)) return;
      if (!validateEmail(email)) return;
      ctx.users[userIndex].balance -= parseInt(amount);
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
        header="Withdraw"
        status={status}
        body={show ? (
            <>
            Email<br/>
            <input type="input" className="form-control" id="withdrawEmail" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
            Amount<br/>
            <input type="input" className="form-control" id="amount" disabled={!email} placeholder="Enter Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
            <Button type="submit" className="text-center" disabled={!amount} variant="dark" style={{maxWidth: '20rem'}} onClick={handleWithdraw}>Make a Withdrawal</Button>
            </>
        ):(
            <>
            Success!<br/>
            You have withdrawn ${amount} from your account.<br/>
            Your new balance is ${ctx.users[userIndex].balance}.<br/>
            <Button type="submit" className="text-center" variant="dark" style={{maxWidth: '20rem'}} onClick={clearForm}>Make Another withdrawal</Button>
            </>
        )
        }
        title="Withdraw From Your Account"
        text={ctx.users[userIndex] ? `Your current balance is: $${ctx.users[userIndex].balance}.` : 'Please enter email or create an account.' }>
      </CardComp>
  );
}
export default Withdraw;