// Function for easy calling later
function make_heatmap(data){
  console.log(data);

  const svg = d3.select('svg');
  const width  = +svg.attr("width");
  const height = +svg.attr("height");

  const colHeight = 25;
  const colWidth  = 25;

  var color = d3.scaleSequential(d3.interpolateInferno).domain([0,0.3]);
  var colLabel=['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21']

  const names = svg.selectAll('g')
                  .data(data)
                  .enter();


  names.append('g')
       .append('text')
       .text((d) => d.usda)
       .attr('class', function(d,i) { return "rowLabel r"+i+" text-native";})
       .attr('x', 255)
       .attr('text-anchor','end')
       .attr('y', (datum, index) => (index + 1) * colHeight + 6);


  names.selectAll('rect')
       .data((d,j) => d.cluster.map((weight, i) => {
         return {
           weight,
           row: j,
           col: i
         }
       }))
       .enter()
       .append('rect')
       .attr('x', (d,col) => (col + 1.91)*colWidth + 210)
       .attr('y', (d,col) => (d.row + 0.51)*colHeight)
       .attr('width', 0.98*colWidth)
       .attr('height', 0.98*colHeight)
       .attr('fill', (d) => color(d.weight))
       .attr("class", (d, i) => `cell cell-border cr${d.row} cc${i}`)
       .on('mouseover', function(d){
        d3.selectAll(`.cc${d.col}`).classed("cell-hover",(d_other) => d_other.weight > 0.05);
         d3.selectAll(".rowLabel").classed("text-highlight",function(r,ri){ 
           return d3.selectAll(`.cr${ri}.cell-hover`).size();});
         d3.selectAll(".rowLabel").classed("text-native", false);
       })
       .on('mouseout', function(d){
         d3.select(this).classed('cell-hover', false);
         d3.selectAll(`.cc${d.col}`).classed("cell-hover",false);
         d3.selectAll(".rowLabel").classed("text-highlight",false);
       });
  
  var colLabels = svg.append("g")
      .selectAll(".colLabelg")
      .data(colLabel)
      .enter()
      .append("text")
      .text(function (d) { return d; })
      .attr("y", 40*colHeight)
      .attr("x", function (d, col) { 
        console.log(d); 
        return d * colWidth });

}

// This is what is called and actually makes the heatmap
d3.json("data/heatmap.json", (err, data) => make_heatmap(data));
