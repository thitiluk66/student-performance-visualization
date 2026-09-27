let scatterChart;
let lineChart;
let incomeChart;
let motivationChart;

Papa.parse("datacleaned - StudentPerformanceFactors.csv", {
    download: true,
    header: true,
    dynamicTyping: true,

    complete: function (results) {

        const data = results.data.filter(d => d.Exam_Score != null);

        // =========================
        // Scatter Plot
        // Hours_Studied vs Exam_Score
        // =========================

        scatterChart = new Chart(
            document.getElementById("scatterChart"),
            {
                type: "scatter",
                data: {
                    datasets: [{
                        label: "Hours Studied vs Exam Score",
                        data: data.map(d => ({
                            x: d.Hours_Studied,
                            y: d.Exam_Score
                        })),
                        backgroundColor: "rgba(59,130,246,0.7)",
                        pointRadius: 5,
                        pointHoverRadius: 8
                    }]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    animation: {
                        duration: 1800
                    },

                    plugins: {
                        legend: {
                            display: true
                        },

                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `Hours: ${context.raw.x} | Score: ${context.raw.y}`;
                                }
                            }
                        }
                    },

                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Hours Studied"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Exam Score"
                            }
                        }
                    }
                }
            }
        );

        // =========================
        // LINE CHART
        // Attendance vs Exam Score
        // =========================

        const attendanceMap = {};

        data.forEach(d => {

            if (!attendanceMap[d.Attendance]) {
                attendanceMap[d.Attendance] = [];
            }

            attendanceMap[d.Attendance].push(
                d.Exam_Score
            );

        });

        const attendanceLabels =
            Object.keys(attendanceMap)
                .map(Number)
                .sort((a, b) => a - b);

        const attendanceScores =
            attendanceLabels.map(att => {

                const arr = attendanceMap[att];

                return (
                    arr.reduce((a, b) => a + b, 0)
                    / arr.length
                );

            });

        lineChart = new Chart(
            document.getElementById("lineChart"),
            {
                type: "line",

                data: {
                    labels: attendanceLabels,

                    datasets: [{
                        label: "Attendance vs Exam Score",

                        data: attendanceScores,

                        borderColor: "#10b981",

                        backgroundColor:
                            "rgba(16,185,129,0.2)",

                        borderWidth: 4,

                        pointRadius: 5,

                        pointHoverRadius: 8,

                        fill: true,

                        tension: 0.4
                    }]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    animation: {
                        duration: 2000
                    },

                    plugins: {

                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `Average Score: ${context.raw.toFixed(2)}`;
                                }
                            }
                        }
                    },

                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Attendance (%)"
                            }
                        },

                        y: {
                            title: {
                                display: true,
                                text: "Average Exam Score"
                            }
                        }
                    }
                }
            }
        );

        // =========================
        // FAMILY INCOME BAR CHART
        // =========================

        const incomeLevels =
            ["Low", "Medium", "High"];

        const incomeScores =
            incomeLevels.map(level => {

                const values =
                    data
                        .filter(
                            d =>
                            d.Family_Income === level
                        )
                        .map(
                            d => d.Exam_Score
                        );

                return (
                    values.reduce(
                        (a, b) => a + b,
                        0
                    ) / values.length
                );
            });

        incomeChart = new Chart(
            document.getElementById("incomeChart"),
            {
                type: "bar",

                data: {

                    labels: incomeLevels,

                    datasets: [{

                        label:
                            "Average Exam Score",

                        data: incomeScores,

                        backgroundColor: [
                            "#8b5cf6",
                            "#6366f1",
                            "#3b82f6"
                        ],

                        borderRadius: 10
                    }]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    animation: {
                        duration: 1800
                    },

                    plugins: {

                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return (
                                        "Score: "
                                        + context.raw.toFixed(2)
                                    );
                                }
                            }
                        }
                    },

                    scales: {

                        x: {
                            title: {
                                display: true,
                                text: "Family Income"
                            }
                        },

                        y: {
                            beginAtZero: true,

                            title: {
                                display: true,
                                text: "Average Exam Score"
                            }
                        }
                    }
                }
            }
        );

        // =========================
        // MOTIVATION BAR CHART
        // =========================

        const motivationLevels =
            ["Low", "Medium", "High"];

        const motivationScores =
            motivationLevels.map(level => {

                const values =
                    data
                        .filter(
                            d =>
                            d.Motivation_Level === level
                        )
                        .map(
                            d => d.Exam_Score
                        );

                return (
                    values.reduce(
                        (a, b) => a + b,
                        0
                    ) / values.length
                );
            });

        motivationChart = new Chart(
            document.getElementById("motivationChart"),
            {
                type: "bar",

                data: {

                    labels: motivationLevels,

                    datasets: [{

                        label:
                            "Average Exam Score",

                        data:
                            motivationScores,

                        backgroundColor: [
                            "#f59e0b",
                            "#f97316",
                            "#ef4444"
                        ],

                        borderRadius: 10
                    }]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    animation: {
                        duration: 1800
                    },

                    plugins: {

                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return (
                                        "Score: "
                                        + context.raw.toFixed(2)
                                    );
                                }
                            }
                        }
                    },

                    scales: {

                        x: {
                            title: {
                                display: true,
                                text: "Motivation Level"
                            }
                        },

                        y: {
                            beginAtZero: true,

                            title: {
                                display: true,
                                text: "Average Exam Score"
                            }
                        }
                    }
                }
            }
        );

    }
});