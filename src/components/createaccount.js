import { React, useState } from 'react';
import CardComp from './card';
import { Button } from 'react-bootstrap';

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');

  return (
    <CardComp
    bgcolor="light"
    txtcolor="dark"
    btncolor="dark"
    header="Create Account"
    status={status}
    body={show ?
      <CreateForm setShow={setShow}/> :
      <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props) {
  return(
    <>
      <p>Account Created!</p>
      <Button type="submit"
        variant="dark"
        onClick={() => props.setShow(true)}>Add Another Account</Button>
    </>
  );
};

function CreateForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handle() {
    console.log(name, email, password);
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    })();
    props.setShow(false);
  }

  return (
    <>
      Name<br/>
      <input type="input"
      className="form-control"
      placeholder='Enter name'
      value={name}
      onChange={e => setName(e.currentTarget.value)} /><br/>
      Email<br/>
      <input type="input"
      className="form-control"
      placeholder='Enter email'
      value={email}
      onChange={e => setEmail(e.currentTarget.value)} /><br/>
      Password<br/>
      <input type="password"
      className="form-control"
      placeholder='Enter password'
      value={password}
      onChange={e => setPassword(e.currentTarget.value)} /><br/>
      <Button type="submit"
        variant="dark"
        onClick={handle}>Create Account</Button>
    </>
  )
}

export default CreateAccount