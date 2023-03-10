// Class for creating a bar chart in p5.js
class barChart{

    // Constructor function that initializes the properties of the bar chart
    constructor(_posX, _posY, _height, _width, _data, _bars, _barSpace, _ticks, _tickSize, _hGrid){
        this.height = _height; // Height of the chart
        this.width = _width; // Width of the chart
        this.posX = _posX; // x-coordinate of the chart's position
        this.posY = _posY; // y-coordinate of the chart's position
        this.data = _data; // Data for the chart
        this.bars = _bars; // Number of bars in the chart
        this.barSpace = _barSpace; // Space between the bars
        this.tickSize = _tickSize; // Size of the ticks on the y-axis
        this.ticks = _ticks; // Number of ticks on the y-axis
        this.leftMargin = 10; // Margin on the left side of the chart
        this.rightMargin = 10; // Margin on the right side of the chart
        this.hGrid = _hGrid // Number of horizontal grid lines
        this.tickGap = this.height/this.ticks; // Gap between ticks on the y-axis
        this.rectWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.bars - 1)* this.barSpace))/this.bars; // Width of each bar
        this.barSpacing = this.rectWidth+this.barSpace; // Space between each bar
        this.highestValue = int(this.data.rows[0].obj.Mean); // Highest value in the data set

        // Loop through the data set to find the highest value
        for (let i = 1; i < this.bars; i++) {
            let value = int(this.data.rows[i].obj.Mean);
            if (value > this.highestValue) {
                this.highestValue = value;
            }
        }

        // Scale the highest value by 1.2 to make sure the bars fit within the chart
        this.highestValue = this.highestValue*1.2;

        // Gap between the labels on the y-axis
        this.LabelGap = this.highestValue/this.ticks;
    }

    // Method to render the chart
    render(){
        push();
        translate(this.posX, this.posY);

        // Draw the x-axis labels
        this.xAxisLabels();

        // Draw the y-axis
        this.yAxis();

        // Draw the x-axis
        this.xAxis();

        // Draw the bars
        this.barChart();

        // Draw the ticks on the y-axis
        this.ticksCreation();

        // Draw the labels on the chart
        this.chartLabels();

        // Draw the horizontal grid lines
        this.xAxisGrid();

        // Draw the vertical grid lines
        this.yAxisGrid();

        pop();
    }

    // Method to scale the bars based on a scaling factor
    barScaler(_scalingNum){
        for(let x = 0; x < this.bars; x++){
            let scaleValue = this.height/this.highestValue;
        return _scalingNum*scaleValue;
        }
    }

    // Method to draw the x-axis
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
    barChart(){
        

        for(let x = 0; x<this.bars; x++){
            
        let color = random(colors2);
        
        //Code below removes used colors from the array in order to prevent repeating colors.

        let index = colors2.indexOf(color);
        if (index > -1) { // only splice array when item is found
            colors2.splice(index, 1); // 2nd parameter means remove one item only
          }
        push();
       
        translate(this.leftMargin + (x*this.barSpacing), 0);
   
        fill(color);
        let prop = "Mean";
        
        rect(0, 0,this.rectWidth,this.barScaler(int(-this.data.rows[x].obj[prop])));
        pop();
        }
        

    }
    
    ticksCreation(){
        for(let x = 0; x <= this.ticks ;x++){
            strokeWeight(1);
            line(this.tickSize+2, x*-this.tickGap, 0, x*-this.tickGap);
            
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