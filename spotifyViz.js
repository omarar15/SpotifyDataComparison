// Selecting SVG elements for manipulation
let svgOmarV = d3.select("svg#omarValence");
let svgOmarE = d3.select("svg#omarEnergy");
let svgOmarD = d3.select("svg#omarDanceability");
let svgSheetalV = d3.select("svg#sheetalValence");
let svgSheetalE = d3.select("svg#sheetalEnergy");
let svgSheetalD = d3.select("svg#sheetalDanceability");
let svgAlexaV = d3.select("svg#alexaValence");
let svgAlexaE = d3.select("svg#alexaEnergy");
let svgAlexaD = d3.select("svg#alexaDanceability");

let svgV = [svgOmarV, svgSheetalV, svgAlexaV];
let svgE = [svgOmarE, svgSheetalE, svgAlexaE];
let svgD = [svgOmarD, svgSheetalD, svgAlexaD];
let svgOmar = [svgOmarV, svgOmarE, svgOmarD]
let svgSheetal = [svgSheetalV, svgSheetalE, svgSheetalD]
let svgAlexa = [svgAlexaV, svgAlexaE, svgAlexaD]
let svgList = svgV.concat(svgE, svgD);

// Establishing margins for plotting
let width = 400;
let height = 400;
let margin = { "top": 35, "right": 25, "bottom": 50, "left": 60};
let chartWidth = width - margin.left - margin.right;
let chartHeight = height - margin.top - margin.bottom;

// Selecting channels for the data
usaColor = "#04A777";
omarColor = "#ed2939";
sheetalColor = "#ffae42";
alexaColor = "#4169e1";
pointRadius = 3;
pointOpacity = 0.7;

// Creating scales
const rankMin = 100;
const rankMax = 1;
const rankScale = d3.scaleLinear()
  .domain([rankMin, rankMax])
  .range([0, chartWidth])
;

const valueMin = 0;
const valueMax = 1;
const valueScale = d3.scaleLinear()
  .domain([valueMin, valueMax])
  .range([chartHeight, 0])
;

// Creating and applying axes and gridlines
let leftAxis = d3.axisLeft(valueScale).ticks(2);
let leftGridlines = d3.axisLeft(valueScale).tickSize(-chartWidth).tickFormat("");
let bottomAxis = d3.axisBottom(rankScale).ticks(4);
let bottomGridlines = d3.axisBottom(rankScale).tickSize(-chartHeight).tickFormat("");

svgList.forEach( (d,i) => {
  d.append("g")
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .call(leftGridlines)
    .attr("opacity", 0.1);

  d.append("g")
    .attr("transform","translate("+ margin.left +","+ (margin.top + chartHeight) +")")
    .call(bottomGridlines)
    .attr("opacity", 0.1);

  d.append("g")
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .call(leftAxis)
    .attr("opacity", 0.9);

  d.append("g")
    .attr("transform","translate("+ (margin.left) +","+ (margin.top + chartHeight) +")")
    .call(bottomAxis)
    .attr("opacity", 0.9);
});

// Adding chart and axis labels
svgList.forEach( (d,i) => {
  d.append("text")
    .attr("text-anchor", "middle")
    .attr("x", rankScale(50) + margin.left)
    .attr("y", chartHeight + margin.top + 35)
    .attr("font-size", "12px")
    .text("List Rank")
});

svgOmar.forEach( (d,i) => {
  d.append("text")
    .attr("text-anchor", "middle")
    .attr("x", rankScale(50) + margin.left)
    .attr("y", margin.top - 20)
    .attr("font-size", "16px")
    .text("Omar")
});

svgSheetal.forEach( (d,i) => {
  d.append("text")
    .attr("text-anchor", "middle")
    .attr("x", rankScale(50) + margin.left)
    .attr("y", margin.top - 20)
    .attr("font-size", "16px")
    .text("Sheetal")
});

