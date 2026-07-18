import React from 'react';
import { MakePost } from './makePost';
import { MakeTable } from './makeTable';

export function Community({ comPosts, setComPosts}) {
    
    return (
        <main className="py-3">
            <MakePost setComPosts={setComPosts}/>
            <MakeTable comPosts={comPosts}/>
        </main>
    );
}