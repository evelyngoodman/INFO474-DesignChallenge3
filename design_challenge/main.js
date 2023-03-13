// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var filterKey = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
    console.log(filterKey)
    updateChart(filterKey);
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 10, r: 30, b: 30, l: 60};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

var parseDate = d3.timeParse("%m %d %Y");
var dateDomain = [new Date(2014, 7), new Date(2015, 6)];

// Create a group element for appending chart elements
var chartG = svg.append('g')
.attr('transform', 'translate('+[padding.l, padding.t]+')');

var selectOptions = []

d3.csv('KSEA.csv').then(function(dataset) {
    dataset.forEach(function(d) {
        d.date = new Date(d.date);
    });

    data = dataset;

    // let max = d3.max(dataset, function(d) { return +d.actual_mean_temp; })
    // console.log(max)

    xScale = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, chartWidth ]);

    yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([ chartHeight, 0 ]);

    // x axis
    chartG.append("g")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(d3.axisBottom(xScale));

    chartG.append("g")
    .call(d3.axisLeft(yScale));

    line = chartG
    .append('g')
    .append("path")
    
    // Update the chart
    updateChart('actual_mean_temp');
});


function updateChart(filterKey) {
    // update dataset based on filterKey
    // var filteredData = data.filter(function(d) {
    //     return d.filterKey;
    // });
    var dataFilter = data.map(function(d){return {date: d.date, value:d[filterKey]} })
    console.log(filterKey)
    console.log(data)

    let lineInterpolator = d3.line()
    // .x(function(d) { return d.date })
    // .y(function(d) { return d[filterKey] });
    .x(d => xScale(d.date))
    .y(d => yScale(d[filterKey]))

    let max = d3.max(data, function(d) { return d[filterKey]; })

    // Set the gradient
    chartG.append("linearGradient")
    .attr("id", "line-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", yScale(0))
    .attr("x2", 0)
    .attr("y2", yScale(max))
    .selectAll("stop")
    .data([
    {offset: "0%", color: "blue"},
    {offset: "100%", color: "red"}
    ])
    .enter()
    .append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });
  
    // Add the line
    line
    .datum(data)
    .transition()
    .duration(1000)
    .attr('d', lineInterpolator)
    .attr("stroke", "url(#line-gradient)" ) // "url(#line-gradient)" 
    .style("fill", "none")
    .attr("stroke-width", 2)
}
// Remember code outside of the dataset callback function will run before the dataset loads