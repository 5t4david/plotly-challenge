// use d3 library to read in samples.json
// Initializing the page
function initial_page() {

    d3.json("samples.json").then(function(d){
        var names = d.names;
        var name_0 = names[0];

        plotdata(name_0);
        demographics(name_0)
    })
};