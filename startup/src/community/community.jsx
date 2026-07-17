import React from 'react';
import { MakePost } from './makePost';
import { MakeTable } from './makeTable';

export function Community() {
    
    return (
        <main className="py-3">
            <MakePost />
            <MakeTable />
        </main>
    );
}