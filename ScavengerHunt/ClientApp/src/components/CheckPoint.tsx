import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Button, Label } from 'reactstrap';

export const CheckPoint = () => {
  const [name, setName] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);
  const [error, setError] = useState(false);
  const checkPointId = new URLSearchParams(useLocation().search).get('check_point_id');
  const invalidCheckPoint = !checkPointId || checkPointId.length !== 36;

  if (invalidCheckPoint || error) {
    return (
      <>
        <h1>Something went wrong. Try scanning the QR code again.</h1>
      </>);
  }

  if (checkedIn) {
    return (
      <>
        <h1>Nice work {name}! Thanks for checking in!</h1>
      </>);
  }

  const checkIn = () => {
    const request = { checkPointId, name };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(
      '/checkin',
      { method: 'POST', body: JSON.stringify(request), headers })
      .then(response => {
        if (response.ok) {
          setCheckedIn(true);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  };

  return (
    <div className='container-fluid'>
      <h1>You Found It!</h1>
      <h3>Please enter your name so that we know that you found it and then click OK</h3>
      <div>
        <input
          type='text'
          className='form-control'
          placeholder='Your Name'
          onChange={(e) => setName(e.target.value)} />
      </div>
      <br />
      <Button
        onClick={checkIn}
        disabled={!name}>
        OK</Button>
    </div>);
};
