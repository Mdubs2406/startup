import React from "react";

export function DisplayJournal({ journal }) {

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
        <tbody>
          <tr>
            <td>Nov. 8th, 2022</td>
            <td>3:55 PM</td>
            <td>Helped elderly heighbor mow lawn</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}