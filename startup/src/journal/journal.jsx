import React from 'react';
import { NewEntry } from './newEntry';
import { DisplayJournal } from './displayJournal';

export function Journal() {
    return (
        <main className="py-3">
            <NewEntry />
            <DisplayJournal />
        </main>
    );
}