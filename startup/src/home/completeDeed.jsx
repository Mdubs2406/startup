import Button from 'react-bootstrap/Button';

export function CompleteDeed({ globalStats, setGlobalStats, userStats, setUserStats }) {

    function updateStats() {
        const today = new Date().toDateString();

        // to simulate updaing data in server
        let newGlobalStats = {
            ...globalStats,
            dayCount: globalStats.dayCount + 1,
            totalCount: globalStats.totalCount + 1
        };

        let newUserStats = {...userStats};

        if (userStats.lastCompleted !== today) {
            newUserStats = {
                ...userStats,
                streak: userStats.streak + 1,
                lastCompleted: today
            };
        };

        setGlobalStats(newGlobalStats);
        setUserStats(newUserStats);
        localStorage.setItem('globalStats', JSON.stringify(newGlobalStats));
        localStorage.setItem('userStats', JSON.stringify(newUserStats));
    }

    return (
        <Button onClick={updateStats}>
            I did it!
        </Button>
    );
}