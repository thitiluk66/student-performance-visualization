const margin = {
    top: 40,
    right: 30,
    bottom: 70,
    left: 80
};

// ==========================
// Tooltip
// ==========================
const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// ==========================
// Scatter Plot
// Hours_Studied vs Exam_Score
// ==========================
function drawScatterChart() {
    const container = document.getElementById("scatter-chart");

    d3.select("#scatter-chart")
        .selectAll("*")
        .remove();

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = d3.select("#scatter-chart")
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left},${margin.top})`
        );

    d3.csv("datacleaned - StudentPerformanceFactors.csv")
        .then(data => {

            data.forEach(d => {
                d.Hours_Studied = +d.Hours_Studied;
                d.Exam_Score = +d.Exam_Score;
            });

            const x = d3.scaleLinear()
                .domain(
                    d3.extent(
                        data,
                        d => d.Hours_Studied
                    )
                )
                .nice()
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain(
                    d3.extent(
                        data,
                        d => d.Exam_Score
                    )
                )
                .nice()
                .range([height, 0]);

            // Grid X
            svg.append("g")
                .attr(
                    "transform",
                    `translate(0,${height})`
                )
                .call(
                    d3.axisBottom(x)
                        .tickSize(-height)
                        .tickFormat("")
                )
                .attr("opacity", 0.15);

            // Grid Y
            svg.append("g")
                .call(
                    d3.axisLeft(y)
                        .tickSize(-width)
                        .tickFormat("")
                )
                .attr("opacity", 0.15);

            // X Axis
            svg.append("g")
                .attr(
                    "transform",
                    `translate(0,${height})`
                )
                .call(d3.axisBottom(x));

            // Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

            // Scatter Points
            const circles = svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => x(d.Hours_Studied))
                .attr("cy", height)
                .attr("r", 0)
                .attr("fill", "#3b82f6")
                .attr("opacity", 0)

                .on("mouseover", function(event, d) {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("r", 8)
                        .attr("fill", "#ef4444");

                    tooltip
                        .style("opacity", 1)
                        .html(`
                            <b>Hours Studied</b>: ${d.Hours_Studied}<br>
                            <b>Exam Score</b>: ${d.Exam_Score}
                        `);
                })

                .on("mousemove", function(event) {

                    tooltip
                        .style(
                            "left",
                            (event.pageX + 15) + "px"
                        )
                        .style(
                            "top",
                            (event.pageY - 20) + "px"
                        );
                })

                .on("mouseout", function() {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("r", 4)
                        .attr("fill", "#3b82f6");

                    tooltip.style("opacity", 0);
                });

            // Animation ทุกจุดพร้อมกัน
            circles
                .transition()
                .duration(1200)
                .ease(d3.easeElasticOut)
                .attr("cy", d => y(d.Exam_Score))
                .attr("r", 4)
                .attr("opacity", 0.65);

            // X Label
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + 50)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .text("Hours Studied");

            // Y Label
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -height / 2)
                .attr("y", -55)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .text("Exam Score");

            // Title
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", -15)
                .attr("text-anchor", "middle")
                .style("font-size", "18px")
                .style("font-weight", "bold")
                .text("Hours Studied vs Exam Score");

        });
}

// ==========================
// Line Chart
// Attendance vs Exam_Score
// ==========================
function drawLineChart() {

    const container =
        document.getElementById("line-chart");

    d3.select("#line-chart")
        .selectAll("*")
        .remove();

    const containerWidth =
        container.clientWidth;

    const containerHeight =
        container.clientHeight;

    const width =
        containerWidth - margin.left - margin.right;

    const height =
        containerHeight - margin.top - margin.bottom;

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left},${margin.top})`
        );

    d3.csv("datacleaned - StudentPerformanceFactors.csv")
        .then(data => {

            data.forEach(d => {
                d.Attendance = +d.Attendance;
                d.Exam_Score = +d.Exam_Score;
            });

            const grouped = d3.rollups(
                data,
                v => d3.mean(v, d => d.Exam_Score),
                d => d.Attendance
            )
            .map(([Attendance, Exam_Score]) => ({
                Attendance: +Attendance,
                Exam_Score
            }))
            .sort((a, b) =>
                a.Attendance - b.Attendance
            );

            const x = d3.scaleLinear()
                .domain(
                    d3.extent(
                        grouped,
                        d => d.Attendance
                    )
                )
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([
                    d3.min(grouped,
                        d => d.Exam_Score) - 1,
                    d3.max(grouped,
                        d => d.Exam_Score) + 1
                ])
                .range([height, 0]);

            // Grid X
            svg.append("g")
                .attr(
                    "transform",
                    `translate(0,${height})`
                )
                .call(
                    d3.axisBottom(x)
                        .tickSize(-height)
                        .tickFormat("")
                )
                .attr("opacity", 0.15);

            // Grid Y
            svg.append("g")
                .call(
                    d3.axisLeft(y)
                        .tickSize(-width)
                        .tickFormat("")
                )
                .attr("opacity", 0.15);

            // X Axis
            svg.append("g")
                .attr(
                    "transform",
                    `translate(0,${height})`
                )
                .call(d3.axisBottom(x));

            // Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

            const line = d3.line()
                .x(d => x(d.Attendance))
                .y(d => y(d.Exam_Score));

            // =====================
            // LINE ANIMATION
            // =====================

            const path = svg.append("path")
                .datum(grouped)
                .attr("fill", "none")
                .attr("stroke", "#10b981")
                .attr("stroke-width", 4)
                .attr("d", line);

            const totalLength =
                path.node().getTotalLength();

            path
                .attr("stroke-dasharray", totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0);

            // =====================
            // POINTS
            // =====================

            const points = svg.selectAll(".point")
                .data(grouped)
                .enter()
                .append("circle")
                .attr("cx",
                    d => x(d.Attendance))
                .attr("cy",
                    d => y(d.Exam_Score))
                .attr("r", 0)
                .attr("fill", "#10b981");

            points
                .transition()
                .delay(1800)
                .duration(500)
                .ease(d3.easeBackOut)
                .attr("r", 5);

            // Tooltip

            points
                .on("mouseover", function(event, d) {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("r", 8)
                        .attr("fill", "#f97316");

                    tooltip
                        .style("opacity", 1)
                        .html(`
                            <b>Attendance</b>: ${d.Attendance}%<br>
                            <b>Average Exam Score</b>: ${d.Exam_Score.toFixed(2)}
                        `);
                })
                .on("mousemove", function(event) {

                    tooltip
                        .style(
                            "left",
                            (event.pageX + 15) + "px"
                        )
                        .style(
                            "top",
                            (event.pageY - 20) + "px"
                        );
                })
                .on("mouseout", function() {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("r", 5)
                        .attr("fill", "#10b981");

                    tooltip.style("opacity", 0);
                });

            // =====================
            // X LABEL
            // =====================

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + 50)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .text("Attendance (%)");

            // =====================
            // Y LABEL
            // =====================

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -height / 2)
                .attr("y", -55)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .text("Average Exam Score");

            // =====================
            // TITLE
            // =====================

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", -15)
                .attr("text-anchor", "middle")
                .style("font-size", "18px")
                .style("font-weight", "bold")
                .text("Attendance vs Exam Score");

        });

}

