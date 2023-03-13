// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var filterKey = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
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

var parseDate = d3.timeParse('%b %Y');
var dateDomain = [new Date(2014, 7), new Date(2015, 6)];

// Create a group element for appending chart elements
var chartG = svg.append('g')
.attr('transform', 'translate('+[padding.l, padding.t]+')');

d3.csv('KSEA.csv').then(function(dataset) {
    dataset.forEach(function(d) {
        d.date = parseDate(d.date);
    });

    data = dataset;

    let max = d3.max(dataset, function(d) { return +d.actual_mean_temp; })

    xScale = d3.scaleTime()
    .domain(dateDomain)
    .range([ 0, chartWidth ]);

    yScale = d3.scaleLinear()
    .domain([0, max])
    .range([ chartHeight, 0 ]);

    // x axis
    chartG.append("g")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(d3.axisBottom(xScale));

    chartG.append("g")
    .call(d3.axisLeft(yScale));

    // Update the chart
    updateChart('actual_mean_temp', xScale, yScale);
});


function updateChart(filterKey, xScale, yScale) {
    // update dataset based on filterKey
    // var filteredData = data.filter(function(d) {
    //     return d.filterKey;
    // });
    console.log(filterKey)

    let lineInterpolator = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.filterKey));

    // // Set the gradient
    // chartG.append("linearGradient")
    // .attr("id", "line-gradient")
    // .attr("gradientUnits", "userSpaceOnUse")
    // .attr("x1", 0)
    // .attr("y1", y(0))
    // .attr("x2", 0)
    // .attr("y2", y(max))
    // .selectAll("stop")
    //     .dataset([
    //     {offset: "0%", color: "blue"},
    //     {offset: "100%", color: "red"}
    //     ])
    // .enter().append("stop")
    //     .attr("offset", function(d) { return d.offset; })
    //     .attr("stop-color", function(d) { return d.color; });
  
    // Add the line
    chartG.selectAll(".line-plot")
    .data(data)
    .enter()
    .append('path')
    .attr('class', ".line-plot")
    .attr('d', lineInterpolator)
    .attr("stroke", "black") // "url(#line-gradient)" 
    .attr("stroke-width", 2)
}
// Remember code outside of the dataset callback function will run before the dataset loads