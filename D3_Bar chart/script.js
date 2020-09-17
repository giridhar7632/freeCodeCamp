const render = data => {
  var margin = {
    top: 50,
    right: 20,
    bottom: 50,
    left: 60
  }
  const width = 800
  const height = 400
  var dataset = data.data
  var n = dataset.length
  var barWidth = width/n
  var years = dataset.map(function(item) {
    var quarter;
    var temp = item[0].substring(5, 7);
    
    if(temp === '01') {
      quarter = 'Q1';
    }
    else if (temp === '04'){
      quarter = 'Q2';
    }
    else if(temp === '07') {
      quarter = 'Q3';
    }
    else if(temp ==='10') {
      quarter = 'Q4';
    }

    return item[0].substring(0, 4) + ' ' + quarter
  });
  
  var yearsDate = data.data.map(function(item) {
    return new Date(item[0]);
  });

  var xMax = new Date(d3.max(yearsDate));
  xMax.setMonth(xMax.getMonth() + 3);
  var xScale = d3.scaleTime()
    .domain([d3.min(yearsDate), xMax])
    .range([0, width]);
  
  const xAxis = d3.axisBottom().scale(xScale)

  var GDP = dataset.map(function(item) {
    return item[1]
  });
  
  var scaledGDP = [];
  
  var gdpMin = d3.min(GDP);
  var gdpMax = d3.max(GDP);
  
  var linearScale = d3.scaleLinear()
    .domain([0, gdpMax])
    .range([0, height]);
  
  scaledGDP = GDP.map(function(item) {
    return linearScale(item);
  });
  
  var yScale = d3.scaleLinear()
    .domain([0, gdpMax])
    .range([height, 0]);
  const yAxis = d3.axisLeft(yScale)

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
    .attr('x',-330)
    .attr('y',30)
    .style('font-family','sans-serif')
    .style('color', "#")
    .style('font-size',18+"px")
    .attr('transform','rotate(-90)')
    .text("Gross Domestic Product (in billions)")
  graph.append('text')
    .attr('x', width/2 + 60)
    .attr('y',height+40)
    .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
    .attr('class','more-info')
  var xAxisGroup = graph.append('g')
    .call(xAxis)
    .attr('id','x-axis')
    .attr('transform',`translate(0,${height})`)
  var yAxisGroup = graph.append('g')
    .call(yAxis)
    .attr('id','y-axis')

  d3.select('svg').selectAll('rect')
    .data(scaledGDP)
    .enter()
    .append('rect')
    .attr('data-date', function(d,i){
      return dataset[i][0]
    })
    .attr('data-gdp', function(d,i){
      return dataset[i][1]
    })
    .attr('class','bar')
    .attr('x',function(d,i){
      return xScale(yearsDate[i])
    })
    .attr('y',function(d,i){
      return height-d
    })
    .attr('width',barWidth)
    .attr('height',function(d){
      return d
    })
    .style('fill','#225c21')
    .style('transform', `translate(${margin.left}px,${margin.bottom}px)`)
    .on('mouseover',function(d,i){
      overlay.transition()
        .duration(0)
        .style({
          'height': d+"px",
          'width': barWidth+"px",
          'opacity': 0.9,
          'left': (i*barWidth)+0+"px",
          'top': height-d+"px",
          'transform': 'translateX(60px)'  
        })
      tooltip.transition()
        .duration(200)
        .style('opacity', 0.9)
      tooltip.html(`${years[i]}<br> $ ${GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} Billion`)
        .attr('data-date', dataset[i][0])
        .style({
          'left': (i*barWidth)+30+'px',
          'top': height-100+'px',
          'transform': 'translateX(60px)'
        })
      })
    .on('mouseout', function(d){
      tooltip.transition()
        .duration(200)
        .style('opacity', 0);
      overlay.transition()
        .duration(200)
        .style('opacity', 0);
    })
}
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(data => {
  //var dataset = data.data
  //var total = dataset.length
  render(data)
})
