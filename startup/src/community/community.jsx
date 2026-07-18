import React from 'react';
import { MakePost } from './makePost';
import { MakeTable } from './makeTable';

export function Community({ comPosts, setComPosts, setShow}) {
    
    return (
        <main className="py-3">
            <MakePost setComPosts={setComPosts} setShow={setShow}/>
            <MakeTable comPosts={comPosts}/>
        </main>
    );
}