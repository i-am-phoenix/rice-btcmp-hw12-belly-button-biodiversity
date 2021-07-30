// Extract keys
let data1 = data[0]
console.log(Object.keys(data1))

console.log(data1.samples)

let samples_data = data1.samples
console.log(`Number of test subjects ${samples_data.length}`)

// Function to add sample ID selections as HTML element
function addSelection(id) {
    var selection = document.getElementById("selDataset");
    var option = document.createElement("option");
    option.appendChild(document.createTextNode(id));
    selection.appendChild(option);
  } ;

// Read in sample ids and create drop-down selector
for (i=0; i<samples_data.length; i++) {
    let individualSample = samples_data[i];
    addSelection(individualSample.id);
};


for (i=0; i<samples_data.length; i++) {
    individualSample = samples_data[i];
    console.log(JSON.stringify(individualSample, null, 2))
    console.log(individualSample.id);
    console.log(individualSample.otu_ids);
    console.log(individualSample.otu_labels);
    console.log(individualSample.sample_values);

    // let sortedSubjectData = individualSample.sort((a, b) => b.sample_values - a.sample_values);
    let topTenOTU = individualSample;//sortedSubjectData.slice(0,10);

    console.log(`Subject ID #${topTenOTU.id}`);

    let trace_hbar = {
        x: topTenOTU.sample_values,
        y: topTenOTU.otu_ids,
        text: topTenOTU.otu_labels,
        type: 'bar',
        name: `Subject ID #${topTenOTU.id}`,
        orientation: 'h'
  };
  
  let data_hbar = [trace_hbar];
  
   // Apply a title to the layout
   let layout = {
      title: `Top 10 OTUs<br>found in Subject ID #${topTenOTU.id}`,
      width: 300,
      height: 500
    };
  
    Plotly.newPlot('bar', data_hbar, layout)
    // break; 
}
