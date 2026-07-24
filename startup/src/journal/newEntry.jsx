import React from "react";

export function NewEntry({ setJournal}) {
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);

  async function logEntry(date, time, desc) {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/journal/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ date, time, desc }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg || 'Could not save to journal');
      }

      const data = await res.json();
      setJournal(data);
      return true;

    } catch (error) {
      setErrorMsg(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return(
    <>
    <section id="create-entry" className="card shadow-sm mb-3 mx-2">
      <h3 className="card-header">Create a Journal Entry</h3>
      <div className="card-body">
        <form onSubmit={async (x) => {
          x.preventDefault();

          const success = await logEntry(date, time, desc);

          if (success) {
            setDate('');
            setTime('');
            setDesc('');
          }
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
            disabled={loading}
            >Record Entry</button>
          <button 
            type="button" 
            className="btn btn-secondary mx-1"
            onClick={() => {
              setDate('');
              setTime('');
              setDesc('');
            }}
            disabled={loading}
            >Clear</button>
        </form>
      </div>
    </section>

    <ErrorDisplay msg={errorMsg} dismiss={() => setErrorMsg(null)} />
    </>
  );
}