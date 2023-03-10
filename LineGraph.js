// Define a class for a LineGraph with a constructor that takes in several arguments to set up the graph
class LineGraph {

  // Constructor for the LineGraph class
  constructor(_posX, _posY, _height, _width, _data, _bars, _barSpace, _ticks, _tickSize, _hGrid, _xAxisLabel, _yAxisLabel) {

    this.xAxisLabel = _xAxisLabel; // x-axis label
    this.yAxisLabel = _yAxisLabel; // y-axis label
    
    // Set the height and width of the graph
    this.height = _height;
    this.width = _width;
    
    // Set the x and y positions of the graph
    this.posX = _posX;
    this.posY = _posY;
    
    // Set the data to be plotted on the graph, the number of bars, the space between bars, the number of ticks,
    // the size of the ticks, and the number of horizontal grid lines
    this.data = _data;
    this.bars = _bars;
    this.barSpace = _barSpace;
    this.ticks = _ticks;
    this.tickSize = _tickSize;
    
    this.hGrid = _hGrid;
    
    // Set some additional properties of the graph, such as the left and right margins
    this.leftMargin = 10;
    this.rightMargin = 10;
    
    // Calculate the gap between ticks and the width of each bar on the graph
    this.tickGap = this.height / this.ticks;
    this.rectWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.bars - 1) * this.barSpace)) / this.bars;
    this.barSpacing = this.rectWidth + this.barSpace;
    
    // Calculate the highest value in the data set
    this.highestValue = int(this.data.rows[0].obj.Mean);
    for (let i = 1; i < this.bars; i++) {
      let value = int(this.data.rows[i].obj.Mean);
      if (value > this.highestValue) {
        this.highestValue = value;
      }
    }
    
    // Set the highest value to be displayed on the graph as 120% of the actual highest value
    this.highestValue = this.highestValue * 1.2;
    
    // Calculate the gap between labels on the y-axis of the graph
    this.LabelGap = this.highestValue / this.ticks;
  }

  // Render the LineGraph on the canvas
  render() {
    
    // Save the current transformation matrix
    push();
    
    // Translate to the position of the graph on the canvas
    translate(this.posX, this.posY);
    
    // Draw the x-axis label
    this.drawXAxisLabel();

    // Draw the y-axis label
    this.drawYAxisLabel();

    // Call various methods to draw the different parts of the graph
    this.xAxisLabels();
    this.yAxis();
    this.xAxis();
    this.xAxisGrid();
    this.yAxisGrid();
    this.lineGraph();
    this.tickCreation();
    this.labelling();
    
    // Restore the previous transformation matrix
    pop();
  }

  // Method to scale the bars of the graph based on a scaling factor
  barScaler(_scalingNum) {
    for (let x = 0; x < this.bars; x++) {
      let scaleValue = this.height / this.highestValue;
      return _scalingNum * scaleValue;
    }
  }

  // Method to draw the x-axis of the graph
  xAxis() {
    noFill();
    strokeWeight(1);
    stroke(0);
    line(0, 0, this.width, 0);
  }

  // Method to draw the y-axis of the graph
  yAxis(){
      noFill();
      strokeWeight(1);
      stroke(0);
      line(0,0,0,-this.height);
  }



  // method to draw the x-axis grid lines
  xAxisGrid(){
      for(let x = 0; x <= this.ticks ;x++){
          stroke(50, 30);
          strokeWeight(1);
          line(this.tickSize, x*-this.tickGap, this.width, x*-this.tickGap)
      }   
  }
    
  // method to draw the y-axis grid lines
  yAxisGrid(){
      for(let x = 0; x <= this.numHgrid ;x++){
          stroke(50, 30);
          strokeWeight(1);
          line(x*this.width/this.numHgrid, -this.height, x*this.width/this.numHgrid, 0)
      }
  }
  
  lineGraph() {
    noFill();
    strokeWeight(2);
    let color = 0;
    stroke(color);
    for (let x = 0; x < this.bars; x++) {
      let prop = "Mean";
      let xPos = this.leftMargin + (x * this.barSpacing) + (this.rectWidth / 2);
      let yPos = -this.barScaler(int(this.data.rows[x].obj[prop]));
      
      // add a black dot at each data point
      noFill();
      stroke(0);
      ellipse(xPos, yPos, 5, 5);
  
      // connect the data points with a line
      if (x === 0) {
        beginShape();
        vertex(xPos, yPos);
      } else {
        vertex(xPos, yPos);
        if (x === this.bars - 1) {
          endShape();
        }
      }
    }
  }
    
  tickCreation(){
      for(let x = 0; x <= this.ticks ;x++){
          strokeWeight(1);
          line(this.tickSize+2, x*-this.tickGap, 0, x*-this.tickGap);
          
      }
  }
    
    
    labelling() {
      noStroke();
      fill(1);
      textAlign(RIGHT, CENTER);
      textStyle(BOLD);
      for(let x = 0; x <= this.ticks; x++) {
        let yPos = x * -this.tickGap;
        text(int(x * this.LabelGap), -this.tickSize - 10, yPos);
      }
    }

  xAxisLabels(){
      for(let x = 0; x<this.bars; x++){
          push();
          translate(this.barSpacing + (x*this.barSpacing),0);
          fill(2);
          textSize(8);
          textStyle(BOLD);
          textAlign(LEFT);
          text(this.data.rows[x].obj.Make, -22, 20);
          pop();
      }
  }
  drawXAxisLabel(){
    textAlign(CENTER);
    textSize(12);
    textStyle(BOLD);
    text(this.xAxisLabel, this.width/2, 50);
  }

  drawYAxisLabel(){
      textAlign(CENTER);
      textSize(12);
      push();
      translate(-65, -this.height/2);
      rotate(-90);
      textStyle(BOLD);
      text(this.yAxisLabel, 0, 0);
      pop();
  }
    


}