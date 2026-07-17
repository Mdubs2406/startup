import React from 'react';
import { MakePost } from './makePost';
import { MakeTable } from './makeTable';

export function Community() {
    const [comPosts, setComPosts] = React.useState(() => {
        return JSON.parse(localStorage.getItem("comPosts")) || [];
    });

    React.useEffect(() => {
        localStorage.setItem("comPosts", JSON.stringify(comPosts));
    }, [comPosts]);

    return (
        <main className="py-3">
            <MakePost setComPosts={setComPosts}/>
            <MakeTable comPosts={comPosts}/>
        </main>
    );
}