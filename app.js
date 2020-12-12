var Data = [{}];
d3.csv("Data/data_by_year.csv", function (data) {
    Data = data;
    Data.forEach(function (element, i) {
        Data[i].year = parseFloat(Data[i].year)
        Data[i].danceability = parseFloat(Data[i].danceability)
        Data[i].energy = parseFloat(Data[i].energy)
        Data[i].liveness = parseFloat(Data[i].liveness)
        Data[i].tempo = parseFloat(Data[i].tempo)
    })
    plotInitial();
});

function div_OnOff() {
    if ($('input:radio[id=Year]').is(':checked')) {
        $('#year').show();
        $('#genre').hide();
        $('#artist').hide();

    } else if ($('input:radio[id=Genre]').is(':checked')) {
        $('#year').hide();
        $('#genre').show();
        $('#artist').hide();

    } else if ($('input:radio[id=Artist]').is(':checked')) {
        $('#year').hide();
        $('#genre').hide();
        $('#artist').show();

    } else {
        $('#year').hide();
        $('#genre').hide();
        $('#artist').hide();
    }
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

var global_gen;
d3.csv("Data/data_by_genres.csv", function (gen) {
    var all_gen = [];
    for (var i = 0; i < gen.length; i++) {
        all_gen.push(gen[i].genres);
    };

    $("#genre_search_box").autocomplete({
        source: all_gen
    });

    $("#genre_search_box").keyup(function (e) {
        if (e.keyCode == 13) {
            find_genre_in_clust();
        }
    });
});
function find_genre_in_clust() {
    search_gen = $('#genre_search_box').val();

    if (all_gen.indexOf(search_gen) != -1) {

    }
};

var global_art;
d3.csv("Data/data_by_artist.csv", function (art) {
    var all_art = [];
    for (var i = 0; i < art.length; i++) {
        all_art.push(art[i].artists);
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

    }
};


function plotInitial() {
    var features = ["danceability", "energy", "liveness", "tempo"];
    var data = [];
    var data2 = [];
    var point = {
        danceability: 0,
        energy: 0,
        liveness: 0,
        tempo: 0
    }
    var point2 = {
        danceability: 0,
        energy: 0,
        liveness: 0,
        tempo: 0
    }
    point.danceability = Data[0].danceability
    point.energy = Data[0].energy
    point.liveness = Data[0].liveness
    point.tempo = Data[0].tempo
    point2.danceability = Data[6].danceability
    point2.energy = Data[6].energy
    point2.liveness = Data[6].liveness
    point2.tempo = Data[6].tempo
    //console.log(point)
    //features.forEach(f => point[f] = Math.random());
    data.push(point);
    data2.push(point2);


    var dat1 = [];
    function myfunction1() {
        var checkBox = document.getElementById("myCheckBox");
        var text = document.getElementById("text");
        if (checkBox.checked == true) {
            dat1.push(...data);
            render_dat1()
        } else {
            dat1.pop();
            render_dat1()
        }
    }

    var dat2 = [];
    function myfunction2() {
        var checkBox = document.getElementById("myCheckBox2");
        var text = document.getElementById("text");
        if (checkBox.checked == true) {
            dat2.push(...data);
            render_dat2()
        } else {
            dat2.pop();
            render_dat2()
        }
    }

    var dat3 = [];
    function myfunction3() {
        var checkBox = document.getElementById("myCheckBox3");
        var text = document.getElementById("text");
        if (checkBox.checked == true) {
            dat3.push(...data);
            render_dat3()
        } else {
            dat3.pop();
            render_dat3()
        }
    }

    var dat4 = [];
    function myfunction4() {
        var checkBox = document.getElementById("myCheckBox4");
        var text = document.getElementById("text");
        if (checkBox.checked == true) {
            dat4.push(...data);
            render_dat4()
        } else {
            dat4.pop();
            render_dat4()
        }
    }

    var svg = d3.select("svg")
        .attr("width", 600)
        .attr("height", 600);
    var radialScale = d3.scale.linear()
        .range([0, 250])
        .domain([0, 1]);
    var ticks = [0.2, 0.4, 0.6, 0.8, 1];
    ticks.forEach(t =>
        svg.append("circle")
            .attr("cx", 300)
            .attr("cy", 300)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("r", radialScale(t))
    );
    ticks.forEach(t =>
        svg.append("text")
            .attr("x", 305)
            .attr("y", 300 - radialScale(t))
            .text(t.toString())
    );
    function angleToCoordinate(angle, value) {
        var x = Math.cos(angle) * radialScale(value);
        var y = Math.sin(angle) * radialScale(value);
        return { "x": 300 + x, "y": 300 - y };
    }
    for (var i = 0; i < 4; i++) {
        var ft_name = features[i];
        var angle = (Math.PI / 2) + (2 * Math.PI * i / 4);
        var line_coordinate = angleToCoordinate(angle, 1.5);
        var label_coordinate = angleToCoordinate(angle, 1.1);

        //draw axis line
        svg.append("line")
            .attr("x1", 300)
            .attr("y1", 300)
            .attr("x2", line_coordinate.x)
            .attr("y2", line_coordinate.y)
            .attr("stroke", "black");

        //draw axis label
        svg.append("text")
            .attr("x", label_coordinate.x)
            .attr("y", label_coordinate.y)
            .text(ft_name);
    }

    var line = d3.svg.line()
        .x(d => d.x)
        .y(d => d.y);

    var line2 = d3.svg.line()
        .x(d2 => d2.x)
        .y(d2 => d2.y);

    function getPathCoordinates(data_point) {
        var coordinates = [];
        for (var i = 0; i < 4; i++) {
            var ft_name = features[i];
            var angle = (Math.PI / 2) + (2 * Math.PI * i / 4);
            coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
        }
        return coordinates;
    }


    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var d2 = data2[i];
        var coordinates = getPathCoordinates(d);
        var coordinates2 = getPathCoordinates(d2);
        var da = d.danceability
        var en = d.energy
        var liv = d.liveness
        var tem = d.tempo
        
        svg.append("path")
            .datum(coordinates2)
            .attr("d", line2)
            .attr("stroke-width", 3)
            .attr("stroke", "yellow")
            .attr("fill", "yellow")
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5)
            .on("mouseover", function (d) {
                d3.select(this).transition()
                    .duration('10')
                    .attr('opacity', '1');
            })
            .on('mouseout', function (d) {
                d3.select(this).transition()
                    .duration('10')
                    .attr('opacity', '.5');
            });
        svg.append("circle")
            .attr("cx", coordinates2[0].x)
            .attr("cy", coordinates2[0].y)
            .attr("r", 6)
            .style("fill", "yellow")
            .on("mouseover", function (d) {
                newX = coordinates2[0].x - 10;
                newY = coordinates2[0].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(da)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        svg.append("circle")
            .attr("cx", coordinates2[1].x)
            .attr("cy", coordinates2[1].y)
            .attr("r", 6)
            .style("fill", "yellow")
            .on("mouseover", function (d) {
                newX = coordinates2[1].x - 10;
                newY = coordinates2[1].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(en)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        svg.append("circle")
            .attr("cx", coordinates2[2].x)
            .attr("cy", coordinates2[2].y)
            .attr("r", 6)
            .style("fill", "yellow")
            .on("mouseover", function (d) {
                newX = coordinates2[2].x - 10;
                newY = coordinates2[2].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(liv)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        svg.append("circle")
            .attr("cx", coordinates2[3].x)
            .attr("cy", coordinates2[3].y)
            .attr("r", 6)
            .style("fill", "yellow")
            .on("mouseover", function (d) {
                newX = coordinates2[3].x - 10;
                newY = coordinates2[3].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(tem)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });


        svg.append("path")
            .datum(coordinates)
            .attr("d", line)
            .attr("stroke-width", 3)
            .attr("stroke", "blue")
            .attr("fill", "blue")
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5)
            .on("mouseover", function (d) {
                d3.select(this).transition()
                    .duration('10')
                    .attr('opacity', '1');
            })
            .on('mouseout', function (d) {
                d3.select(this).transition()
                    .duration('10')
                    .attr('opacity', '.5');
            });
        svg.append("circle")
            .attr("cx", coordinates[0].x)
            .attr("cy", coordinates[0].y)
            .attr("r", 6)
            .style("fill", "yellow")
            .on("mouseover", function (d) {
                newX = coordinates[0].x - 10;
                newY = coordinates[0].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(da)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        svg.append("circle")
            .attr("cx", coordinates[1].x)
            .attr("cy", coordinates[1].y)
            .attr("r", 6)
            .style("fill", "yellow")
            .on("mouseover", function (d) {
                newX = coordinates[1].x - 10;
                newY = coordinates[1].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(en)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        svg.append("circle")
            .attr("cx", coordinates[2].x)
            .attr("cy", coordinates[2].y)
            .attr("r", 6)
            .style("fill", "yellow")
            .on("mouseover", function (d) {
                newX = coordinates[2].x - 10;
                newY = coordinates[2].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(liv)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        svg.append("circle")
            .attr("cx", coordinates[3].x)
            .attr("cy", coordinates[3].y)
            .attr("r", 6)
            .style("fill", "yellow")
            .on("mouseover", function (d) {
                newX = coordinates[3].x - 10;
                newY = coordinates[3].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(tem)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
    }
    var tooltip = svg.append("text")
        .attr("class", "tooltip")
        .style("opacity", 0);


    function render_dat1() {

        let d1, coordinates1;
        if (dat1.length > 0) {
            d1 = dat1[0];
            coordinates1 = [getPathCoordinates(d1)];
        }
        else {
            coordinates1 = []
        }
        console.log(coordinates1)
        let u = svg.selectAll('.d1').data(coordinates1)

        var da = d1.danceability
        var en = d1.energy
        var liv = d1.liveness
        var tem = d1.tempo

        u.enter().append("path")
            .attr('class', 'd1')
            .attr("d", line)
            .attr("stroke-width", 3)
            .attr("stroke", "green")
            .attr("fill", "green")
            .attr("stroke-opacity", 11)
            .attr("opacity", 0.5)
            .on("mouseover", function (d) {
                d3.select(this).transition()
                    .duration('10')
                    .attr('opacity', '1');
            })
            .on('mouseout', function (d) {
                d3.select(this).transition()
                    .duration('10')
                    .attr('opacity', '.5');
            });
        svg.append("circle")
            .attr("cx", coordinates1[0].x)
            .attr("cy", coordinates1[0].y)
            .attr("r", 6)
            .style("fill", "green")
            .on("mouseover", function (d) {
                newX = coordinates1[0].x - 10;
                newY = coordinates1[0].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(da)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        svg.append("circle")
            .attr("cx", coordinates1[1].x)
            .attr("cy", coordinates1[1].y)
            .attr("r", 6)
            .style("fill", "green")
            .on("mouseover", function (d) {
                newX = coordinates1[1].x - 10;
                newY = coordinates1[1].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(en)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        svg.append("circle")
            .attr("cx", coordinates1[2].x)
            .attr("cy", coordinates1[2].y)
            .attr("r", 6)
            .style("fill", "green")
            .on("mouseover", function (d) {
                newX = coordinates1[2].x - 10;
                newY = coordinates1[2].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(liv)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        svg.append("circle")
            .attr("cx", coordinates1[3].x)
            .attr("cy", coordinates1[3].y)
            .attr("r", 6)
            .style("fill", "green")
            .on("mouseover", function (d) {
                newX = coordinates1[3].x - 10;
                newY = coordinates1[3].y - 10;
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(tem)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function () {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });

        u.exit()
            .remove()
    }

    function render_dat2() {

        let d2, coordinates2;
        if (dat2.length > 0) {
            d2 = dat2[0];
            coordinates2 = [getPathCoordinates(d2)];
        }
        else {
            coordinates2 = []
        }

        let u = svg.selectAll('.d2').data(coordinates2)

        u.enter().append("path")
            .attr('class', 'd2')
            .attr("d", line)
            .attr("stroke-width", 3)
            .attr("stroke", "blue")
            .attr("fill", "blue")
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5)

        u.exit()
            .remove()
    }

    function render_dat3() {

        let d3, coordinates3;
        if (dat3.length > 0) {
            d3 = dat3[0];
            coordinates3 = [getPathCoordinates(d3)];
        }
        else {
            coordinates3 = []
        }

        let u = svg.selectAll('.d3').data(coordinates3)

        u.enter().append("path")
            .attr('class', 'd3')
            .attr("d", line)
            .attr("stroke-width", 3)
            .attr("stroke", "red")
            .attr("fill", "red")
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5)

        u.exit()
            .remove()
    }

    function render_dat4() {

        let d4, coordinates4;
        if (dat4.length > 0) {
            d4 = dat4[0];
            coordinates4 = [getPathCoordinates(d4)];
        }
        else {
            coordinates4 = []
        }

        let u = svg.selectAll('.d4').data(coordinates4)

        u.enter().append("path")
            .attr('class', 'd4')
            .attr("d", line)
            .attr("stroke-width", 3)
            .attr("stroke", "pink")
            .attr("fill", "pink")
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5)

        u.exit()
            .remove()
    }
}

// function plotInitial2() {
//     var features = ["danceability", "energy", "liveness", "tempo"];
//     var data = [];
//     for (var i = 0; i < 1; i++) {
//         var point = {
//             danceability: 0,
//             energy: 0,
//             liveness: 0,
//             tempo: 0
//         };
//         point.danceability = Data[1].danceability
//         point.energy = Data[1].energy
//         point.liveness = Data[1].liveness
//         point.tempo = Data[1].tempo
//         console.log(point)
//         //features.forEach(f => point[f] = Math.random());
//         data.push(point);
//         console.log(data);
//     }

//     function angleToCoordinate(angle, value) {
//         var x = Math.cos(angle) * radialScale(value);
//         var y = Math.sin(angle) * radialScale(value);
//         return { "x": 300 + x, "y": 300 - y };
//     }

//     var line = d3.svg.line()
//         .x(d => d.x)
//         .y(d => d.y);

//     function getPathCoordinates(data_point) {
//         var coordinates = [];
//         for (var i = 0; i < 4; i++) {
//             var ft_name = features[i];
//             var angle = (Math.PI / 2) + (2 * Math.PI * i / 4);
//             coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
//         }
//         return coordinates;
//     }


//     for (var i = 0; i < data.length; i++) {
//         var d = data[i];
//         var coordinates = getPathCoordinates(d);
//         var da = d.danceability
//         var en = d.energy
//         var liv = d.liveness
//         var tem = d.tempo
//         svg.append("path")
//             .datum(coordinates)
//             .attr("d", line)
//             .attr("stroke-width", 3)
//             .attr("stroke", "yellow")
//             .attr("fill", "yellow")
//             .attr("stroke-opacity", 1)
//             .attr("opacity", 0.5)
//             .on("mouseover", function (d) {
//                 d3.select(this).transition()
//                     .duration('10')
//                     .attr('opacity', '1');
//             })
//             .on('mouseout', function (d) {
//                 d3.select(this).transition()
//                     .duration('10')
//                     .attr('opacity', '.5');
//             });
//         svg.append("circle")
//             .attr("cx", coordinates[0].x)
//             .attr("cy", coordinates[0].y)
//             .attr("r", 6)
//             .style("fill", "yellow")
//             .on("mouseover", function (d) {
//                 newX = coordinates[0].x - 10;
//                 newY = coordinates[0].y - 10;
//                 tooltip
//                     .attr('x', newX)
//                     .attr('y', newY)
//                     .text(da)
//                     .transition().duration(200)
//                     .style('opacity', 1);
//             })
//             .on("mouseout", function () {
//                 tooltip.transition().duration(200)
//                     .style("opacity", 0);
//             });
//         svg.append("circle")
//             .attr("cx", coordinates[1].x)
//             .attr("cy", coordinates[1].y)
//             .attr("r", 6)
//             .style("fill", "yellow")
//             .on("mouseover", function (d) {
//                 newX = coordinates[1].x - 10;
//                 newY = coordinates[1].y - 10;
//                 tooltip
//                     .attr('x', newX)
//                     .attr('y', newY)
//                     .text(en)
//                     .transition().duration(200)
//                     .style('opacity', 1);
//             })
//             .on("mouseout", function () {
//                 tooltip.transition().duration(200)
//                     .style("opacity", 0);
//             });
//         svg.append("circle")
//             .attr("cx", coordinates[2].x)
//             .attr("cy", coordinates[2].y)
//             .attr("r", 6)
//             .style("fill", "yellow")
//             .on("mouseover", function (d) {
//                 newX = coordinates[2].x - 10;
//                 newY = coordinates[2].y - 10;
//                 tooltip
//                     .attr('x', newX)
//                     .attr('y', newY)
//                     .text(liv)
//                     .transition().duration(200)
//                     .style('opacity', 1);
//             })
//             .on("mouseout", function () {
//                 tooltip.transition().duration(200)
//                     .style("opacity", 0);
//             });
//         svg.append("circle")
//             .attr("cx", coordinates[3].x)
//             .attr("cy", coordinates[3].y)
//             .attr("r", 6)
//             .style("fill", "yellow")
//             .on("mouseover", function (d) {
//                 newX = coordinates[3].x - 10;
//                 newY = coordinates[3].y - 10;
//                 tooltip
//                     .attr('x', newX)
//                     .attr('y', newY)
//                     .text(tem)
//                     .transition().duration(200)
//                     .style('opacity', 1);
//             })
//             .on("mouseout", function () {
//                 tooltip.transition().duration(200)
//                     .style("opacity", 0);
//             });
//     }
//     var tooltip = svg.append("text")
//         .attr("class", "tooltip")
//         .style("opacity", 0);


//     function render_dat1() {

//         let d1, coordinates1;
//         if (dat1.length > 0) {
//             d1 = dat1[0];
//             coordinates1 = [getPathCoordinates(d1)];
//         }
//         else {
//             coordinates1 = []
//         }
//         console.log(coordinates1)
//         let u = svg.selectAll('.d1').data(coordinates1)

//         var da = d1.danceability
//         var en = d1.energy
//         var liv = d1.liveness
//         var tem = d1.tempo

//         u.enter().append("path")
//             .attr('class', 'd1')
//             .attr("d", line)
//             .attr("stroke-width", 3)
//             .attr("stroke", "green")
//             .attr("fill", "green")
//             .attr("stroke-opacity", 11)
//             .attr("opacity", 0.5)
//             .on("mouseover", function (d) {
//                 d3.select(this).transition()
//                     .duration('10')
//                     .attr('opacity', '1');
//             })
//             .on('mouseout', function (d) {
//                 d3.select(this).transition()
//                     .duration('10')
//                     .attr('opacity', '.5');
//             });
//         svg.append("circle")
//             .attr("cx", coordinates1[0].x)
//             .attr("cy", coordinates1[0].y)
//             .attr("r", 6)
//             .style("fill", "green")
//             .on("mouseover", function (d) {
//                 newX = coordinates1[0].x - 10;
//                 newY = coordinates1[0].y - 10;
//                 tooltip
//                     .attr('x', newX)
//                     .attr('y', newY)
//                     .text(da)
//                     .transition().duration(200)
//                     .style('opacity', 1);
//             })
//             .on("mouseout", function () {
//                 tooltip.transition().duration(200)
//                     .style("opacity", 0);
//             });
//         svg.append("circle")
//             .attr("cx", coordinates1[1].x)
//             .attr("cy", coordinates1[1].y)
//             .attr("r", 6)
//             .style("fill", "green")
//             .on("mouseover", function (d) {
//                 newX = coordinates1[1].x - 10;
//                 newY = coordinates1[1].y - 10;
//                 tooltip
//                     .attr('x', newX)
//                     .attr('y', newY)
//                     .text(en)
//                     .transition().duration(200)
//                     .style('opacity', 1);
//             })
//             .on("mouseout", function () {
//                 tooltip.transition().duration(200)
//                     .style("opacity", 0);
//             });
//         svg.append("circle")
//             .attr("cx", coordinates1[2].x)
//             .attr("cy", coordinates1[2].y)
//             .attr("r", 6)
//             .style("fill", "green")
//             .on("mouseover", function (d) {
//                 newX = coordinates1[2].x - 10;
//                 newY = coordinates1[2].y - 10;
//                 tooltip
//                     .attr('x', newX)
//                     .attr('y', newY)
//                     .text(liv)
//                     .transition().duration(200)
//                     .style('opacity', 1);
//             })
//             .on("mouseout", function () {
//                 tooltip.transition().duration(200)
//                     .style("opacity", 0);
//             });
//         svg.append("circle")
//             .attr("cx", coordinates1[3].x)
//             .attr("cy", coordinates1[3].y)
//             .attr("r", 6)
//             .style("fill", "green")
//             .on("mouseover", function (d) {
//                 newX = coordinates1[3].x - 10;
//                 newY = coordinates1[3].y - 10;
//                 tooltip
//                     .attr('x', newX)
//                     .attr('y', newY)
//                     .text(tem)
//                     .transition().duration(200)
//                     .style('opacity', 1);
//             })
//             .on("mouseout", function () {
//                 tooltip.transition().duration(200)
//                     .style("opacity", 0);
//             });

//         u.exit()
//             .remove()
//     }

//     function render_dat2() {

//         let d2, coordinates2;
//         if (dat2.length > 0) {
//             d2 = dat2[0];
//             coordinates2 = [getPathCoordinates(d2)];
//         }
//         else {
//             coordinates2 = []
//         }

//         let u = svg.selectAll('.d2').data(coordinates2)

//         u.enter().append("path")
//             .attr('class', 'd2')
//             .attr("d", line)
//             .attr("stroke-width", 3)
//             .attr("stroke", "blue")
//             .attr("fill", "blue")
//             .attr("stroke-opacity", 1)
//             .attr("opacity", 0.5)

//         u.exit()
//             .remove()
//     }

//     function render_dat3() {

//         let d3, coordinates3;
//         if (dat3.length > 0) {
//             d3 = dat3[0];
//             coordinates3 = [getPathCoordinates(d3)];
//         }
//         else {
//             coordinates3 = []
//         }

//         let u = svg.selectAll('.d3').data(coordinates3)

//         u.enter().append("path")
//             .attr('class', 'd3')
//             .attr("d", line)
//             .attr("stroke-width", 3)
//             .attr("stroke", "red")
//             .attr("fill", "red")
//             .attr("stroke-opacity", 1)
//             .attr("opacity", 0.5)

//         u.exit()
//             .remove()
//     }

//     function render_dat4() {

//         let d4, coordinates4;
//         if (dat4.length > 0) {
//             d4 = dat4[0];
//             coordinates4 = [getPathCoordinates(d4)];
//         }
//         else {
//             coordinates4 = []
//         }

//         let u = svg.selectAll('.d4').data(coordinates4)

//         u.enter().append("path")
//             .attr('class', 'd4')
//             .attr("d", line)
//             .attr("stroke-width", 3)
//             .attr("stroke", "pink")
//             .attr("fill", "pink")
//             .attr("stroke-opacity", 1)
//             .attr("opacity", 0.5)

//         u.exit()
//             .remove()
//     }
// }
    // svg.append("circle").attr("cx", 540).attr("cy", 500).attr("r", 6).style("fill", "yellow")
    // svg.append("circle").attr("cx", 540).attr("cy", 520).attr("r", 6).style("fill", "green")
    // svg.append("circle").attr("cx", 540).attr("cy", 540).attr("r", 6).style("fill", "blue")
    // svg.append("circle").attr("cx", 540).attr("cy", 560).attr("r", 6).style("fill", "red")
    // svg.append("circle").attr("cx", 540).attr("cy", 580).attr("r", 6).style("fill", "pink")
    // svg.append("text").attr("x", 547).attr("y", 500).text("Current").style("font-size", "12px").attr("alignment-baseline", "middle")
    // svg.append("text").attr("x", 547).attr("y", 520).text("Append 1").style("font-size", "12px").attr("alignment-baseline", "middle")
    // svg.append("text").attr("x", 547).attr("y", 540).text("Append 2").style("font-size", "12px").attr("alignment-baseline", "middle")
    // svg.append("text").attr("x", 547).attr("y", 560).text("Append 3").style("font-size", "12px").attr("alignment-baseline", "middle")
    // svg.append("text").attr("x", 547).attr("y", 580).text("Append 4").style("font-size", "12px").attr("alignment-baseline", "middle")
