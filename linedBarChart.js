class linedBarChart{

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
        
        

        this.highestValue = int(this.data.rows[0].obj.Total);
    
        for (let i = 1; i < this.bars; i++) {
            let value = int(this.data.rows[i].obj.Total);
            if (value > this.highestValue) {
                this.highestValue = value;
            }
        }
        this.highestValue = this.highestValue*1.2;

        this.LabelGap = this.highestValue/this.markers;
        
        
    }

    render(){
    
        push();
        translate(this.posX, this.posY);
        this.xAxisLabels();
        this.yAxis();
        this.xAxis();
        this.linedBarChart();
        this.chartMarkers();
        this.chartLabels();
        this.xAxisGrid();
        this.yAxisGrid();
        this.rectangleLabels();
        this.drawMeanDots();
        this.connectMeanDots();
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
    linedBarChart(){
        

        for(let x = 0; x<this.bars; x++){
            let color = 0;
    
        for(let x = 0; x<this.bars; x++){
            color = colors3[x];
        
        
        //Code below removes used colors from the array in order to prevent repeating colors.

        // let index = colors2.indexOf(color);
        // if (index > -1) { // only splice array when item is found
        //     colors2.splice(index, 1); // 2nd parameter means remove one item only
        //   }
        push();
       
        translate(this.leftMargin + (x*this.barSpacing), 0);
   
        fill(color);
        let prop = "Total";
        
        rect(0, 0,this.rectWidth,this.barScaler(int(-this.data.rows[x].obj[prop])));
        pop();
        }
    }

    }
    
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            strokeWeight(1);
            line(this.markerSize+2, x*-this.markerGap, 0, x*-this.markerGap);
            
        }
    }


    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            noStroke();
            fill(1);
            textAlign(LEFT, CENTER);
            textStyle(BOLD);
            text(int(x*this.LabelGap), -60, x*-this.markerGap);
        }
    }

    


    //Methods to put labels above the bars and also on the X axis
    rectangleLabels(){
        
            
    }


    xAxisLabels(){
        for(let x = 0; x<this.bars; x++){
            push();
            translate(this.barSpacing + (x*this.barSpacing),0);
            fill(2);
            textSize(8);
            textAlign(LEFT);
            textStyle(BOLD);
            text(this.data.rows[x].obj.Make, -22, 20);
            pop();
        }
    }

    drawMeanDots(){
        let dotRadius = 4;
        noStroke();
        for(let x = 0; x<this.bars; x++){
            let color = 0;
            let index = colors2.indexOf(color);
            if (index > -1) { // only splice array when item is found
                colors2.splice(index, 1); // 2nd parameter means remove one item only
            }
            let mean = this.data.rows[x].obj.Mean;
            let scaledMean = this.barScaler(int(-mean));
            let barHeight = this.barScaler(int(-this.data.rows[x].obj.Total));
            let y = -this.height + scaledMean+400;
            push();
            translate(this.leftMargin + (x*this.barSpacing), 0);
            fill(color);
            ellipse(this.rectWidth/2, y, dotRadius*2, dotRadius*2);
            pop();
        }
    }

    connectMeanDots(){
        let dotRadius = 4;
        stroke(0);
        strokeWeight(1);
        noFill();
        beginShape();
        for(let x = 0; x<this.bars; x++){
            let color = random(colors2);
            let index = colors2.indexOf(color);
            if (index > -1) { // only splice array when item is found
                colors2.splice(index, 1); // 2nd parameter means remove one item only
            }
            let mean = this.data.rows[x].obj.Mean;
            let scaledMean = this.barScaler(int(-mean));
            let barHeight = this.barScaler(int(-this.data.rows[x].obj.Total));
            let y = -this.height + scaledMean+400;
            vertex(this.leftMargin + (x*this.barSpacing) + this.rectWidth/2, y);
        }
        endShape();
    }
    
    


}