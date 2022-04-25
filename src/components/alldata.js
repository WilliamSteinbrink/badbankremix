import React from 'react';
import { useState, useEffect } from 'react';
import CardComp from './card';

function AllData() {
  const [data, setData] = useState('');

  useEffect(() => {
    // fetch all acounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);

  return (
    <CardComp
      bgcolor="light"
      txtcolor="black"
      header='All User Data'
      body={data}
    />
  )
}

export default AllData;