svgAlexa.forEach( (d,i) => {
  d.append("text")
    .attr("text-anchor", "middle")
    .attr("x", rankScale(50) + margin.left)
    .attr("y", margin.top - 20)
    .attr("font-size", "16px")
    .text("Alexa")
});

svgV.forEach( (d,i) => {
  xCent = margin.left-35;
  yCent = valueScale(0.5) + margin.top;

  d.append("text")
    .attr("text-anchor", "middle")
    .attr("x", xCent)
    .attr("y", yCent)
    .attr("font-size", "12px")
    .attr("transform", "rotate(-90," + xCent + "," + yCent + ")")
    .text("Valence Value")
});

svgE.forEach( (d,i) => {
  xCent = margin.left-35;
  yCent = valueScale(0.5) + margin.top;

  d.append("text")
    .attr("text-anchor", "middle")
    .attr("x", xCent)
    .attr("y", yCent)
    .attr("font-size", "12px")
    .attr("transform", "rotate(-90," + xCent + "," + yCent + ")")
    .text("Energy Value")
});

svgD.forEach( (d,i) => {
  xCent = margin.left-35;
  yCent = valueScale(0.5) + margin.top;

  d.append("text")
    .attr("text-anchor", "middle")
    .attr("x", xCent)
    .attr("y", yCent)
    .attr("font-size", "12px")
    .attr("transform", "rotate(-90," + xCent + "," + yCent + ")")
    .text("Danceability Value")
});

// Adding 2018 Spotify US Top 100 data
d3.json("datasets/usa2018.json").then(function(data){
  
  svgV.forEach( x => {
    let usValenceSum = 0;

    data.forEach( (d,i) => {
      usValenceSum = d.valence + usValenceSum;
      x.append("circle")
        .attr("cx", rankScale(i+1))
        .attr("cy", valueScale(d.valence))
        .attr("r", pointRadius)
        .attr("fill", usaColor)
        .attr("opacity", pointOpacity)
        .attr("transform","translate("+ (margin.left) +","+ margin.top +")");
      
    });

    let usValenceAverage = usValenceSum / 100;
    x.append("line")
      .attr("x1", rankScale(rankMin))
      .attr("x2", rankScale(rankMax))
      .attr("y1", valueScale(usValenceAverage))
      .attr("y2", valueScale(usValenceAverage))
      .attr("opacity", 0.4)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
      .style("stroke-dasharray", ("7, 7"))
      .style("stroke", usaColor)
      .style("stroke-width", 2);
  });
  
  svgE.forEach( x => {
    let usEnergySum = 0;
    data.forEach( (d,i) => {
      usEnergySum = d.energy + usEnergySum;
      x.append("circle")
        .attr("cx", rankScale(i+1))
        .attr("cy", valueScale(d.energy))
        .attr("r", pointRadius)
        .attr("fill", usaColor)
        .attr("opacity", pointOpacity)
        .attr("transform","translate("+ (margin.left) +","+ margin.top +")");
    });

    let usEnergyAverage = usEnergySum / 100;
    x.append("line")
      .attr("x1", rankScale(rankMin))
      .attr("x2", rankScale(rankMax))
      .attr("y1", valueScale(usEnergyAverage))
      .attr("y2", valueScale(usEnergyAverage))
      .attr("opacity", 0.4)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
      .style("stroke-dasharray", ("7, 7"))
      .style("stroke", usaColor)
      .style("stroke-width", 2);
  });

  svgD.forEach( x => {
    let usDanceabilitySum = 0;
    data.forEach( (d,i) => {
      usDanceabilitySum = d.danceability + usDanceabilitySum;
      x.append("circle")
        .attr("cx", rankScale(i+1))
        .attr("cy", valueScale(d.danceability))
        .attr("r", pointRadius)
        .attr("fill", usaColor)
        .attr("opacity", pointOpacity)
        .attr("transform","translate("+ (margin.left) +","+ margin.top +")");
    });

    let usDanceabilityAverage = usDanceabilitySum / 100;
    x.append("line")
      .attr("x1", rankScale(rankMin))
      .attr("x2", rankScale(rankMax))
      .attr("y1", valueScale(usDanceabilityAverage))
      .attr("y2", valueScale(usDanceabilityAverage))
      .attr("opacity", 0.4)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
      .style("stroke-dasharray", ("7, 7"))
      .style("stroke", usaColor)
      .style("stroke-width", 2);
  });
});

