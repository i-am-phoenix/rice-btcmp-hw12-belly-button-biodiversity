// Extract keys
let data1 = data[0]
console.log(Object.keys(data1))

console.log(data1.samples)

let samples_data = data1.samples

let samp = samples_data.map(function(sample_data) {
    return sample_data.sample_values;
    });

    console.log("Samp val:", samp);