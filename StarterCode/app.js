// Load data
let data = []
let file = "samples.json"

d3.json(file).then((data)=> {
  console.log(data)
// });

// Isolate metadata
let meta_data = data.metadata
let meta_keys = Object.keys(meta_data[0])
console.log("1. meta_data[0]..............", meta_data[0])


// Isolate sample data only
let samples_data = data.samples;

//console.log(`Number of test subjects ${samples_data.length}`);
console.log("2. samples_data[0]..............", samples_data[0])
// --------------------------------- CRETE DROP-DOWN --------------------------------------
// Function to add sample ID selections as HTML element
function addSelection(id) {
    var selection = document.getElementById("selDataset");
    var option = document.createElement("option");
    option.appendChild(document.createTextNode(id));
    selection.appendChild(option);
  } ;

function createDropDownMenu(input) {
  // Read in sample ids and create drop-down selector
  for (i=0; i<input.length; i++) {
      let individualSample = input[i];
      addSelection(individualSample.id);
  };
};

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// ---------------------------------- INITIALIZING --------------------------------------------
// Function to add sample ID info within panel-body class
function initMeta(input) {
  // Locate div tag within which metadata will be added
  var panel = document.getElementById("sample-metadata");

  // Loop through all metadata categories
  var mk = Object.keys(input)
    // console.log("mk:",mk)
    // console.log(`d=`,d)
    for (k=0;k<mk.length;k++) {
        // set up span element
        var p = document.createElement("p");
        // add text to the newly added spn tag
        p.appendChild(document.createTextNode(`${mk[k]}: ${input[mk[k]]}`));
        // append span to parent tag
        panel.appendChild(p);
    };
} ;  

// Initializing horizontal bar chart
function initBar(input) {

  // sort and filter top ten OTU for each sample
  topTenData = input.map(d => {
    d.sample_values = d.sample_values.slice(0,10).reverse();
    d.otu_ids = d.otu_ids.slice(0,10).reverse();
    d.otu_labels = d.otu_labels.slice(0,10).reverse();
    return d
  });

  // ----------------- HORIZONTAL BAR CHART
    for (i=0; i<topTenData.length; i++) {
        individualSample = topTenData[i];
 
        let trace_hbar = {
            x: individualSample.sample_values,
            y: individualSample.otu_ids.map(d => `OTU ${d}   `),
            text: individualSample.otu_labels,
            type: 'bar',
            name: `Subject ID #${individualSample.id}`,
            orientation: 'h',
            margin: {t:0}
      };
      
      let data_hbar = [trace_hbar];
      
      // Apply a title to the layout
      let layout = {
          title: `Top 10 OTUs<br>found in Subject ID #${individualSample.id}`,
          width: "100%",
          height: "100%"
        };
      
        Plotly.newPlot('bar', data_hbar, layout, {responsive: true})
        break; 
    };
  };


var individualSampleBubble={};
var data_bubble = [];
var trace_bubble = {};
function initBubble(input) {
// ----------------- BUBBLE PLOT  
     for (i=0; i<input.length; i++) {
      
      individualSampleBubble = input[i];
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
        xaxis: {
          // autotick: false,
          // ticks: 'outside',
          tick0: 0,
          // dtick: 0.25,
          // ticklen: 8,
          // tickwidth: 4,
          // tickcolor: '#000'
        },
        yaxis: {
          // autotick: false,
          // ticks: 'outside',
          tick0: 0,
          // dtick: 0.25,
          // ticklen: 8,
          // tickwidth: 4,
          // tickcolor: '#000'
        },
        title: 'Overall sample stats',
        showlegend: false,
        height: 600,
        // width: %

      };

      Plotly.newPlot('bubble', data_bubble, layout_bubble, {responsive: true}); 
      break;
  };
};

// Function to add sample ID info within panel-body class
function addInfo(input) {
  // Locate div tag within which metadata will be added
  var panel = document.getElementById("sample-metadata");

  // Loop through all metadata categories
  var mk = Object.keys(input)
    // console.log("mk:",mk)
    // console.log(`d=`,d)
    for (k=0;k<mk.length;k++) {
        // set up span element
        var p = document.createElement("p");
        // add text to the newly added spn tag
        p.appendChild(document.createTextNode(`${mk[k]}: ${input[mk[k]]}`));
        // append span to parent tag
        panel.appendChild(p);
    };
} ;  

// ---------------------------------------- UPDATING ----------------------------------------

function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  
  // Assign the value of the dropdown menu option to a variable
  var specimen = dropdownMenu.property("value");
  
  updateBar(samples_data, specimen);
  updateMeta(meta_data, specimen);
  updateBubble(samples_data, specimen)

};

function updateBar(input, subject) {
  // sort and filter top ten OTU for each sample
  topTenData = input.map(d => {
    d.sample_values = d.sample_values.slice(0,10);//.reverse();
    d.otu_ids = d.otu_ids.slice(0,10);//.reverse();
    d.otu_labels = d.otu_labels.slice(0,10);//.reverse();
    return d
  });
  
  // Initialize x and y arrays
  var x = [];
  var y = [];
  var xb = [];
  var yb = [];

  for (i=0; i<topTenData.length; i++) {
    individualSample = topTenData[i];

    if (individualSample.id == subject) {   
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
      yb = individualSample.otu_ids,
      xb = individualSample.sample_values
      textb = individualSample.otu_labels.map(d => `Label ${d}   `),
      
      Plotly.restyle("bubble", "x", [xb]);
      Plotly.restyle("bubble", "y", [yb]);
      Plotly.restyle("bubble", "text", [textb]);

      // Plotly.update("bubble", {
      //   marker: {
      //     color: individualSample.otu_ids,
      //     size: individualSample.sample_values}
      //   }
      // )
    };
  };
};


function updateMeta(input, subject) {
  for (i=0; i<input.length; i++) {
    individualSample = input[i];

    if (individualSample.id == subject) {
      // erase existing text
      document.getElementById("sample-metadata").innerHTML = "";
      // add new text
      addInfo(individualSample);
    };
  };
};

function updateBubble(input, subject) {
  // Initialize x and y arrays
  var x = [];
  var y = [];
  var xb = [];
  var yb = [];

  for (i=0; i<input.length; i++) {
    individualSample = input[i];

    if (individualSample.id == subject) {   
      xb = individualSample.otu_ids,
      yb = individualSample.sample_values
      textb = individualSample.otu_labels.map(d => `Label ${d}   `),
      
      Plotly.restyle("bubble", "x", [xb]);
      Plotly.restyle("bubble", "y", [yb]);
      Plotly.restyle("bubble", "text", [textb]);

      var upd = {
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

      var layout_update = {
        xaxis: {
          // autotick: false,
          // ticks: 'outside',
          tick0: 0,
          // dtick: 0.25,
          // ticklen: 8,
          // tickwidth: 4,
          // tickcolor: '#000'
        },
        yaxis: {
          // autotick: false,
          // ticks: 'outside',
          tick0: 0,
          // dtick: 0.25,
          // ticklen: 8,
          // tickwidth: 4,
          // tickcolor: '#000'
        }
      };

      Plotly.restyle("bubble", upd);
      Plotly.relayout("bubble", layout_update);
    };
  };
};


createDropDownMenu(samples_data);
initMeta(meta_data[0]);
initBar(samples_data);
initBubble(samples_data);

});