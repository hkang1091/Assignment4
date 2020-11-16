  // SETUP
  var data;
  var svg = d3.select("svg"),
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear();

  // var myScale = d3.scaleLinear()
  // .domain([0, 10])
  // .rangeRound([0, 600]);

  var bounds = svg.node().getBoundingClientRect(),
    width = bounds.width - margin.left - margin.right,
    height = bounds.height - margin.top - margin.bottom;


  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.append("g")
    .attr("class", "axis axis--x");

  g.append("g")
    .attr("class", "axis axis--y");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end") // attribute: start, middle, end
    .text("Frequency");

  
  d3.tsv("data.tsv", function (d) {
    x.domain(d.map(function (d, i) { return d.letter; })); // [A, B, C, D...]
    y.domain([0, d3.max(d, function (d, i) { return d.frequency; })]);
    draw(d);
  })


  function draw(d) {
    x.rangeRound([0, width]);
    y.rangeRound([height, 0]);

    g.select(".axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.select(".axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"));

var line = d3.line()
    .x(function(d, i) { return x(d.letter); }) 
    .y(function(d, i) { return y(d.frequency); }) 

  g.data(d);
  data = d
  g.append("path")
      .datum(d) 
      .attr("class", "line") 
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", line); 

  g.selectAll(".dot")
      .data(d)
    .enter().append("circle") 
      .attr("class", "dot") 
      .attr("cx", function(d, i) { return x(d.letter) })
      .attr("cy", function(d, i) { return y(d.frequency) })
      .attr("r", 5)
  }


d3.select("#sort").on("click", function() {
  sortLine(data)
})

d3.select("#reset").on("click", function() {
  reset(data)
})

var sortOrder = false;

function sortItems (a, b) {
  if (sortOrder) {
      return a.frequency - b.frequency;
  }
  return b.frequency - a.frequency;
};

function sortItemsReset (a, b) {
  return a.letter.charCodeAt(0) - b.letter.charCodeAt(0);
};

function sortLine(d) {
  var line = d3.line()
    .x(function(d, i) { return x(d.letter); }) 
    .y(function(d, i) { return y(d.frequency); }) 

  sortOrder = !sortOrder;
  x.domain(d.sort(sortItems).map(function (d, i) { return d.letter; }));
  svg.select(".line")
      .transition()
      .delay(function (d, i) {return i * 50;})
      .duration(1000)
      .attr("d", line); 

  svg.selectAll(".dot")
    .transition()
    .delay(function (d, i) {return i * 50;})
    .duration(1000)
    .attr("cx", function(d, i) { return x(d.letter) })
    .attr("cy", function(d, i) { return y(d.frequency) })
    .attr("r", 5)
  
  svg.selectAll('text')
  .data(d)
      .transition()
      .delay(function (d, i) {return i * 50;})
      .duration(1000)
      .text(function (d, i) {return d.letter;})
        
};


function reset(d) {
  var line = d3.line()
  .x(function(d, i) { return x(d.letter); }) 
  .y(function(d, i) { return y(d.frequency); }) 

  x.domain(d.sort(sortItemsReset).map(function (d, i) { return d.letter; }));
  svg.selectAll(".line")
      .transition()
      .delay(function (d, i) {return i * 50;})
      .duration(1000)
      .attr("d", line); 

  svg.selectAll(".dot")
    .transition()
    .delay(function (d, i) {return i * 50;})
    .duration(1000)
    .attr("cx", function(d, i) { return x(d.letter) })
    .attr("cy", function(d, i) { return y(d.frequency) })
    .attr("r", 5)
  
  svg.selectAll('text')
  .data(d)
      .transition()
      .delay(function (d, i) {return i * 50;})
      .duration(1000)
      .text(function (d, i) {return d.letter;})
};




