const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(error, data){
  console.log(data)
})
