import React from "react";

export function MakePost() {
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');

  function logPost(name, desc, date, time) {
    const newPost = { name, desc, date, time };
    const comPosts = JSON.parse(localStorage.getItem('comPosts')) || [];

    comPosts.unshift(newPost);
    localStorage.setItem('comPosts', JSON.stringify(comPosts));
  }

  function updatePost() {
    
  }

  return (
    <section id="create-post" className="card mb-3 mx-2">
      <h3 className="card-header">Post about a Service Opportunity</h3>
      <div className="card-body">
        <form onSubmit={(x) => {
            x.preventDefault();
            logPost(name, desc, date, time);

            
            setName('');
            setDate('');
            setDesc('');
            setTime('');
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
              value={name} 
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
            >Post</button>
          <button 
            type="button" 
            className="btn btn-secondary mx-1"
            onClick={() => {
              setName('');
              setDate('');
              setDesc('');
              setTime('');
            }}
            >Clear</button>
        </form>
      </div>
    </section>
  )
}