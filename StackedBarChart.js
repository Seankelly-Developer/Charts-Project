

class StackedBarChart{

    constructor(_posX, _posY, _height, _width, _data, _bars, _barGap, _ticks, _tickSize, _hGrid){
        // constructor method that initializes the StackedBarChart object with the given parameters

        // initialize properties with constructor parameters
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.bars = _bars;
        this.barGap = _barGap;
        this.tickSize = _tickSize
        this.ticks = _ticks;
        this.leftMargin = 10;
        this.rightMargin = 10;  
        this.hGrid = _hGrid;

        // calculate properties based on constructor parameters
        this.tickGap = this.height/this.ticks;
        this.barWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.bars - 1)* this.barGap))/this.bars;
        this.barSpacing = this.barWidth+this.barGap;
        this.highestValue = int(this.data.rows[0].obj.Total);
        
        // find the highest value in the data
        for (let i = 1; i < this.bars; i++) {
            let value = int(this.data.rows[i].obj.Total);
            if (value > this.highestValue) {
                this.highestValue = value;
            }
        }
        // set highest value to be 20% higher than the actual highest value for scale purposes
        this.highestValue = this.highestValue*1.2;

        // calculate tick label gaps based on highest value and number of ticks
        this.LabelGap = this.highestValue/this.ticks;
    }

    // execute all required methods to render the StackedBarChart object
    render(){
        push();
        translate(this.posX, this.posY);
        this.yAxis();
        this.xAxis();
        this.StackedBarChart();
        this.tickCreation();
        this.chartLabels();
        this.xAxisGrid();
        this.yAxisGrid();
        this.xAxisLabels();
        this.drawMeanDots();
        this.connectMeanDots();
        pop();
    }

    // scale the given number based on the height and highest value of the StackedBarChart object
    barScaler(_scalingNum){
        let scaleValue = this.height/this.highestValue;
        return _scalingNum*scaleValue;
    }

    // method to draw the x-axis line
    xAxis(){
        noFill();
        strokeWeight(1);
        stroke(0);
        line(0,0,this.width,0);
    }

    // method to draw the y-axis line
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

    //Draw the bar chart
    StackedBarChart(){

        for(let x = 0; x < this.bars; x++){
            
            let barPos;
            push();
            translate(this.leftMargin + (x*this.barSpacing), 0);
            // rotate(-270);
            // translate(-390, 0);
            for(let y = 0; y<userSelect.length;y++){
                let chosenColor = y % colors.length;
                fill(colors[chosenColor]);
                let prop = userSelect[y];
                let height = this.barScaler(int(-this.data.rows[x].obj[prop]));
                rect(0, 0,this.barWidth,height);
                barPos = (0,0,this.barWidth,height);
                translate(0,height);
                
            }
            
            pop();
        }
        
       
        
    }
    
    tickCreation(){
        for(let x = 0; x <= this.ticks ;x++){
            strokeWeight(1);
            line(this.tickSize+2, x*-this.tickGap, 0, x*-this.tickGap);
            
        }
    }

    xAxisLabels(){
        for(let x = 0; x<this.bars; x++){
            push();
            translate(this.barSpacing + (x*this.barSpacing),0);
            fill(1);
            textAlign(LEFT);
            textSize(8);
            textStyle(BOLD);
            text(this.data.rows[x].obj.Make, -22, 20);
            pop();
        }
    }

    chartLabels(){
        for(let x = 0; x <= this.ticks ;x++){
            noStroke();
            fill(1);
            textAlign(LEFT, CENTER);
            textStyle(BOLD);
            text(int(x*this.LabelGap), -45, x*-this.tickGap);
        }
    }

    // draw black dots for mean values
drawMeanDots() {
    push();
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < this.bars; i++) {
      let x = this.leftMargin + this.barSpacing * i + this.barWidth / 2;
      let y = -this.barScaler(this.data.rows[i].obj.Mean);
      ellipse(x, y, 4);
    }
    pop();
  }
  
  // connect black dots for mean values
  connectMeanDots() {
    push();
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < this.bars; i++) {
      let x = this.leftMargin + this.barSpacing * i + this.barWidth / 2;
      let y = -this.barScaler(this.data.rows[i].obj.Mean);
      vertex(x, y);
    }
    endShape();
    pop();
  }
  
    

}