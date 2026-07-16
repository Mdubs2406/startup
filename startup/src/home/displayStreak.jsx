import React from "react";

export function DisplayStreak(streak) {
    return (
        <div>
            <h4 className="card-title text-center pt-2">🔥<span>{streak}</span>-day🔥streak!</h4>
            <div className="card-footer text-center">You've done goood <span>{streak}</span> days running. Keep Going!</div>
        </div>
    );
};

export function NoStreak() {
    return (
        <div>
            <h4 className="card-title text-center pt-2">No Streak Yet</h4>
            <div className="card-footer text-center">Do a good deed to start you journey of postive change!</div> 
        </div>
    )
}