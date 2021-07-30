// Extract data and keys
let data1 = data[0]
console.log(Object.keys(data1))
// console.log(data1.samples)

// Isolate sample data only, dropping metadata and names
let samples_data = data1.samples
console.log(`Number of test subjects ${samples_data.length}`)

// sort and filter top ten OTU for each sample
let topTenData = samples_data.map(d => {
    d.sample_values = d.sample_values.sort((a,b)=>b-a).slice(0,10)
    d.otu_ids = d.otu_ids.sort((a,b) => b-a).slice(0,10),
    d.otu_labels = d.otu_labels.sort((a,b) => b-a).slice(0,10)
    return d
 });//sortedSubjectData.slice(0,10);


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


for (i=0; i<topTenData.length; i++) {
    individualSample = topTenData[i];
    console.log(JSON.stringify(individualSample, null, 2))
    console.log(individualSample.id);
    console.log(individualSample.otu_ids);
    console.log(individualSample.otu_labels);
    console.log(individualSample.sample_values);

    // let sortedSubjectData = individualSample.sort((a, b) => b.sample_values - a.sample_values);
    
    console.log(`Subject ID #${topTenData.id}`);

    let trace_hbar = {
        x: individualSample.sample_values,
        y: individualSample.otu_ids,
        text: individualSample.otu_labels,
        type: 'bar',
        name: `Subject ID #${topTenData.id}`,
        orientation: 'h'
  };
  
  let data_hbar = [trace_hbar];
  
   // Apply a title to the layout
   let layout = {
      title: `Top 10 OTUs<br>found in Subject ID #${topTenData.id}`,
      width: 500,
      height: 500
    };
  
    Plotly.newPlot('bar', data_hbar, layout)
    break; 
}
