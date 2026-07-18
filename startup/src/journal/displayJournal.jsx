import React from "react";

export function DisplayJournal({ journal }) {
  const journalRows = [];
  if (journal.length) {
    for (const [i, entry] of journal.entries()) {
      journalRows.push(
        <tr key={i}>
          <td>{entry.date}</td>
          <td>{entry.time}</td>
          <td>{entry.desc}</td>
        </tr>
      );
    }
  } else {
    journalRows.push(
      <tr key='empty'>
        <td colSpan='4' className='text-center'>Start recording your story of kindness!</td>
      </tr>
    )
  }

  return(
    <section id="entries-display" className="card mx-2">
      {/* DB Placeholder. Will recall journal entries from DB */}
      <h3 className="card-header">A Record of my Accomplishments</h3>
      <table className="card-body table table-striped-columns">
        <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{journalRows}</tbody>
      </table>
    </section>
  );
}