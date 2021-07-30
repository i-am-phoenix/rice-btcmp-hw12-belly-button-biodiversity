// // Load data
// d3.json(roadster).then(function(data) {
//   console.log(data);
// })


// Extract data and keys
let data1 = data[0]
console.log("High level keys:", Object.keys(data1))
console.log("Samples:", data1.samples)

// Isolate sample data only, dropping metadata and names
let samples_data = data1.samples;
console.log(`Number of test subjects ${samples_data.length}`);

// Isolate metadata
let meta_data = data1.metadata
let meta_keys = Object.keys(meta_data[0])
console.log("Metakeys", meta_keys)

// sort and filter top ten OTU for each sample
let topTenData = samples_data.map(d => {
    d.sample_values = d.sample_values.sort((a,b)=>b-a).slice(0,10).reverse();
    d.otu_ids = d.otu_ids.sort((a,b) => b-a).slice(0,10).reverse();
    d.otu_labels = d.otu_labels.sort((a,b) => b-a).slice(0,10).reverse();
    return d
 });//sortedSubjectData.slice(0,10);


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
    console.log("mk:",mk)
    console.log(`d=`,d)
    for (k=0;k<mk.length;k++) {
        // set up span element
        var span = document.createElement("p");
        // add text to the newly added spn tag
        span.appendChild(document.createTextNode(`${mk[k]}: ${d[mk[k]]}`));
        // append span to parent tag
        panel.appendChild(span);
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
    
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    
    // Update bar chart title based on specimen selected
    var layout_update = {
      title: `Top 10 OTUs<br>found in Subject ID #${individualSample.id}`
    };
    Plotly.relayout("bar", layout_update);
    };
  }
}

function init() {
  for (i=0; i<topTenData.length; i++) {
      individualSample = topTenData[i];
      console.log(JSON.stringify(individualSample, null, 2))
      console.log("subject_id:", individualSample.id);
      console.log("sample_ids:", individualSample.otu_ids);
      console.log("labels:", individualSample.otu_labels);
      console.log("sample_valus:", individualSample.sample_values);

      // let sortedSubjectData = individualSample.sort((a, b) => b.sample_values - a.sample_values);
      
      console.log(`Subject ID #${individualSample.id}`);

      let trace_hbar = {
          x: individualSample.sample_values,
          y: individualSample.otu_ids.map(d => `OTU ${d}   `),
          text: individualSample.otu_labels,
          type: 'bar',
          name: `Subject ID #${individualSample.id}`,
          orientation: 'h',
          margin: {t:0}
    };
    
    console.log("here is y:", individualSample.otu_ids.reverse().map(d => `OTU ${d}`))

    let data_hbar = [trace_hbar];
    
    // Apply a title to the layout
    let layout = {
        title: `Top 10 OTUs<br>found in Subject ID #${individualSample.id}`,
        width: 500,
        height: 500
      };
    
      Plotly.newPlot('bar', data_hbar, layout)

      console.log("debug1==========", meta_data[0])
      addInfo(meta_data[0]);
      
      break; 
  };
};

init();