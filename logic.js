// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 90},
width = 400 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("data_by_genres.csv", function(data) {

// Add X axis
var x = d3.scaleLinear()
.domain([0, 1])
.range([ 0, width]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
.range([ 0, height ])
.domain(data.map(function(d) { return d.genres; }))
.padding(0.3);
svg.append("g")
.call(d3.axisLeft(y))
.selectAll("text")
  .attr("font-weight", 700)
//Bars
svg.selectAll("myRect")
.data(data)
.enter()
.append("rect")
.attr("x", x(0) )
.attr("y", function(d) { return y(d.genres); })
.attr("width", function(d) { return x(d.popularity); })
.attr("height", y.bandwidth() )
.attr("fill", "#69b3a2")
.on("mouseover", function() {
    d3.select(this)
        .attr("fill", "red");
})
.on("mouseout", function() {
    d3.select(this)
        .attr("fill", "#69b3a2");
})
});


// save current state: selected visualization variable
var genres = "basshall"
var genres_data =[]

var context = document.getElementById("my_dataviz2").getContext("2d");
var my_dataviz2 = new Chart(context, {
  // The type of chart we want to create
  type: "radar",
  // The data for our dataset
  data: {
    labels: ["danceability", "energy", "liveness", "tempo", "loudness", "acousticness", "speechiness"],
    datasets: [
      {
        label: genres,
        pointHitRadius: 20,
        backgroundColor: "rgba(255, 77, 64,0.3)",
        borderColor: "rgb(255, 77, 64)",
        lineTension: 0.2,
        pointHoverRadius: 5,
        data: [0.82,0.63,0.08,0.37,0.66,0.21,0.63] //songAttributes[0], 
      }
    ],
  },
  // Configuration options go here
  options: {
    scale: {
      angleLines: {
        display: false,
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 1,
      },
    },
    tooltips: {
      enabled: true,
      callbacks: {
        title: function (tooltipItem, data) {
          return data["labels"][tooltipItem[0]["index"]];
        },
        label: function (tooltipItem, data) {
          return data["datasets"][0]["data"][tooltipItem["index"]];
        },
      },
    },
  },
});

function updateSelect(val){
  genres = val;
  document.getElementById("genresVal").innerHTML = val;
  loadData_genre();
  redraw_genre();
}

function init_genre() {
  loadData_genre();
}

function redraw_genre() {
  // update data
  my_dataviz2.data.datasets[0].label = genres;
  console.log(radarChar2.data.datasets[0].label);
  my_dataviz2.data.datasets[0].data = [genres_data.danceability, genres_data.energy, genres_data.liveness, genres_data.tempo, genres_data.loudness, genres_data.acousticness, genres_data.speechiness]
  my_dataviz2.update();
}

function loadData_genre() {
  d3.csv("data_by_genres.csv", (data) => {
     for(let i=0; i < data.length; i++){
      if(parseInt(data[i].genres) == parseInt(genres)){
        genres_data = data[i]
      }
    }
  });
}

