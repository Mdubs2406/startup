import React from 'react';
import { NewEntry } from './newEntry';
import { DisplayJournal } from './displayJournal';

export function Journal() {
    const [journal, setJournal] = React.useState(() => {
        return JSON.parse(localStorage.getItem("journal")) || [];
    });
    React.useEffect(() => {
        localStorage.setItem("journal", JSON.stringify(journal));
    }, [journal]);

    return (
        <main className="py-3">
            <NewEntry setJournal={setJournal}/>
            <DisplayJournal journal={journal}/>
        </main>
    );
}