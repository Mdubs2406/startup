import React from 'react';

import { DisplayStreak, NoStreak } from './displayStreak';
import { CompleteDeed } from './completeDeed';

export function Home() {
    const [deed, setDeed] = React.useState('Awaiting Inspiration...');
    const [inspo, setInpo] = React.useState('...something great is coming!');
    {/*These will access a data base later, placeholder for now*/}
    const [stats, setStats] = React.useState({
        streak: 0,
        dayCount: 7,
        totalCount: 119,
        lastCompleted: null
    })

    React.useEffect(() => {
        const statsText = localStorage.getItem('stats');
        if (statsText) {
            setStats(JSON.parse(statsText));
        }
    }, []);
    
    React.useEffect(() => {
        setDeed('Hold the door open for a stranger');
        setInpo('A small gesture that takes two seconds, but can brighten someone\'s entire day.')
    }, []);

    return (
        <main className="py-3">
                <div className="row justify-content-evenly mb-3">
                    {/* Websocket Placeholder. Counts will updated in realtime */}
                    <div id="deed-count-daily"className="col-auto display-6 border border-light rounded pb-1">
                        <span className="fw-bold me-3">{stats.dayCount}</span> 
                        Good Deeds Today
                    </div>
                    <div id="deed-count-total" className="col-auto display-6 border border-light rounded pb-1">
                        <span className=" me-3">{stats.totalCount}</span> 
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
                        <CompleteDeed stats={stats} setStats={setStats} />
                    </div>
                    <div className="card-footer"></div>
                </div>

                <div className="card mx-2">
                    {stats.streak !== 0 && <DisplayStreak streak={stats.streak} />}
                    {stats.streak === 0 && <NoStreak />}
                </div>
            </main>
    );
}