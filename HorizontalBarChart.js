class HorizontalBarChart{
    
    constructor(_posX, _posY, _height, _width, _data, _bars, _barSpace, _ticks, _tickSize, _hGrid){

        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.bars = _bars;
        this.barSpace = _barSpace;
        this.tickSize = _tickSize
        this.ticks = _ticks;
        this.leftMargin = 10;
        this.rightMargin = 10;
        this.hGrid = _hGrid
        this.tickGap = this.height/this.ticks;
        this.rectWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.bars - 1)* this.barSpace))/this.bars;
        this.barSpacing = this.rectWidth+this.barSpace;
        this.highestValue = int(this.data.rows[0].obj.Mean);
    
        for (let i = 1; i < this.bars; i++) {
            let prop = "2022_Sales";
            let value = int(this.data.rows[i].obj.prop);
            if (value > this.highestValue) {
                this.highestValue = value;
            }
        }

        //Always spreads out the labels larger than the highest value to make the graph easily digestable - 1.4 is sufficient. 

        this.highestValue = this.highestValue*1.4;

        this.LabelGap = this.highestValue/this.ticks;
    }

    

    

    render(){
        push();
        translate(this.posX, this.posY);
        this.xAxisLabels();
        this.yAxis();
        this.xAxis();
        this.horBarChart();
        this.ticksCreation();
        this.labelling();
        this.xAxisGrid();
        this.yAxisGrid();
        this.yAxisLabels();
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
    line(0,0,0,-this.height);
    }
    yAxis(){
        noFill();
        strokeWeight(1);
        stroke(0);
        line(0,0,this.width,0);
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
    horBarChart(){
        
        for(let x = 0; x<this.bars; x++){
            
            let color;
            for(let x = 0; x<this.bars; x++){
                color = colors3[x];
            

            //Code below removes used colors from the array in order to prevent repeating colors.
            // let index = colors2.indexOf(color);
            // if (index > -1) { // only splice array when item is found
            //     colors2.splice(index, 1); // 2nd parameter means remove one item only
            //   }
            push();
            rotate(-270);
            translate(this.leftMargin + (x*this.barSpacing), 0);
            translate(-400, 0);
            fill(color);
            let prop = "2022_Sales"
            rect(0, 0,this.rectWidth,this.barScaler(int(-this.data.rows[x].obj[prop])));
            pop();
            }

        }
    }
    
    ticksCreation(){
        for(let x = 0; x <= this.ticks ;x++){
            strokeWeight(1);
            push();
            translate(0, 400);
            line(x*this.tickGap, -this.height, x*this.tickGap, -this.height-this.tickSize);
            pop();
        }
        
    }


    labelling(){
        for(let x = 0; x <= this.ticks ;x++){
            noStroke();
            fill(1);
            textAlign(CENTER, CENTER);
            push();
            translate(0, 420);
            textSize(10);
            textStyle(BOLD);
            text(int(x*this.LabelGap), x*this.tickGap, -this.height-this.tickSize);
            pop();
        }
        
    }

    


 


    xAxisLabels(){
        for(let x = 0; x<this.bars; x++){
            push();
            translate(this.barSpacing + (x*this.barSpacing),0);
            fill(1);
            textSize(10);
            textStyle(BOLD);
            textAlign(LEFT);
            text(this.data.rows[x].obj.Month, -35, 20);
            pop();
        }
    }

    yAxisLabels(){
        
            for(let x = 0; x<this.bars; x++){
                push();
                translate(-15,this.barSpacing + (x*this.barSpacing)-432);
                fill(2);
                textSize(10);
                textStyle(BOLD);
                textAlign(LEFT);
                text(this.data.rows[x].obj.Make, -29, 20);
                pop();
            }
        
    }

}