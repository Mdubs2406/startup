import React from 'react';
import { MakePost } from './makePost';
import { MakeTable } from './makeTable';
import { ErrorDisplay } from '../notification/errorDisplay';
import { addWebSocketHandler, removeWebSocketHandler } from '../websocket/websocket';

export function Community() {
  const [comPosts, setComPosts] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);

  function handleWebSocketEvent(event) {
    if (event.type === 'NEW_COMMUNITY_POST') {
      setComPosts((currentPosts) => [...currentPosts, event.data.post]);
    }
  }

  React.useEffect(() => {
    addWebSocketHandler(handleWebSocketEvent);

    return () => {
      removeWebSocketHandler(handleWebSocketEvent);
    }
  }, []);

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
      <MakePost />
      <MakeTable comPosts={comPosts} />
      <ErrorDisplay msg={errorMsg} dismiss={() => setErrorMsg(null)} />
    </main>
  );
}
