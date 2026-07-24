import React from 'react';
import { MakePost } from './makePost';
import { MakeTable } from './makeTable';

export function Community({ setShow }) {
    const [comPosts, setComPosts] = React.useState([]);

    async function getPost() {
        
    }
    
    return (
        <main className="py-3">
            <MakePost setComPosts={setComPosts}/>
            <MakeTable comPosts={comPosts}/>
        </main>
    );
}