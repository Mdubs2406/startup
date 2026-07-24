import React from 'react';

import { DisplayStreak, NoStreak } from './displayStreak';
import { ErrorDisplay } from '../notification/errorDisplay';

export function Home() {
    const [totalCount, setTotalCount] = React.useState(0);
    const [dayCount, setDayCount] = React.useState(0);
    const [userStreak, setUserStreak] = React.useState(0);
    const [deedDesc, setDeedDesc] = React.useState('Hold the door open for a stranger');
    const [deedSnip, setDeedSnip] = React.useState('A small gesture that takes two seconds, but can brighten someone\'s entire day.');
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState(null);

    React.useEffect(() => {
        fetch(`/api/home`)
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.msg || 'Could not update stats');
                }

                return res.json();
            })
            .then((data) => {
                setTotalCount(data.totalCount);
                setDayCount(data.dayCount);
                setUserStreak(data.streak);
                setDeedDesc(data.currentDeed.desc);
                setDeedSnip(data.currentDeed.snip);
            })
            .catch((error) => {
                setErrorMsg(error.message);
            });
    }, []);

    async function updateHome() {
        setLoading(true);

        try {
            const res = await fetch('/api/home/count');

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.msg || 'Could not update stats');
            }

            const data = await res.json();

            setTotalCount(data.totalCount);
            setDayCount(data.dayCount);
            setUserStreak(data.streak);
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Simulates WebSocket updating the Deed Count
    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //         setGlobalStats(e => {
    //             const newStats = { 
    //                 dayCount: e.dayCount + 1,
    //                 totalCount: e.totalCount + 1
    //             };
    //             localStorage.setItem('globalStats', JSON.stringify(newStats));
    //             return newStats;
    //         });
    //     }, 5000);
    // }, []);

    return (
        <>
            <main className="py-3">
                <div className="row justify-content-evenly mb-3">
                    {/* Websocket Placeholder. Counts will updated in realtime */}
                    <div id="deed-count-daily"className="col-auto display-6 border border-light rounded pb-1">
                        <span className="fw-bold me-3">{dayCount}</span> 
                        Good Deeds Today
                    </div>
                    <div id="deed-count-total" className="col-auto display-6 border border-light rounded pb-1">
                        <span className=" me-3">{totalCount}</span> 
                        Total Good Deeds
                    </div>
                </div>

                <div className="card w-auto mb-3 mx-2">
                    <h3 className="card-header text-center">
                        Everyday Kindness
                    </h3>
                    <div className="card-body text-center">
                        <h4 className="card-title">{deedDesc}</h4>
                        <h6 className="card-text text-center mb-3">{deedSnip}</h6>
                        <button
                            className="btn btn-primary mx-1"
                            onClick={updateHome}
                            disabled={loading}
                        >I did it!</button>
                    </div>
                    <div className="card-footer"></div>
                </div>

                <div className="card mx-2">
                    {userStreak !== 0 && <DisplayStreak streak={userStreak} />}
                    {userStreak === 0 && <NoStreak />}
                </div>
            </main>

            <ErrorDisplay msg={errorMsg} dismiss={() => setErrorMsg(null)} />
        </>
    );
};