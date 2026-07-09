import React from 'react';

export function Journal() {
    return (
        <main class="py-3">
                <section id="create-entry" class="card shadow-sm mb-3 mx-2">
                    <h3 class="card-header">Create a Journal Entry</h3>
                    <div class="card-body">
                        <form method="post" action="journal.html">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Date</span>
                                <input 
                                    type="date" 
                                    id="entry-date" 
                                    name="entry-date"
                                    class="form-control"
                                    required />
                                <span class="input-group-text">Time</span>
                                <input 
                                    type="time" 
                                    name="entry-time" 
                                    id="entry-time"
                                    class="form-control"
                                    required />
                            </div>
                            <div class="mb-2">
                                <textarea 
                                    name="entry-desc" 
                                    id="entry-desc" 
                                    placeholder="How did it go?"
                                    rows="5"
                                    class="form-control"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary mx-1">Record Entry</button>
                            <button type="reset" class="btn btn-secondary mx-1">Clear</button>
                        </form>
                    </div>
                </section>

                <section id="entries-display" class="card mx-2">
                    {/* DB Placeholder. Will recall journal entries from DB */}
                <h3 class="card-header">A Record of my Accomplishments</h3>
                <table class="card-body table table-striped-columns">
                    <thead class="table-light">
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