class barChart{

    constructor(_posX, _posY, _height, _width, _data, _bars, _barSpace, _ticks, _tickSize, _hGrid){
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.bars = _bars;
        this.barSpace = _barSpace;
        this.tickSize = _tickSize;
        this.ticks = _ticks;
        this.leftMargin = 10;
        this.rightMargin = 10;
        this.hGrid = _hGrid
        this.tickGap = this.height/this.ticks;
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
        this.LabelGap = this.highestValue/this.ticks;
        
    }

    render(){
    
        push();
        translate(this.posX, this.posY);
        this.xAxisLabels();
        this.yAxis();
        this.xAxis();
        this.barChart();
        this.ticksCreation();
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


    //Methods to draw the ticks on the two axis
    xAxisGrid(){
        for(let x = 0; x <= this.ticks ;x++){
            stroke(150, 5);
            strokeWeight(2);
            line(this.tickSize, x*-this.tickGap, this.width, x*-this.tickGap)
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