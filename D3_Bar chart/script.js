const render = data => {
  var margin = {
    top: 50,
    right: 20,
    bottom: 50,
    left: 100
  }
  const width = 960
  const height = 500
  var dataset = data.data
  var n = dataset.length
  var xMin = dataset[0][0].substr(0,4)
      xMin = new Date(xMin)
  var xMax = dataset[n-1][0].substr(0,4)
      xMax = new Date(xMax)
  const barWidth = (width-10)/n

  const xScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([0, width])
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d){
      return d[1]
    })])
    .range([height,0])
  
  const xAxis = d3.svg.axis().scale(xScale).orient("bottom")
  const yAxis = d3.svg.axis().scale(yScale).orient("left")

  var tooltip = d3.select(".chartHolder").append('div')
    .attr("id", "tootltip")
    .style("opacity",0)
  var overlay = d3.select(".chartHolder").append("div")
    .attr('class','overlay')
    .style('opacity',0)
  var graph = d3.select('.chartHolder').append('svg')
    .attr('width',width+margin.left+margin.right)
    .attr('height',height+margin.top+margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
  
  graph.append('text')
    .attr('x',-200)
    .attr('y',90)
    .attr('transform','rotate(-90)')
    .text("Gross Domestic Product")
  graph.append('text')
    .attr('x', width/2 + 120)
    .attr('y',height+50)
    .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
    .attr('class','more-info')
  var xAxisGroup = graph.append('g')
    .call(xAxis)
    .attr('id','x-axis')
    .attr('transform',`translate(0,${height})`)
  var yAxisGroup = graph.append('g')
  
}
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(data => {
  //var dataset = data.data
  //var total = dataset.length
  render(data)
})
