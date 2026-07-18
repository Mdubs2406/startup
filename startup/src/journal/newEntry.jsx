import React from "react";
import { Journal } from "./journal";

export function NewEntry({ setJournal}) {
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [desc, setDesc] = React.useState('');

  function logEntry(date, time, desc) {
    const newEntry = {date, time, desc};
    setJournal(entrys => [newEntry, ...entrys]);
  }

  return(
    <section id="create-entry" className="card shadow-sm mb-3 mx-2">
      <h3 className="card-header">Create a Journal Entry</h3>
      <div className="card-body">
        <form onSubmit={(x) => {
          x.preventDefault();
          logEntry(date, time, desc);

          setDate('');
          setTime('');
          setDesc('');
        }}
        >
          <div className="input-group mb-2">
            <span className="input-group-text">Date</span>
            <input
              type="date"
              id="entry-date"
              name="entry-date"
              className="form-control"
              required 
              value={date}
              onChange={(x) => setDate(x.target.value)}
              />
            <span className="input-group-text">Time</span>
            <input
              type="time"
              name="entry-time"
              id="entry-time"
              className="form-control"
              required 
              value={time} 
              onChange={(x) => setTime(x.target.value)}
              />
          </div>
          <div className="mb-2">
            <textarea
              name="entry-desc"
              id="entry-desc"
              placeholder="How did it go?"
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
            >Record Entry</button>
          <button 
            type="reset" 
            className="btn btn-secondary mx-1"
            onClick={() => {
              setDate('');
              setTime('');
              setDesc('');
            }}
            >Clear</button>
        </form>
      </div>
    </section>
  );
}