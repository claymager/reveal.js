// Function for easy calling later
function make_heatmap(data){
  console.log(data);

  const svg = d3.select('svg');
  const width  = +svg.attr("width");
  const height = +svg.attr("height");

  const colHeight = 30;
  const colWidth  = 30;

  var color = d3.scaleSequential(d3.interpolateInferno).domain([0,0.3]);

  const names = svg.selectAll('g')
                  .data(data)
                  .enter();


  names.append('g')
       .append('text')
       .text((d) => d.usda)
       .attr('x', 0)
       .attr('y', (datum, index) => (index + 1) * colHeight);

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
       .attr('x', (d,col) => (col + 1.91)*colWidth)
       .attr('y', (d,col) => (d.row + 0.51)*colHeight)
       .attr('width', 0.98*colWidth)
       .attr('height', 0.98*colHeight)
       .attr('fill', (d) => color(d.weight))
       .attr("class", (d, i) => `cell cell-border cr${d.row} cc${i}`)
       .on('mouseover', function(d){
         d3.selectAll(`.cc${d.col}`).classed("cell-hover",(d_other) => d_other.weight > 0.05);
       })
       .on('mouseout', function(d){
         d3.select(this).classed('cell-hover', false);
         d3.selectAll(`.cc${d.col}`).classed("cell-hover",false);
       });


}

// This is what is called and actually makes the heatmap
d3.json("data/heatmap.json", (err, data) => make_heatmap(data));
