import React from 'react';

export function Journal() {
    return (
        <main className="py-3">
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
        </main>
    );
}