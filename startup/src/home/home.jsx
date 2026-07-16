import React from 'react';
import Button from 'react-bootstrap/Button';

export function Home() {
    const [deed, setDeed] = React.useState('Awaiting Inspiration...');
    const [inspo, setInpo] = React.useState('...something great is coming!');
    {/*These will access a data base later, placeholder for now*/}
    const [streak, setStreak] = React.useState(localStorage.getItem('streak') || 0);
    const [dayCount, setDayCount] = React.useState(localStorage.getItem('dayCount') || 7);
    const [totalCount, setTotalCount] = React.useState(localStorage.getItem('totalCount') || 107);
    const [lastCompleted, setLastCompleted] = React.useState(localStorage.getItem('lastCompleted') || null);
    

    React.useEffect(() => {
        {/*These will request from DB*/}
        setDeed('Hold the door open for a stranger');
        setInpo('A small gesture that takes two seconds, but can brighten someone\'s entire day.')
    }, []);

    return (
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
                        <h4 className="card-title">{deed}</h4>
                        <h6 className="card-text text-center mb-3">{inspo}</h6>
                        <Button>
                            <button type="submit" className="btn btn-primary mx-1">I did it!</button>
                        </Button>
                    </div>
                    <div className="card-footer"></div>
                </div>

                <div className="card mx-2">
                    <h4 className="card-title text-center pt-2">🔥<span>3</span>-day🔥streak!</h4>
                    <div className="card-footer text-center">You've done goood <span>3</span> days running. Keep Going!</div>
                </div>
            </main>
    );
}