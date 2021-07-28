// Extract keys
let data1 = data[0]
console.log(Object.keys(data1))

console.log(data1.samples)

let samples_data = data1.samples
console.log(samples_data)

myID = samples_data.map(function (row){
    addSelection(row.id);
    return row.id
  });

  console.log(myID)

// Read in sample id
let samp_id = samples_data.map(function(row) {
    addSelection(row.id);
    return row.id;
    });

    // console.log("Samp id:", samp_id);

// Read in sample values for each respective id
let samp_val = samples_data.map(function(row) {
    return row.sample_values;
    });

    console.log("Samp val:", samp_val);
    console.log("Samp val:", samp_val[0]);

// Read in otu_ids as labels for the chart
let otu_id = samples_data.map(function(row) {
    return row.otu_ids;
    });

//     console.log("OTU id:", otu_id);

// Read in otu_ids as labels for the chart
let otu_lbl = samples_data.map(function(row) {
    return row.otu_labels;
    });

//     console.log("OTU :", otu_lbl);

// Function to filter out data with specific sample id

let sID = 941

// Initialize
var plot_samp_val;
var plot_otu_lbl;
var plot_otu_id;

for (i=0;i<samp_id.length;i++) {
    
    if (parseInt(samp_id[i]) == sID) {
        console.log("i=",i)
        
        plot_otu_lbl=otu_lbl[i];
        plot_otu_id=otu_id[i];
        plot_samp_val=samp_val[i];
        
        console.log(sID, "| otu_id | ", plot_otu_id);
        console.log(sID, "| otu_lbl | ", plot_otu_lbl);
        console.log(sID, "| samp_val | ", plot_samp_val);
    }
};

console.log(sID, ">>>>>>>>>>> ", plot_samp_val)

// Function to add sample ID selections
function addSelection(id) {
    var selection = document.getElementById("selDataset");
    var option = document.createElement("option");
    option.appendChild(document.createTextNode(id));
    selection.appendChild(option);
  } ;

let trace_hbar = {
      x: plot_samp_val,
      y: plot_otu_id,
      text: plot_otu_lbl,
      type: 'bar',
      name: `Subject ID #${sID}`,
      orientation: 'h'
};

let data_hbar = [trace_hbar];

 // Apply a title to the layout
 let layout = {
    title: `Top 10 OTUs found in the individual with Subject ID #${sID}`//,
    // margin: {
    //   l: 100,
    //   r: 100,
    //   t: 100,
    //   b: 100
    // }
  };

  Plotly.newPlot('bar', data_hbar, layout)

  
  // Render the plot to the div tag with id "plot"
  // Note that we use `traceData` here, not `data`
  Plotly.newPlot("plot", traceData, layout);