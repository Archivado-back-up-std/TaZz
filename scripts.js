document.addEventListener('DOMContentLoaded', function() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRYJzOYle6zdNJBGJfJIOFuxqXUhTfPJldS3kq9-eykBzAgjEgtPE5Ll0aTwA3TifzwcAQt_qWE-A1W/pub?output=csv';
    const container = document.getElementById('table-container');

    fetch(csvUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').filter(row => row.trim() !== '');
            if (rows.length < 2) {
                container.innerHTML = '<p>No data available.</p>';
                return;
            }

            // Remove header row
            rows.shift();

            let tableHtml = '<table>';
            tableHtml += '<thead><tr><th>Nro</th><th>Name</th><th>Start</th><th>End</th><th>Duration</th><th>Link</th></tr></thead>';
            tableHtml += '<tbody>';

            rows.forEach(row => {
                const columns = row.split(',');
                if (columns.length !== 6) {
                    return; // Skip invalid rows
                }
                const [nro, name, start, end, duration, link] = columns.map(col => col.trim());
                const linkHtml = link ? `<a href="${link}" target="_blank">Link</a>` : 'N/A';
                tableHtml += `<tr><td>${nro}</td><td>${name}</td><td>${start}</td><td>${end}</td><td>${duration}</td><td>${linkHtml}</td></tr>`;
            });

            tableHtml += '</tbody></table>';
            container.innerHTML = tableHtml;
        })
        .catch(error => {
            console.error('Error fetching or parsing CSV:', error);
            container.innerHTML = '<p>Error loading data. Please try again later.</p>';
        });
});