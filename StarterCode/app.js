// Extract keys
let data1 = data[0]
console.log(Object.keys(data1))

console.log(data1.samples)

let samples_data = data1.samples

// Read in sample id
let samp_id = samples_data.map(function(sample_data) {
    return sample_data.id;
    });

    console.log("Samp id:", samp_id);

// Read in sample values for each respective id
let samp_val = samples_data.map(function(sample_data) {
    return sample_data.sample_values;
    });

    console.log("Samp val:", samp_val);
    console.log("Samp val:", samp_val[0]);

// Read in otu_ids as labels for the chart
let otu_id = samples_data.map(function(sample_data) {
    return sample_data.otu_ids;
    });

    console.log("OTU id:", otu_id);

// Read in otu_ids as labels for the chart
let otu_lbl = samples_data.map(function(sample_data) {
    return sample_data.otu_labels;
    });

    console.log("OTU :", otu_lbl);

// Function to filter out data with specific sample id
console.log("Samp_id.id:",samp_id[0])

let sID = 940

console.log("=========================================")
for (i=0;i<samp_id.length;i++) {
    console.log("i=",i)
    if (parseInt(samp_id[i]) == sID) {
        let plot_otu_lbl=otu_lbl[i]
        let plot_otu_id=otu_id[i]
        let plot_samp_val=samp_val[i]
        console.log(sID, "| otu_id | ", plot_otu_id)
        console.log(sID, "| otu_lbl | ", plot_otu_lbl)
        console.log(sID, "| samp_val | ", plot_samp_val)
    }

}