// ==========================
// Bar Chart
// Family_Income vs Exam_Score
// ==========================
function drawBarChart() {

    const container =
        document.getElementById("bar-chart");

    d3.select("#bar-chart")
        .selectAll("*")
        .remove();

    const containerWidth =
        container.clientWidth;

    const containerHeight =
        container.clientHeight;

    const width =
        containerWidth - margin.left - margin.right;

    const height =
        containerHeight - margin.top - margin.bottom;

    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left},${margin.top})`
        );

    d3.csv("datacleaned - StudentPerformanceFactors.csv")
        .then(data => {

            data.forEach(d => {
                d.Exam_Score = +d.Exam_Score;
            });

            const grouped = d3.rollups(
                data,
                v => d3.mean(v, d => d.Exam_Score),
                d => d.Family_Income
            )
            .map(([Family_Income, Exam_Score]) => ({
                Family_Income,
                Exam_Score
            }));

            const order = [
                "Low",
                "Medium",
                "High"
            ];

            grouped.sort(
                (a, b) =>
                    order.indexOf(a.Family_Income) -
                    order.indexOf(b.Family_Income)
            );

            const x = d3.scaleBand()
                .domain(
                    grouped.map(d => d.Family_Income)
                )
                .range([0, width])
                .padding(0.3);

            const y = d3.scaleLinear()
                .domain([
                    0,
                    d3.max(
                        grouped,
                        d => d.Exam_Score
                    )
                ])
                .nice()
                .range([height, 0]);

            // Grid
            svg.append("g")
                .call(
                    d3.axisLeft(y)
                        .tickSize(-width)
                        .tickFormat("")
                )
                .attr("opacity", 0.15);

            // X Axis
            svg.append("g")
                .attr(
                    "transform",
                    `translate(0,${height})`
                )
                .call(d3.axisBottom(x));

            // Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

            // ====================
            // BAR ANIMATION
            // ====================

            const bars = svg.selectAll(".bar")
                .data(grouped)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr(
                    "x",
                    d => x(d.Family_Income)
                )
                .attr("y", height)
                .attr("width", x.bandwidth())
                .attr("height", 0)
                .attr("fill", "#8b5cf6")
                .on("mouseover", function(event, d) {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("fill", "#f97316");

                    tooltip
                        .style("opacity", 1)
                        .html(`
                            <b>Family Income</b>: ${d.Family_Income}<br>
                            <b>Average Score</b>: ${d.Exam_Score.toFixed(2)}
                        `);
                })
                .on("mousemove", function(event) {

                    tooltip
                        .style(
                            "left",
                            (event.pageX + 15) + "px"
                        )
                        .style(
                            "top",
                            (event.pageY - 20) + "px"
                        );
                })
                .on("mouseout", function() {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("fill", "#8b5cf6");

                    tooltip.style("opacity", 0);
                });

            // Grow Animation
            bars.transition()
                .duration(1500)
                .ease(d3.easeBounceOut)
                .attr(
                    "y",
                    d => y(d.Exam_Score)
                )
                .attr(
                    "height",
                    d => height - y(d.Exam_Score)
                );

            // ====================
            // VALUE LABEL
            // ====================

            svg.selectAll(".label")
                .data(grouped)
                .enter()
                .append("text")
                .attr(
                    "x",
                    d =>
                        x(d.Family_Income) +
                        x.bandwidth() / 2
                )
                .attr("y", height)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .style("opacity", 0)
                .text(
                    d => d.Exam_Score.toFixed(1)
                )
                .transition()
                .delay(1200)
                .duration(500)
                .attr(
                    "y",
                    d => y(d.Exam_Score) - 8
                )
                .style("opacity", 1);

            // X Label
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + 50)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .text("Family Income");

            // Y Label
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -height / 2)
                .attr("y", -55)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .text("Average Exam Score");

            // Title
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", -15)
                .attr("text-anchor", "middle")
                .style("font-size", "18px")
                .style("font-weight", "bold")
                .text("Family_Income vs Exam_Score");

        });

}

// ==========================
// Bar Chart
// Motivation_Level vs Exam_Score
// ==========================
function drawMotivationChart() {

    const container =
        document.getElementById("motivation-chart");

    d3.select("#motivation-chart")
        .selectAll("*")
        .remove();

    const containerWidth =
        container.clientWidth;

    const containerHeight =
        container.clientHeight;

    const width =
        containerWidth - margin.left - margin.right;

    const height =
        containerHeight - margin.top - margin.bottom;

    const svg = d3.select("#motivation-chart")
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr(
            "transform",
            `translate(${margin.left},${margin.top})`
        );

    d3.csv("datacleaned - StudentPerformanceFactors.csv")
        .then(data => {

            data.forEach(d => {
                d.Exam_Score = +d.Exam_Score;
            });

            const grouped = d3.rollups(
                data,
                v => d3.mean(v, d => d.Exam_Score),
                d => d.Motivation_Level
            )
            .map(([Motivation_Level, Exam_Score]) => ({
                Motivation_Level,
                Exam_Score
            }));

            const order = ["Low", "Medium", "High"];

            grouped.sort(
                (a, b) =>
                    order.indexOf(a.Motivation_Level) -
                    order.indexOf(b.Motivation_Level)
            );

            const x = d3.scaleBand()
                .domain(
                    grouped.map(
                        d => d.Motivation_Level
                    )
                )
                .range([0, width])
                .padding(0.3);

            const y = d3.scaleLinear()
                .domain([
                    0,
                    d3.max(
                        grouped,
                        d => d.Exam_Score
                    )
                ])
                .nice()
                .range([height, 0]);

            // Grid
            svg.append("g")
                .call(
                    d3.axisLeft(y)
                        .tickSize(-width)
                        .tickFormat("")
                )
                .attr("opacity", 0.15);

            // X Axis
            svg.append("g")
                .attr(
                    "transform",
                    `translate(0,${height})`
                )
                .call(d3.axisBottom(x));

            // Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

            // ==========================
            // BARS
            // ==========================
            const bars = svg.selectAll(".bar")
                .data(grouped)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr(
                    "x",
                    d => x(d.Motivation_Level)
                )
                .attr("y", height)
                .attr("width", x.bandwidth())
                .attr("height", 0)
                .attr("fill", "#f59e0b")

                .on("mouseover", function(event, d) {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("fill", "#ef4444");

                    tooltip
                        .style("opacity", 1)
                        .html(`
                            <b>Motivation Level</b>: ${d.Motivation_Level}<br>
                            <b>Average Score</b>: ${d.Exam_Score.toFixed(2)}
                        `);

                })

                .on("mousemove", function(event) {

                    tooltip
                        .style(
                            "left",
                            (event.pageX + 15) + "px"
                        )
                        .style(
                            "top",
                            (event.pageY - 20) + "px"
                        );

                })

                .on("mouseout", function() {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("fill", "#f59e0b");

                    tooltip.style("opacity", 0);

                });

            // ==========================
            // ANIMATION
            // ==========================
            bars.transition()
                .duration(1500)
                .ease(d3.easeBounceOut)
                .attr(
                    "y",
                    d => y(d.Exam_Score)
                )
                .attr(
                    "height",
                    d => height - y(d.Exam_Score)
                );

            // ==========================
            // VALUE LABEL
            // ==========================
            svg.selectAll(".label")
                .data(grouped)
                .enter()
                .append("text")
                .attr(
                    "x",
                    d =>
                        x(d.Motivation_Level) +
                        x.bandwidth() / 2
                )
                .attr("y", height)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .style("opacity", 0)
                .text(
                    d => d.Exam_Score.toFixed(1)
                )
                .transition()
                .delay(1200)
                .duration(500)
                .attr(
                    "y",
                    d => y(d.Exam_Score) - 8
                )
                .style("opacity", 1);

            // ==========================
            // X LABEL
            // ==========================
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + 50)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .text("Motivation Level");

            // ==========================
            // Y LABEL
            // ==========================
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -height / 2)
                .attr("y", -55)
                .attr("text-anchor", "middle")
                .style("font-weight", "bold")
                .text("Average Exam Score");

            // ==========================
            // TITLE
            // ==========================
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", -15)
                .attr("text-anchor", "middle")
                .style("font-size", "18px")
                .style("font-weight", "bold")
                .text("Motivation_Level vs Exam_Score");

        });

}
// ==========================
// Start
// ==========================
drawScatterChart();
drawLineChart();
drawBarChart();
drawMotivationChart();

window.addEventListener("resize", () => {

    drawScatterChart();
    drawLineChart();
    drawBarChart();
    drawMotivationChart();

});