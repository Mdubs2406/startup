import React from 'react';

import { DisplayStreak, NoStreak } from './displayStreak';
import { CompleteDeed } from './completeDeed';

export function Home() {
    const [deed, setDeed] = React.useState('Awaiting Inspiration...');
    const [inspo, setInpo] = React.useState('...something great is coming!');
    {/*These will access a data base later, placeholder for now*/}
    const [globalStats, setGlobalStats] = React.useState({
        dayCount: 7,
        totalCount: 119
    })
    const [userStats, setUserStats] = React.useState({
        streak: 0,
        lastCompleted: null
    })

    React.useEffect(() => {
        const globalStatsText = localStorage.getItem('globalStats');
        if (globalStatsText) {
            setGlobalStats(JSON.parse(globalStatsText));
        }
    }, []);

    React.useEffect(() => {
        const userStatsText = localStorage.getItem('userStats');
        if (userStatsText) {
            setUserStats(JSON.parse(userStatsText));
        }
    }, []);
    
    React.useEffect(() => {
        setDeed('Hold the door open for a stranger');
        setInpo('A small gesture that takes two seconds, but can brighten someone\'s entire day.')
    }, []);

    // Simulates WebSocket updating the Deed Count
    React.useEffect(() => {
        const interval = setInterval(() => {
            setGlobalStats(e => {
                const newStats = {
                    dayCount: e.dayCount + 1,
                    totalCount: e.totalCount + 1
                };
                localStorage.setItem('globalStats', JSON.stringify(newStats));
                return newStats;
            });
        return () => clearInterval(interval);
    }, 3500);
    });

    return (
        <main className="py-3">
                <div className="row justify-content-evenly mb-3">
                    {/* Websocket Placeholder. Counts will updated in realtime */}
                    <div id="deed-count-daily"className="col-auto display-6 border border-light rounded pb-1">
                        <span className="fw-bold me-3">{globalStats.dayCount}</span> 
                        Good Deeds Today
                    </div>
                    <div id="deed-count-total" className="col-auto display-6 border border-light rounded pb-1">
                        <span className=" me-3">{globalStats.totalCount}</span> 
                        Total Good Deeds
                    </div>
                </div>

                <div className="card w-auto mb-3 mx-2">
                    <h3 className="card-header text-center">
                        Everyday Kindness
                    </h3>
                    <div className="card-body text-center">
                        <h4 className="card-title">{deed}</h4>
                        <h6 className="card-text text-center mb-3">{inspo}</h6>
                        <CompleteDeed globalStats={globalStats} setGlobalStats={setGlobalStats} userStats={userStats} setUserStats={setUserStats} />
                    </div>
                    <div className="card-footer"></div>
                </div>

                <div className="card mx-2">
                    {userStats.streak !== 0 && <DisplayStreak streak={userStats.streak} />}
                    {userStats.streak === 0 && <NoStreak />}
                </div>
            </main>
    );
};