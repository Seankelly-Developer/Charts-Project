// Define a class for a LineGraph with a constructor that takes in several arguments to set up the graph
class LineGraph {

    // Constructor for the LineGraph class
    constructor(_posX, _posY, _height, _width, _data, _bars, _barSpace, _markers, _markerSize, _hGrid) {
      
      // Set the height and width of the graph
      this.height = _height;
      this.width = _width;
      
      // Set the x and y positions of the graph
      this.posX = _posX;
      this.posY = _posY;
      
      // Set the data to be plotted on the graph, the number of bars, the space between bars, the number of markers,
      // the size of the markers, and the number of horizontal grid lines
      this.data = _data;
      this.bars = _bars;
      this.barSpace = _barSpace;
      this.markerSize = _markerSize;
      this.markers = _markers;
      this.hGrid = _hGrid;
      
      // Set some additional properties of the graph, such as the left and right margins
      this.leftMargin = 10;
      this.rightMargin = 10;
      
      // Calculate the gap between markers and the width of each bar on the graph
      this.markerGap = this.height / this.markers;
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
      this.LabelGap = this.highestValue / this.markers;
    }
  
    // Render the LineGraph on the canvas
    render() {
      
      // Save the current transformation matrix
      push();
      
      // Translate to the position of the graph on the canvas
      translate(this.posX, this.posY);
      
      // Call various methods to draw the different parts of the graph
      this.xAxisLabels();
      this.yAxis();
      this.xAxis();
      this.xAxisGrid();
      this.yAxisGrid();
      this.lineGraph();
      this.chartMarkers();
      this.chartLabels();
      
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
        beginShape();
        for(let x = 0; x < this.bars; x++) {
          let prop = "Mean";
          let xPos = this.leftMargin + (x * this.barSpacing) + (this.rectWidth / 2);
          let yPos = -this.barScaler(int(this.data.rows[x].obj[prop]));
          vertex(xPos, yPos);
        }
        endShape();
      }
      
    
      chartMarkers() {
        noStroke();
        fill(150, 5);
        for(let x = 0; x <= this.markers; x++) {
          let yPos = x * -this.markerGap;
          ellipse(this.markerSize + 2, yPos, 5, 5);
        }
      }
      
      chartLabels() {
        noStroke();
        fill(1);
        textAlign(RIGHT, CENTER);
        textStyle(BOLD);
        for(let x = 0; x <= this.markers; x++) {
          let yPos = x * -this.markerGap;
          text(int(x * this.LabelGap), -this.markerSize - 10, yPos);
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
      


}