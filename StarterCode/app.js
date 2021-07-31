// Load data
let data_json = []
let file = "samples.json"
d3.json(file).then(function(data_json) {
  console.log("json import..........",data_json.samples[0]);
})

// Extract data and keys
let data1 = data[0]
// console.log("High level keys:", Object.keys(data1))
console.log("js import..............", data1.samples[0])

// Isolate metadata
let meta_data = data1.metadata
let meta_keys = Object.keys(meta_data[0])
// console.log("Metakeys", meta_keys)


// Isolate sample data only, dropping metadata and names
let samples_data_all = data[0].samples;
var samples_data = samples_data_all;

//console.log(`Number of test subjects ${samples_data.length}`);
console.log("1. samples_data[0]..............", samples_data[0])

// sort and filter top ten OTU for each sample
 topTenData = samples_data.map(d => {
    // d.sample_values = d.sample_values.sort((a,b)=>b-a).slice(0,10).reverse();
    // d.otu_ids = d.otu_ids.sort((a,b) => b-a).slice(0,10).reverse();
    // d.otu_labels = d.otu_labels.sort((a,b) => b-a).slice(0,10).reverse();
    d.sample_values = d.sample_values.slice(0,10).reverse();
    d.otu_ids = d.otu_ids.slice(0,10).reverse();
    d.otu_labels = d.otu_labels.slice(0,10).reverse();
    return d
 });
 
 console.log("2. samples_data_all[0]..............", samples_data_all[0])
 console.log("3. topTenData[0]..............", topTenData[0])

// Function to add sample ID selections as HTML element
function addSelection(id) {
    var selection = document.getElementById("selDataset");
    var option = document.createElement("option");
    option.appendChild(document.createTextNode(id));
    selection.appendChild(option);
  } ;

// Function to add sample ID info within panel-body class
function addInfo(d) {
  // Locate div tag within which metadata will be added
  var panel = document.getElementById("sample-metadata");

  // Loop through all metadata categories
  var mk = Object.keys(d)
    // console.log("mk:",mk)
    // console.log(`d=`,d)
    for (k=0;k<mk.length;k++) {
        // set up span element
        var p = document.createElement("p");
        // add text to the newly added spn tag
        p.appendChild(document.createTextNode(`${mk[k]}: ${d[mk[k]]}`));
        // append span to parent tag
        panel.appendChild(p);
    };
} ;  


// Read in sample ids and create drop-down selector
for (i=0; i<samples_data.length; i++) {
    let individualSample = samples_data[i];
    addSelection(individualSample.id);
};

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  
  // Assign the value of the dropdown menu option to a variable
  var specimen = dropdownMenu.property("value");

  // Initialize x and y arrays
  var x = [];
  var y = [];

  for (i=0; i<topTenData.length; i++) {
    individualSample = topTenData[i];
    if (individualSample.id == specimen) {   
      x = individualSample.sample_values;
      y = individualSample.otu_ids.map(d => `OTU ${d}   `);
      text = individualSample.otu_labels;
    
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bar", "text", [text]);
    
    // Update bar chart title based on specimen selected
    var layout_update = {
      title: `Top 10 OTUs<br>found in Subject ID #${individualSample.id}`
    };
    Plotly.relayout("bar", layout_update);

    // Update bubble map
    // Note the extra brackets around 'x' and 'y'
    yb= individualSample.otu_ids,
    xb= individualSample.sample_values
    // textb = individualSample.otu_labels.map(d => `Label ${d}   `),
    Plotly.restyle("bubble", "x", [x]);
    Plotly.restyle("bubble", "y", [y]);
    // Plotly.restyle("bubble", "text", [text]);
    };
  }

  for (i=0; i<meta_data.length; i++) {
    individualSample = meta_data[i];
    if (individualSample.id == specimen) {
      document.getElementById("sample-metadata").innerHTML = "";
      addInfo(individualSample);
    };
  };
};

function init_bar_meta() {
// ----------------- HORIZONTAL BAR CHART
  for (i=0; i<topTenData.length; i++) {
      individualSample = topTenData[i];
      // console.log(JSON.stringify(individualSample, null, 2))
      // console.log("subject_id:", individualSample.id);
      // console.log("sample_ids:", individualSample.otu_ids);
      // console.log("labels:", individualSample.otu_labels);
      // console.log("sample_valus:", individualSample.sample_values);

      // let sortedSubjectData = individualSample.sort((a, b) => b.sample_values - a.sample_values);
      
      // console.log(`Subject ID #${individualSample.id}`);

      let trace_hbar = {
          x: individualSample.sample_values,
          y: individualSample.otu_ids.map(d => `OTU ${d}   `),
          text: individualSample.otu_labels,
          type: 'bar',
          name: `Subject ID #${individualSample.id}`,
          orientation: 'h',
          margin: {t:0}
    };
    
    // console.log("here is y:", individualSample.otu_ids.reverse().map(d => `OTU ${d}`))

    let data_hbar = [trace_hbar];
    
    // Apply a title to the layout
    let layout = {
        title: `Top 10 OTUs<br>found in Subject ID #${individualSample.id}`,
        width: "100%",
        height: "100%"
      };
    
      Plotly.newPlot('bar', data_hbar, layout)

// ----------------- METADATA REPORTING
      // console.log("debug1==========", meta_data[0])
      addInfo(meta_data[0]);

      break; 
  };
};

var individualSampleBubble={};
var data_bubble = [];
var trace_bubble = {};
function init_bubble() {
// ----------------- BUBBLE PLOT  
     for (i=0; i<data1.samples.length; i++) {
      
      individualSampleBubble = data1.samples[i];
      // console.log(">>>>>>>>> individualSampleBubble.length=", individualSampleBubble)
      // console.log("-----------DEBUG------------", individualSampleBubble, individualSampleBubble.otu_ids.length)
      
      trace_bubble = {
        x: individualSampleBubble.otu_ids,
        y: individualSampleBubble.sample_values,
        text: individualSampleBubble.otu_labels.map(d => `Label ${d}   `),
        name: `ID ${individualSampleBubble.id}`,
        mode: 'markers',
        marker: {
          color: individualSample.otu_ids,
          colorscale: 'Portland',
          type: 'heatmap',
          opacity: 0.6,
          size: individualSampleBubble.sample_values,
          sizeref: 2,
          colorbar: {
            thickness: 10,
            y: 0.5,
            ypad: 0,
            title: 'OTU IDs',
            titleside: 'bottom',
            outlinewidth: 1,
            outlinecolor: 'black',
            tickfont: {
              family: 'Lato',
              size: 14,
              color: 'green'
            }
          }
        }
      };

      data_bubble.push(trace_bubble);

      var layout_bubble = {
        title: 'Overall sample stats',
        showlegend: false,
        height: 600
        // width: %
      };

      Plotly.newPlot('bubble', data_bubble, layout_bubble); 
      break;
  };
};

init_bar_meta();
init_bubble();