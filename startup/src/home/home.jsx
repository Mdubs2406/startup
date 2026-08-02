import React from 'react';

import { DisplayStreak, NoStreak } from './displayStreak';
import { ErrorDisplay } from '../notification/errorDisplay';
import { addWebSocketHandler, removeWebSocketHandler } from '../websocket/websocket';

export function Home() {
  const [totalCount, setTotalCount] = React.useState(0);
  const [dayCount, setDayCount] = React.useState(0);
  const [userStreak, setUserStreak] = React.useState(0);
  const [deedDesc, setDeedDesc] = React.useState('Loading today\'s good deed...');
  const [deedSnip, setDeedSnip] = React.useState('A small act of kindness is on its way.');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [completedToday, setCompletedToday] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/home`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.msg || 'Could not update stats');
        }

        return res.json();
      })
      .then((data) => {
        setTotalCount(data.totalCount);
        setDayCount(data.dayCount);
        setUserStreak(data.streak);
        setCompletedToday(data.completedToday);
        setDeedDesc(data.currentDeed.desc);
        setDeedSnip(data.currentDeed.snip);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  async function updateHome() {
    setLoading(true);

    try {
      const res = await fetch('/api/home/count', {
        method: 'POST',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || 'Could not update stats');
      }

      const data = await res.json();

      setUserStreak(data.streak);
      setCompletedToday(true);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleWebSocketEvent(event) {
    if (event.type === 'DEED_COMPLETE') {
      setTotalCount(event.data.totalCount);
      setDayCount(event.data.dayCount);
    }
  }

  React.useEffect(() => {
    addWebSocketHandler(handleWebSocketEvent);

    return () => {
      removeWebSocketHandler(handleWebSocketEvent);
    }
  }, []);

  return (
    <>
      <main className="py-3">
        <div className="row justify-content-evenly mb-3">
          {/* Websocket Placeholder. Counts will updated in realtime */}
          <div id="deed-count-daily" className="col-auto display-6 border border-light rounded pb-1">
            <span className="fw-bold me-3">{dayCount}</span>
            Good Deeds Today
          </div>
          <div id="deed-count-total" className="col-auto display-6 border border-light rounded pb-1">
            <span className=" me-3">{totalCount}</span>
            Total Good Deeds
          </div>
        </div>

        <div className="card w-auto mb-3 mx-2">
          <h3 className="card-header text-center">
            Everyday Kindness
          </h3>
          <div className="card-body text-center">
            <h4 className="card-title">{deedDesc}</h4>
            <h6 className="card-text text-center mb-3">{deedSnip}</h6>
            <button
              className="btn btn-primary mx-1"
              onClick={updateHome}
              disabled={loading || completedToday}
            >{completedToday ? 'Completed Today' : 'I did it!'}</button>
          </div>
          <div className="card-footer"></div>
        </div>

        <div className="card mx-2">
          {userStreak !== 0 && <DisplayStreak streak={userStreak} />}
          {userStreak === 0 && <NoStreak />}
        </div>
      </main>

      <ErrorDisplay msg={errorMsg} dismiss={() => setErrorMsg(null)} />
    </>
  );
};