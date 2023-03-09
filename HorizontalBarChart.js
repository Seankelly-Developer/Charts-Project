class HorizontalBarChart{
    
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
            let prop = "2022_Sales";
            let value = int(this.data.rows[i].obj.prop);
            if (value > this.highestValue) {
                this.highestValue = value;
            }
        }
        this.highestValue = this.highestValue*1.4;
        console.log(this.highestValue);
        this.LabelGap = this.highestValue/this.markers;
    }

    

    render(){
        push();
        translate(this.posX, this.posY);
        this.xAxisLabels();
        this.yAxis();
        this.xAxis();
        this.horBarChart();
        this.chartMarkers();
        this.chartLabels();
        this.xAxisGrid();
        this.yAxisGrid();
        this.yAxisLabels();
        this.rectangleLabels();
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


    //Methods to draw the markers on the two axis
    xAxisGrid(){
        for(let x = 0; x <= this.markers ;x++){
            stroke(150, 5);
            strokeWeight(2);
            line(x*this.markerGap, 0, x*this.markerGap, -this.height)
        }
        
    }
    yAxisGrid(){
        for(let x = 0; x <= this.numHgrid ;x++){
            stroke(150, 5);
            strokeWeight(2);
            line(0, -x*this.height/this.numHgrid, this.width, -x*this.height/this.numHgrid)
        }
    }

    //Draw the bar chart
    horBarChart(){
        
        for(let x = 0; x<this.bars; x++){
            
            let color = random(colors2);
            //Code below removes used colors from the array in order to prevent repeating colors.
            let index = colors2.indexOf(color);
            if (index > -1) { // only splice array when item is found
                colors2.splice(index, 1); // 2nd parameter means remove one item only
              }
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
    
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            strokeWeight(1);
            push();
            translate(0, 400);
            line(x*this.markerGap, -this.height, x*this.markerGap, -this.height-this.markerSize);
            pop();
        }
        
    }


    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            noStroke();
            fill(1);
            textAlign(CENTER, CENTER);
            push();
            translate(0, 420);
            textSize(10);
            text(int(x*this.LabelGap), x*this.markerGap, -this.height-this.markerSize);
            pop();
        }
        
    }

    


    //Methods to put labels above the bars and also on the X axis
    rectangleLabels(){
        
            
    }


    xAxisLabels(){
        for(let x = 0; x<this.bars; x++){
            push();
            translate(this.barSpacing + (x*this.barSpacing),0);
            fill(1);
            textSize(10);
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
                textAlign(LEFT);
                text(this.data.rows[x].obj.Make, -29, 20);
                pop();
            }
        
    }

}