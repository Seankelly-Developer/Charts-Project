let barChart;

function setup() {
  createCanvas(400, 400);
  barChart = new BarChart(50, 50, 300, 300, 'data/master.csv', 1, 'X Label', 'Y Label', 'Title', ['#ff0000', '#00ff00', '#0000ff']);
}

function draw() {
  background(255);
  barChart.draw();
}
