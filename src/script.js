function fetchSchedule() {
    fetch('schedule.txt')
        .then(response => response.text())
        .then(data => {
            let scheduleLines = data.split('\n');
            displayCurrentSubject(scheduleLines);
        })
        .catch(error => console.error('Error fetching the schedule:', error));
}

function displayCurrentSubject(scheduleLines) {
    let now = new Date();
    let currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    let currentTime = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

    let currentSubject = "No subject at this time.";

    scheduleLines.forEach(line => {
        let [day, timeRange, subject] = line.split(',');
        if (day === currentDay) {
            let [startTime, endTime] = timeRange.split('-');
            if (currentTime >= startTime && currentTime <= endTime) {
                currentSubject = subject;
            }
        }
    });

    document.getElementById('current-subject').textContent = currentSubject;
}

// Update the schedule every minute
setInterval(fetchSchedule, 60000);

// Initial load
fetchSchedule();
