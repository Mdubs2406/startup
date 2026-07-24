import React from 'react';
import { NewEntry } from './newEntry';
import { DisplayJournal } from './displayJournal';
import { ErrorDisplay } from "../notification/errorDisplay";

export function Journal() {
  const [journal, setJournal] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/journal`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.msg || 'Could not retrieve journal entries');
        }

        return res.json();
      })
      .then((data) => {
        setJournal(data)
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  return (
    <main className="py-3">
      <NewEntry setJournal={setJournal} />
      <DisplayJournal journal={journal} />
      <ErrorDisplay msg={errorMsg} dismiss={() => setErrorMsg(null)} />
    </main>
  );
}