class LineGraph{

    constructor(_posX, _posY, _height, _width, _data, _bars, _barSpace, _markers, _markerSize, _hGrid){
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.bars = _bars;
        this.barSpace = _barSpace;
        this.markerSize = _markerSize
        this.markers = _markers;
        this.leftMargin = 10;
        this.rightMargin = 10;
        this.hGrid = _hGrid
        this.markerGap = this.height/this.markers;
        this.rectWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.bars - 1)* this.barSpace))/this.bars;
        this.barSpacing = this.rectWidth+this.barSpace;
        this.highestValue = int(this.data.rows[0].obj.Mean);
    
        for (let i = 1; i < this.bars; i++) {
            let value = int(this.data.rows[i].obj.Mean);
            if (value > this.highestValue) {
                this.highestValue = value;
            }
        }
        this.highestValue = this.highestValue*1.2;
        console.log(this.highestValue); 
        this.LabelGap = this.highestValue/this.markers;
        
    }

    render(){
    
        push();
        translate(this.posX, this.posY);
        this.xAxisLabels();
        this.yAxis();
        this.xAxis();
        this.lineGraph();
        this.chartMarkers();
        this.chartLabels();
        this.xAxisGrid();
        this.yAxisGrid();
        pop();
    }

    //This method ensures the graph is to scale - based on the number of bars
    barScaler(_scalingNum){
        for(let x = 0; x < this.bars; x++){
            let scaleValue = this.height/this.highestValue;
        return _scalingNum*scaleValue;
        }
    }


    //Methods to draw the two axis
    xAxis(){
        noFill();
        strokeWeight(1);
        stroke(0);
        line(0,0,this.width,0);
    }
    yAxis(){
        noFill();
        strokeWeight(1);
        stroke(0);
        line(0,0,0,-this.height);
    }


    //Methods to draw the markers on the two axis
    xAxisGrid(){
        for(let x = 0; x <= this.markers ;x++){
            stroke(150, 5);
            strokeWeight(2);
            line(this.markerSize, x*-this.markerGap, this.width, x*-this.markerGap)
        }
        
    }
    yAxisGrid(){
        for(let x = 0; x <= this.numHgrid ;x++){
            stroke(150, 5);
            strokeWeight(2);
            line(x*this.width/this.numHgrid, -this.height, x*this.width/this.numHgrid, 0)
        }
    }

    //Draw the bar chart
    // barChart(){
        

    //     for(let x = 0; x<this.bars; x++){
            
    //     let color = 0;
        
    //     //Code below removes used colors from the array in order to prevent repeating colors.

    //     // let index = colors2.indexOf(color);
    //     // if (index > -1) { // only splice array when item is found
    //     //     colors2.splice(index, 1); // 2nd parameter means remove one item only
    //     //   }
    //     push();
       
    //     translate(this.leftMargin + (x*this.barSpacing), 0);
   
    //     fill(color);
    //     let prop = "Mean";
        
    //     rect(0, 0,this.rectWidth,this.barScaler(int(-this.data.rows[x].obj[prop])));
    //     pop();
    //     }
        

    // }
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