// Adding Omar's 2018 Top 100 data
d3.json("datasets/omar.json").then(function(data){
  let vSum = 0;
  let eSum = 0;
  let dSum = 0;
  
  data.forEach( (d,i) => {
    vSum = d.valence + vSum;
    eSum = d.energy + eSum;
    dSum = d.danceability + dSum;

    svgOmarV.append("circle")
      .attr("cx", rankScale(i+1))
      .attr("cy", valueScale(d.valence))
      .attr("r", pointRadius)
      .attr("fill", omarColor)
      .attr("opacity", pointOpacity)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")");

    svgOmarE.append("circle")
      .attr("cx", rankScale(i+1))
      .attr("cy", valueScale(d.energy))
      .attr("r", pointRadius)
      .attr("fill", omarColor)
      .attr("opacity", pointOpacity)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")");

    svgOmarD.append("circle")
      .attr("cx", rankScale(i+1))
      .attr("cy", valueScale(d.danceability))
      .attr("r", pointRadius)
      .attr("fill", omarColor)
      .attr("opacity", pointOpacity)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")");
  })

  let vAverage = vSum / 100;
  let eAverage = eSum / 100;
  let dAverage = dSum / 100;

  svgOmarV.append("line")
    .attr("x1", rankScale(rankMin))
    .attr("x2", rankScale(rankMax))
    .attr("y1", valueScale(vAverage))
    .attr("y2", valueScale(vAverage))
    .attr("opacity", 0.4)
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .style("stroke-dasharray", ("7, 7"))
    .style("stroke", omarColor)
    .style("stroke-width", 2);

  svgOmarE.append("line")
    .attr("x1", rankScale(rankMin))
    .attr("x2", rankScale(rankMax))
    .attr("y1", valueScale(eAverage))
    .attr("y2", valueScale(eAverage))
    .attr("opacity", 0.4)
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .style("stroke-dasharray", ("7, 7"))
    .style("stroke", omarColor)
    .style("stroke-width", 2);
  
  svgOmarD.append("line")
    .attr("x1", rankScale(rankMin))
    .attr("x2", rankScale(rankMax))
    .attr("y1", valueScale(dAverage))
    .attr("y2", valueScale(dAverage))
    .attr("opacity", 0.4)
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .style("stroke-dasharray", ("7, 7"))
    .style("stroke", omarColor)
    .style("stroke-width", 2); 
});

