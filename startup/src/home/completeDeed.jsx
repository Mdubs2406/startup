import Button from 'react-bootstrap/Button';

export function CompleteDeed({ stats, setStats }) {

    function updateStats() {
        const today = new Date().toDateString();

        let updatedStats = {
            ...stats,
            dayCount: stats.dayCount + 1,
            totalCount: stats.totalCount + 1
        };

        if (stats.lastCompleted !== today) {
            updatedStats = {
                ...updatedStats,
                streak: stats.streak + 1,
                lastCompleted: today
            }
        };

        setStats(updatedStats);
        localStorage.setItem('stats', JSON.stringify(updatedStats));
    }

    return (
        <Button onClick={updateStats}>
            I did it!
        </Button>
    );
}