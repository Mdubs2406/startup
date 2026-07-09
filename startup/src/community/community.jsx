import React from 'react';

export function Community() {
    return (
        <main className="py-3">
                <section id="create-post" className="card mb-3 mx-2">
                    <h3 className="card-header">Post about a Service Opportunity</h3>
                    <div className="card-body">
                        <form method="post" action="community.html">
                            <div className="input-group mb-2">
                                <span className="input-group-text">Event Name</span>
                                <input type="text" id="event-name" name="event-name" className="form-control"/>
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">Location</span>
                                <input type="text" id="event-location" name="event-location" className="form-control"/>
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text">Date</span>
                                <input type="date" id="event-date" name="event-date" className="form-control"/>
                                <span className="input-group-text">Time</span>
                                <input type="time" id="event-time" name="event-time"className="form-control"/>
                            </div>
                            <div className="mb-2">
                                <textarea name="event-description" id="event-desc" placeholder="Event Description" rows="5" className="form-control"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary mx-1">Post</button>
                            <button type="reset" className="btn btn-secondary mx-1">Clear</button>
                        </form>
                    </div>
                </section>

                <section id="posts-display" className="card mx-2">
                    {/* DB Placeholder. Will recall community posts stored in the database */}
                    <h3 className="card-header">Service Opportunities in your Community</h3>
                    <table className="card-body table table-striped-columns">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Park Clean Up</td>
                                <td>Help clean up City Park!</td>
                                <td>Aug 14th, 2026</td>
                                <td>10:00 AM</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
        </main>
    );
}