// Adding Alexa's 2018 Top 100 data
d3.json("datasets/alexa.json").then(function(data){
  let vSum = 0;
  let eSum = 0;
  let dSum = 0;

  data.forEach( (d,i) => {
    vSum = d.valence + vSum;
    eSum = d.energy + eSum;
    dSum = d.danceability + dSum;
    svgAlexaV.append("circle")
      .attr("cx", rankScale(i+1))
      .attr("cy", valueScale(d.valence))
      .attr("r", pointRadius)
      .attr("fill", alexaColor)
      .attr("opacity", pointOpacity)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")");

    svgAlexaE.append("circle")
      .attr("cx", rankScale(i+1))
      .attr("cy", valueScale(d.energy))
      .attr("r", pointRadius)
      .attr("fill", alexaColor)
      .attr("opacity", pointOpacity)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")");

    svgAlexaD.append("circle")
      .attr("cx", rankScale(i+1))
      .attr("cy", valueScale(d.danceability))
      .attr("r", pointRadius)
      .attr("fill", alexaColor)
      .attr("opacity", pointOpacity)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")");
  })
  let vAverage = vSum / 100;
  let eAverage = eSum / 100;
  let dAverage = dSum / 100;

  svgAlexaV.append("line")
    .attr("x1", rankScale(rankMin))
    .attr("x2", rankScale(rankMax))
    .attr("y1", valueScale(vAverage))
    .attr("y2", valueScale(vAverage))
    .attr("opacity", 0.4)
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .style("stroke-dasharray", ("7, 7"))
    .style("stroke", alexaColor)
    .style("stroke-width", 2);

  svgAlexaE.append("line")
    .attr("x1", rankScale(rankMin))
    .attr("x2", rankScale(rankMax))
    .attr("y1", valueScale(eAverage))
    .attr("y2", valueScale(eAverage))
    .attr("opacity", 0.4)
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .style("stroke-dasharray", ("7, 7"))
    .style("stroke", alexaColor)
    .style("stroke-width", 2);
  
  svgAlexaD.append("line")
    .attr("x1", rankScale(rankMin))
    .attr("x2", rankScale(rankMax))
    .attr("y1", valueScale(dAverage))
    .attr("y2", valueScale(dAverage))
    .attr("opacity", 0.4)
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .style("stroke-dasharray", ("7, 7"))
    .style("stroke", alexaColor)
    .style("stroke-width", 2);  

});

d3.json("datasets/sheetal.json").then(function(data){
  let vSum = 0;
  let eSum = 0;
  let dSum = 0;

  data.forEach( (d,i) => {
    vSum = d.valence + vSum;
    eSum = d.energy + eSum;
    dSum = d.danceability + dSum;
    svgSheetalV.append("circle")
      .attr("cx", rankScale(i+1))
      .attr("cy", valueScale(d.valence))
      .attr("r", pointRadius)
      .attr("fill", sheetalColor)
      .attr("opacity", pointOpacity)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")");

    svgSheetalE.append("circle")
      .attr("cx", rankScale(i+1))
      .attr("cy", valueScale(d.energy))
      .attr("r", pointRadius)
      .attr("fill", sheetalColor)
      .attr("opacity", pointOpacity)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")");

    svgSheetalD.append("circle")
      .attr("cx", rankScale(i+1))
      .attr("cy", valueScale(d.danceability))
      .attr("r", pointRadius)
      .attr("fill", sheetalColor)
      .attr("opacity", pointOpacity)
      .attr("transform","translate("+ (margin.left) +","+ margin.top +")");
  })
  let vAverage = vSum / 100;
  let eAverage = eSum / 100;
  let dAverage = dSum / 100;

  svgSheetalV.append("line")
    .attr("x1", rankScale(rankMin))
    .attr("x2", rankScale(rankMax))
    .attr("y1", valueScale(vAverage))
    .attr("y2", valueScale(vAverage))
    .attr("opacity", 0.4)
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .style("stroke-dasharray", ("7, 7"))
    .style("stroke", sheetalColor)
    .style("stroke-width", 2);

  svgSheetalE.append("line")
    .attr("x1", rankScale(rankMin))
    .attr("x2", rankScale(rankMax))
    .attr("y1", valueScale(eAverage))
    .attr("y2", valueScale(eAverage))
    .attr("opacity", 0.4)
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .style("stroke-dasharray", ("7, 7"))
    .style("stroke", sheetalColor)
    .style("stroke-width", 2);
  
  svgSheetalD.append("line")
    .attr("x1", rankScale(rankMin))
    .attr("x2", rankScale(rankMax))
    .attr("y1", valueScale(dAverage))
    .attr("y2", valueScale(dAverage))
    .attr("opacity", 0.4)
    .attr("transform","translate("+ (margin.left) +","+ margin.top +")")
    .style("stroke-dasharray", ("7, 7"))
    .style("stroke", sheetalColor)
    .style("stroke-width", 2);  

});

