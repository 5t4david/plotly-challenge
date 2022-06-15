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
// use d3 library to read in samples.json
function buildPlots(id) {
    d3.json("samples.json").then(function(d){
        var ids = d.samples.filter(sample => sample.id == id);
        var results = ids[0];

        data = [];
        for (i=0; i<results.sample_values.length; i++){
            data.push({
                id: `OTU ${results.otu_ids[i]}`,
                value: results.sample_values[i],
                label: results.otu_labels[i]
            });
        }
        
        var top_ten = data.sort(function sortFunction(a,b){
            return b.value - a.value;
        }).slice(0,10);

        var hr_bar = top_ten.sort(function sortFunction(a,b){
            return a.value - b.value;
        })

        var trace1 = [{
            type: "bar",
            orientation: 'h',
            x: hr_bar.map(row=> row.value),
            y: hr_bar.map(row => row.id),
            text: hr_bar.map(row => row.label),
            mode: 'markers',
            marker: {
                color: ['#316e5d', '#16b588', '#c9edf5', '#7885a1', '#033838', 
                '#6efafa', '#066666', '#384a4a', '#c5e3e3', '#035057'],
            }
          }];

        var Barlayout = {
            title: `<span style='font-size:1em; color:#070f0d'><b>Top 10 OTUs for ID ${id}<b></span>`,
            xaxis: {autorange: true, title: 'Sample Values'},
            yaxis: {autorange: true},
            width: 500,
            height: 500
            };

        Plotly.newPlot("bar", trace1, Barlayout);

        var trace2 = {
            x: results.otu_ids,
            y: results.sample_values,
            mode: 'markers',
            marker: {
                size: results.sample_values,
                color: results.otu_ids,
                colorscale: 'country'
            },
            text: results.otu_labels
        };

        var Bubbledata = [trace2]

        var Bubblelayout = {
            title: `<span style='font-size:1em; color:#070f0d'><b>OTU Data for ID ${id}<b></span>`,
            xaxis: {title:'OTU ID'},
            yaxis: {title: 'Sample Values'},
            width: window.width
        };

        Plotly.newPlot('bubble', Bubbledata, Bubblelayout);
    
    })
};


function optionChanged(inID){
    buildPlots(inID);
    demographics(inID);
};


initial_page()