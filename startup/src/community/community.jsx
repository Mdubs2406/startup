import React from 'react';
import { MakePost } from './makePost';
import { MakeTable } from './makeTable';
import { ErrorDisplay } from '../notification/errorDisplay';

export function Community({ setShow }) {
  const [comPosts, setComPosts] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/community`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.msg || 'Could not get posts');
        }

        return res.json();
      })
      .then((data) => {
        setComPosts(data)
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  return (
    <main className="py-3">
      <MakePost setComPosts={setComPosts} setShow={setShow} />
      <MakeTable comPosts={comPosts} />
      <ErrorDisplay msg={errorMsg} dismiss={() => setErrorMsg(null)} />
    </main>
  );
}