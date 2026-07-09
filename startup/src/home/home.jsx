import React from 'react';

export function Home() {
    return (
        <main className="py-3">
                <div className="row justify-content-evenly mb-3">
                    {/* Websocket Placeholder. Counts will updated in realtime */}
                    <div id="deed-count-daily"className="col-auto display-6 border border-light rounded pb-1">
                        <span className="fw-bold">
                            3
                        </span> 
                        Good Deeds Today
                    </div>
                    <div id="deed-count-total" className="col-auto display-6 border border-light rounded pb-1">
                        <span className="fw-bold">
                            142
                        </span> 
                        Total Good Deeds
                    </div>
                </div>

                <div className="card w-auto mb-3 mx-2">
                    <h3 className="card-header text-center">
                        Everyday Kindness
                    </h3>
                    <div className="card-body text-center">
                        <h4 className="card-title">
                            Hold the door open for a stranger
                        </h4>
                        <h6 className="card-text text-center">
                            A small gesture that takes two seconds, but can brighten someone's entire day.
                        </h6>
                    </div>
                </div>

                <div className="card mx-2">
                    <h4 className="card-title text-center pt-2">🔥<span>3</span>-day🔥streak!</h4>
                    <div className="card-footer text-center">You've done goood <span>3</span> days running. Keep Going!</div>
                </div>
            </main>
    );
}