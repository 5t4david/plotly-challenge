// use d3 library to read in samples.json
// Initializing the page
function initial_page() {

    d3.json("samples.json").then(function(sd){
        var names = sd.names;
        var name_0 = names[0];

        d3.select('#selDataset').selectAll('option')
        .data(names)
        .enter()
        .append('option')
        .attr('value', d => d)
        .text(d => d);

        buildPlots(name_0);
        demographics(name_0);
        
    })
};

function buildPlots(id) {
    d3.json("samples.json").then(function(d){


    })
};
function optionChanged(inID){
    buildPlots(inID);
    demographics(inID);
};