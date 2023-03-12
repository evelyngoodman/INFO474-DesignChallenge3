// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var city = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
    updateChart(city);
}

// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        letter: row.letter,
        frequency: +row.frequency
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 60, r: 40, b: 30, l: 40};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Compute the spacing for bar bands based on all 26 letters
var barBand = chartHeight / 26;
var barHeight = barBand * 0.7;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// A map with arrays for each category of letter sets
var cityMap = {
    'clt': 'Weather_Data/CLT.csv',
    'sqt': 'Weather_Data/CQT.csv',
    'ind': 'Weather_Data/IND.csv',
    'jax': 'Weather_Data/JAX.csv',
    'khou': 'Weather_Data/KHOU.csv',
    'knyc': 'Weather_Data/KNYC.csv',
    'ksea': 'Weather_Data/KSEA.csv',
    'mdw': 'Weather_Data/MDW.csv',
    'phl': 'Weather_Data/PHL.csv',
    'phx': 'Weather_Data/PHX.csv'
};

d3.csv('letter_freq.csv', dataPreprocessor).then(function(dataset) {
    // Create global variables here and intialize the chart
    letters = dataset;
    console.log(dataset);
    // **** Your JavaScript code goes here ****

    // <-- Lab Code -->
    let formatPercent = function(d) {
        return d*100 + "%";
    };

    let maxFreq = d3.max(dataset, function(d) { 
        return +d.frequency;
    });

    xScale = d3.scaleLinear()
    .domain([0, maxFreq])
    .range([0, chartWidth]);

    yScale = d3.scaleBand()
    .range([0, chartHeight])
    .domain(dataset.map(x => x.letter))
    .padding(0.1);

    // let yAxis = chartG.call(d3.axisLeft(yScale).tickSize(0))
    // .style("class", "y axis")
    // .call(g => g.select(".domain").remove())

    let xAxisTop = d3.axisTop().scale(xScale).ticks(6).tickFormat(formatPercent)
    let xAxisBottom = d3.axisBottom().scale(xScale).ticks(6).tickFormat(formatPercent)

    let axisTop = svg.append('g')
    .attr('class', 'x axis top')
    .attr('transform', 'translate('+padding.l+','+(padding.t)+')')
    .call(xAxisTop)

    let axisBottom = svg.append('g')
    .attr('class', 'x axis bottom')
    .attr('transform', 'translate('+padding.l+','+(chartHeight + padding.t)+')')
    .call(xAxisBottom)
    // <-- Lab Code -->

    let title = svg.append("text")
    .attr("class", "axis-label")
    .attr("x", chartWidth / 1.5)
    .attr("y", (padding.t / 2))
    .text('Letter Frequency (%)')

    // Update the chart for all letters to initialize
    updateChart('clt');
});


function updateChart(filterKey) {
    var data = cityMap[filterKey]

    var letter = chartG.selectAll('.bars')
    .data(filteredLetters, function(d){
        console.log(d)
        return d;
    });

    var letterEnter = letter.enter()
    .append('g')
    .attr('class', 'bars');

    console.log(letter)

    letterEnter.merge(letter)
    .attr('transform', function(d,i) {
        return 'translate('+[0, i * barBand]+')'
    });

    letterEnter.append('rect')
    .attr("width", filteredLetters => xScale(filteredLetters.frequency))
    .attr("height", barHeight+2)
    .attr("x", 0)
    //.attr("y", filteredLetters => yScale(filteredLetters.letter));

    letterEnter.append('text')
    .attr('class', 'label')
    .attr('x', -20)
    .attr('dy', '0.9em') //(letters => yScale(letters.letter)+15)
    .text(function(d) {
        console.log(d.letter)
        return d.letter;
    });

    letter.exit().remove();
    // end tutorial
    
}
// Remember code outside of the data callback function will run before the data loads