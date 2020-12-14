init_artist()

var global_art;
d3.csv("Data/data_by_artist.csv", function (data) {
    var all_art = [];
    for (var i = 0; i < data.length; i++) {
        all_art.push(data[i].artists);
    };

    $("#artist_search_box").autocomplete({
        source: all_art
    });

    $("#artist_search_box").keyup(function (e) {
        if (e.keyCode == 13) {
            find_artist_in_clust();
        }
    });
});
function find_airtist_in_clust() {
    search_art = $('#artist_search_box').val();

    if (all_art.indexOf(search_art) != -1) {
      updateSearch(search_art);
    }
};

// save current state: selected visualization variable
var artists = "Westlife"
var artists_data =[]

var context = document.getElementById("my_dataviz3").getContext("2d");
var my_dataviz2 = new Chart(context, {
  // The type of chart we want to create
  type: "radar",
  // The data for our dataset
  data: {
    labels: ["danceability", "energy", "liveness", "tempo", "loudness", "acousticness", "speechiness"],
    datasets: [
      {
        label: artists,
        pointHitRadius: 20,
        backgroundColor: "rgba(255, 77, 64,0.3)",
        borderColor: "rgb(255, 77, 64)",
        lineTension: 0.2,
        pointHoverRadius: 5,
        data: [0.55,0.61,0.17,0.52,0.88,0.21,0.03], 
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

function updateSearch(val){
  artists = val;
  document.getElementById("airtistsVal").innerHTML = val;
  loadData_artist();
  redraw_artist();
}

function init_artist() {
  loadData_artist();
}

function redraw_artist() {
  // update data
  my_dataviz2.data.datasets[0].label = artists;
  my_dataviz2.data.datasets[0].data = [artist_data.danceability, artist_data.energy, artist_data.liveness, artist_data.tempo, artist_data.loudness, artist_data.acousticness, artist_data.speechiness]
  my_dataviz2.updateSearch();
}

function loadData_artist() {
  d3.csv("Data/data_by_artist.csv", (data) => {
     for(let i=0; i < data.length; i++){
      if(parseInt(data[i].artists) == parseInt(artists)){
        artist_data = data[i]
      }
    }
  });
}

