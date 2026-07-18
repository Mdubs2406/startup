import React from "react";

export function NewEntry() {

  return(
    <section id="create-entry" className="card shadow-sm mb-3 mx-2">
      <h3 className="card-header">Create a Journal Entry</h3>
      <div className="card-body">
        <form method="post" action="journal.html">
          <div className="input-group mb-2">
            <span className="input-group-text">Date</span>
            <input
              type="date"
              id="entry-date"
              name="entry-date"
              className="form-control"
              required />
            <span className="input-group-text">Time</span>
            <input
              type="time"
              name="entry-time"
              id="entry-time"
              className="form-control"
              required />
          </div>
          <div className="mb-2">
            <textarea
              name="entry-desc"
              id="entry-desc"
              placeholder="How did it go?"
              rows="5"
              className="form-control"></textarea>
          </div>
          <button type="submit" className="btn btn-primary mx-1">Record Entry</button>
          <button type="reset" className="btn btn-secondary mx-1">Clear</button>
        </form>
      </div>
    </section>
  );
}