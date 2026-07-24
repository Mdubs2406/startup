import React from "react";
import { ErrorDisplay } from "../notification/errorDisplay";

export function MakePost({ setComPosts, setShow }) {
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);

  async function logPost(title, desc, date, time) {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/community/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ title, desc, date, time }),
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || 'Could not save post');
      } 

      const data = await res.json();
      setComPosts(data);
      return true;

      } catch (error) {
        setErrorMsg(error.message);
        return false;
      } finally {
        setLoading(false);
      }
    }

  return (
    <>
    <section id="create-post" className="card mb-3 mx-2">
      <h3 className="card-header">Post about a Service Opportunity</h3>
      <div className="card-body">
        <form onSubmit={async (x) => {
            x.preventDefault();

            const success = await logPost(title, desc, date, time);

            if (success) {
              setShow(true);
              setTitle('');
              setDate('');
              setDesc('');
              setTime('');
            }
          }}
        >
          <div className="input-group mb-2">
            <span className="input-group-text">Event Name</span>
            <input 
              type="text" 
              id="event-name" 
              name="event-name" 
              className="form-control" 
              required
              value={title} 
              onChange={(x) => setName(x.target.value)} />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text">Date</span>
            <input 
              type="date" 
              id="event-date" 
              name="event-date" 
              className="form-control" 
              required
              value={date} 
              onChange={(x) => setDate(x.target.value)} />
            <span className="input-group-text">Time</span>
            <input 
              type="time" 
              id="event-time" 
              name="event-time" 
              className="form-control" 
              required
              value={time} 
              onChange={(x) => setTime(x.target.value)} />
          </div>
          <div className="mb-2">
            <textarea 
              name="event-description" 
              id="event-desc" 
              placeholder="Event Description" 
              rows="5" 
              className="form-control"
              required
              value={desc}
              onChange={(x) => setDesc(x.target.value)}
              ></textarea>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary mx-1"
            disabled={loading}
            >Post</button>
          <button 
            type="button" 
            className="btn btn-secondary mx-1"
            onClick={() => {
              setTitle('');
              setDate('');
              setDesc('');
              setTime('');
            }}
            disabled={loading}
            >Clear</button>
        </form>
      </div>
    </section>

    <ErrorDisplay msg={errorMsg} dismiss={() => setErrorMsg(null)} />
    </>
  )
}