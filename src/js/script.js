function fetchSchedule(schedulePath) {
    fetch(schedulePath)
        .then(response => response.text())
        .then(text => {
            const schedule = text.split('\n').map(line => line.split(','));
            const now = new Date();
            const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
            const currentTime = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');

            let currentSubject = "No Class";

            for (let entry of schedule) {
                const [day, timeRange, subject] = entry;
                if (day !== currentDay) continue;

                const [startTime, endTime] = timeRange.split('-');
                if (currentTime >= startTime && currentTime <= endTime) {
                    currentSubject = subject;
                    break;
                }
            }

            document.getElementById('subject').innerText = currentSubject;
        })
        .catch(err => console.error("Error fetching schedule: ", err));
}
