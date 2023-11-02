document.getElementById("eventForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const eventName = document.getElementById("eventName").value;
    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    const endDate = document.getElementById("endDate").value;
    const endTime = document.getElementById("endTime").value;

    const eventObj = {
        eventName: eventName,
        startDateTime: `${startDate} ${startTime}`,
        endDateTime: `${endDate} ${endTime}`
    };

    fetch('/api/addEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventObj)
    })
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById("eventTable");
        const newRow = table.insertRow(-1);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.innerHTML = data.eventName;
        cell2.innerHTML = data.startDateTime;
        cell3.innerHTML = data.endDateTime;

        document.getElementById("eventName").value = "";
        document.getElementById("startDate").value = "";
        document.getElementById("startTime").value = "";
        document.getElementById("endDate").value = "";
        document.getElementById("endTime").value = "";
    })
    .catch(error => console.error('Error:', error));
});
