import React from 'react';

export function Home() {
    return (
        <main class="py-3">
                <div class="row justify-content-evenly mb-3">
                    {/* Websocket Placeholder. Counts will updated in realtime */}
                    <div id="deed-count-daily"class="col-auto display-6 border border-light rounded pb-1">
                        <span class="fw-bold">
                            3
                        </span> 
                        Good Deeds Today
                    </div>
                    <div id="deed-count-total" class="col-auto display-6 border border-light rounded pb-1">
                        <span class="fw-bold">
                            142
                        </span> 
                        Total Good Deeds
                    </div>
                </div>

                <div class="card w-auto mb-3 mx-2">
                    <h3 class="card-header text-center">
                        Everyday Kindness
                    </h3>
                    <div class="card-body text-center">
                        <h4 class="card-title">
                            Hold the door open for a stranger
                        </h4>
                        <h6 class="card-text text-center">
                            A small gesture that takes two seconds, but can brighten someone's entire day.
                        </h6>
                    </div>
                </div>

                <div class="card mx-2">
                    <h4 class="card-title text-center pt-2">🔥<span>3</span>-day🔥streak!</h4>
                    <div class="card-footer text-center">You've done goood <span>3</span> days running. Keep Going!</div>
                </div>
            </main>
    );
}