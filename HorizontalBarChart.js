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
        for(let x=0; x<this.bars-1; x++){

            //Getting the total value from the csv
            if(this.highestValue = int(this.data.rows[x].obj.Mean)>this.highestValue){
                this.highestValue = int(this.data.rows[x].obj.Mean);
            }
        }
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
            let prop = "Mean";
            // rotate(-270);
            // translate(-120, 100)
            rect(0, 0,this.rectWidth,this.barScaler(int(-this.data.rows[x].obj[prop])));
           
            pop();
            }
            textSize(12);
            textAlign(CENTER, BOTTOM);
            text('Average Sales', this.width/2, 50);
    
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
            text(int(x*this.LabelGap).toFixed(2), -50, x*-this.markerGap);
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


}