import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Button } from 'reactstrap';

export const CheckPoint = () => {
  const checkPointId = new URLSearchParams(useLocation().search).get('check_point_id');
  const [fetchingCheckPoint, setFetchingCheckPoint] = useState(false);
  const [checkPointName, setCheckPointName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [postingVisit, setPostingVisit] = useState(false);
  const [visitPosted, setVisitPosted] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!checkPointId) {
      setError('This doesn\'t appear to be a valid check point');
      return;
    }

    setFetchingCheckPoint(true);

    fetch(`api/checkpoint/${checkPointId}`, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          response.json().then(checkPoint => setCheckPointName(checkPoint.name));
        } else if (response.status === 404) {
          setError('This doesn\'t appear to be a valid check point');
        } else {
          setError('Something went wrong');
        }
        setFetchingCheckPoint(false);
      })
      .catch(() => setError('Something went wrong'));
  }, [checkPointId]);

  if (fetchingCheckPoint) {
    return (<Busy message='Fetching check point details...' />);
  }

  if (postingVisit) {
    return (<Busy message='Posting check point visit...' />);
  }

  if (error) {
    return (<><h1>{error}. Try scanning the check point QR code again.</h1></>);
  }

  if (visitPosted) {
    return (<><h1>Nice work {playerName}! Thanks for visiting this check point!</h1></>);
  }

  const visitCheckPoint = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`api/checkpoint/${checkPointId}/visit`, { method: 'POST', body: JSON.stringify({ playerName }), headers })
      .then(response => {
        if (response.ok) {
          setVisitPosted(true);
        } else {
          setError('Something went wrong');
        }
        setPostingVisit(false);
      })
      .catch(() => setError('Something went wrong'));
  };

  return (
    <div className='container-fluid'>
      <h1>You found the {checkPointName} check point!</h1>
      <h3>To let us know that you found the check point, enter your name and click Found It</h3>
      <div>
        <input
          type='text'
          className='form-control'
          placeholder='Your Name'
          onChange={(e) => setPlayerName(e.target.value)} />
      </div>
      <br />
      <Button
        onClick={visitCheckPoint}
        disabled={!playerName}>
        Found It</Button>
    </div>);
};

interface BusyProps {
  message: string;
}

const Busy = (props: BusyProps) => {
  return (<><h1>{props.message}</h1></>);
}
