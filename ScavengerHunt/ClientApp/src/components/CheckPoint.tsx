import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Row, Col, Container, Button, Spinner } from 'reactstrap';

export const CheckPoint = () => {
  const checkPointId = new URLSearchParams(useLocation().search).get('check_point_id');
  const [fetchingCheckPoint, setFetchingCheckPoint] = useState(false);
  const [checkPointName, setCheckPointName] = useState('');
  const [checkPointImage, setCheckPointImage] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [postingVisit, setPostingVisit] = useState(false);
  const [visitPosted, setVisitPosted] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!checkPointId) {
      setError('This doesn\'t appear to be a valid checkpoint.');
      return;
    }

    setFetchingCheckPoint(true);

    fetch(`api/checkpoint/${checkPointId}`, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          response.json().then(checkPoint => {
            setCheckPointName(checkPoint.name);
            setCheckPointImage(checkPoint.image);
          });
        } else if (response.status === 404) {
          setError('This doesn\'t appear to be a valid check point.');
        } else {
          setError('Failed to fetch checkpoint details.');
        }
        setFetchingCheckPoint(false);
      })
      .catch(() => setError('Failed to fetch checkpoint details.'));
  }, [checkPointId]);

  const visitCheckPoint = () => {
    setPostingVisit(true);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`api/checkpoint/${checkPointId}/visit`, { method: 'POST', body: JSON.stringify({ playerName }), headers })
      .then(response => {
        if (response.ok) {
          setVisitPosted(true);
        } else {
          setError('Failed to post checkpoint visit.');
        }
        setPostingVisit(false);
      })
      .catch(() => setError('Failed to post checkpoint visit'));
  };

  if (fetchingCheckPoint) {
    return (<Busy message='Fetching checkpoint details...' />);
  }

  if (postingVisit) {
    return (<Busy message='Posting checkpoint visit...' />);
  }

  if (error) {
    return (
      <>
        <h3>Something went wrong!</h3>
        <p>{error}</p>
        <p>Try scanning the checkpoint QR code again.</p>
      </>);
  }

  if (visitPosted) {
    return (
      <>
        <h3>Nice work {playerName}!</h3>
        <p>Thanks for visiting this checkpoint!</p>
        {checkPointImage &&
          <img
            src={`${process.env.PUBLIC_URL}/images/${checkPointImage}`}
            style={{maxHeight: '100%', maxWidth: '100%'}}/>}
      </>);
  }

  return (
    <div className='container-fluid'>
      <h3>You found the {checkPointName} checkpoint!</h3>
      <p>To let us know that you found the checkpoint, enter your name and click Found It</p>
      <form>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Your Name'
            onChange={(e) => setPlayerName(e.target.value)} />  
        </div>
        <Button
          onClick={visitCheckPoint}
          disabled={!playerName}>
          Found It</Button>
      </form>
      <br />
      {checkPointImage &&
        <img
          src={`${process.env.PUBLIC_URL}/images/${checkPointImage}`}
          style={{maxHeight: '100%', maxWidth: '100%'}}/>}
    </div>);
};

interface BusyProps {
  message: string;
}

const Busy = (props: BusyProps) => {
  return (
    <div style={{textAlign: 'center'}}>
      <Spinner>&nbsp;</Spinner>
      <p>{props.message}</p>
    </div>);
}
