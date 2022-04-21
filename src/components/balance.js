import { React, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context';
import { Link } from 'react-router-dom';
import CardComp from './card';

function Balance() {
  const [ show, setShow ] = useState(true);
  const [ status, setStatus ] = useState('');
  const [ email, setEmail ] = useState('');
  const ctx = useContext(UserContext);
  const userIndex = ctx.users.findIndex(el => {
    return el.email === email;
  });

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

  function handleBalance() {
    // validating amount and email fields
    if (!validateEmail(email)) return;
    setShow(false);
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
            <Button type="submit" className="text-center" disabled={!email} variant="dark" style={{maxWidth: '20rem'}} onClick={handleBalance}>Show Balance</Button>
            </>
        ):(
            <>
            Your current balance is ${ctx.users[userIndex].balance}.<br/>
            <Button as={Link} className="text-center" variant="dark" style={{maxWidth: '20rem'}} to="/deposit/">Make A Deposit</Button>
            <Button as={Link} className="text-center" variant="dark" style={{maxWidth: '20rem'}} to="/withdraw/">Make A Withdrawal</Button>
            </>
        )
        }
        title="Withdraw From Your Account"
        text={ctx.users[userIndex] ? `Your current balance is: $${ctx.users[userIndex].balance}.` : 'Please enter email or create an account.' }>
      </CardComp>
  )
}

export default Balance;