const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const studentChart = document.getElementById('studentChart').getContext('2d');

let students = [];
let chartInstance;

studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const enrollmentNo = document.getElementById('enrollmentNo').value;
    const name = document.getElementById('name').value;
    const score = parseFloat(document.getElementById('score').value);
    const branch = document.getElementById('branch').value;

    // Check for duplicate enrollment numbers
    const existingStudent = students.find(student => student.enrollmentNo === enrollmentNo);
    if (existingStudent) {
        alert(`Enrollment number ${enrollmentNo} is already in use. Please proceed or recheck your entry.`);
    }

    const student = { enrollmentNo, name, score, branch };
    students.push(student);
    updateStudentList();
    updateStudentChart();

    document.getElementById('enrollmentNo').value = '';
    document.getElementById('name').value = '';
    document.getElementById('score').value = '';
    document.getElementById('branch').value = '';
});

function updateStudentList() {
    studentList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.enrollmentNo} - ${student.name} (${student.branch}) - ${student.score}`;
        studentList.appendChild(li);
    });
}

function updateStudentChart() {
    const names = students.map(student => student.name);
    const scores = students.map(student => student.score);

    const colors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(0, 255, 127, 0.8)',
        'rgba(0, 255, 255, 0.8)',
        'rgba(255, 0, 255, 0.8)',
        'rgba(255, 255, 0, 0.8)'
    ];

    const backgroundColors = scores.map((_, index) => colors[index % colors.length]);

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(studentChart, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Scores',
                data: scores,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
