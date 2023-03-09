class HorizontalStackedChart{

    constructor(_posX, _posY, _height, _width, _data, _bars, _barGap, _markers, _markerSize, _hGrid){

        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.bars = _bars;
        this.barGap = _barGap;
        this.markerSize = _markerSize
        this.markers = _markers;
        this.leftMargin = 10;
        this.rightMargin = 10;
        this.hGrid = _hGrid
        this.markerGap = this.height/this.markers;
        this.barWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.bars - 1)* this.barGap))/this.bars;
        this.barSpacing = this.barWidth+this.barGap;
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

    // executes the functions
    render(){
        push();
        translate(this.posX, this.posY);
        this.yAxis();
        this.xAxis();
        this.horStackedChart();
        this.chartMarkers();
        this.chartLabels();
        this.xAxisGrid();
        this.yAxisGrid();
        this.xAxisLabels();
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
    horStackedChart(){

        for(let x = 0; x < this.bars; x++){
            
            push();
           
            
            let barPos;
            translate(0, this.leftMargin + (x*this.barSpacing)-20 );
            push();
            
            for(let y = 0; y<userSelect.length;y++){
                let chosenColor = y % colors.length;
                fill(colors[chosenColor]);
                let prop = userSelect[y];
                let height = -this.barScaler(int(-this.data.rows[x].obj[prop]));
                rect(0, -360, height, -this.barWidth);
                barPos = (0,0,this.barWidth,height);
                translate(height, 0);

                        
            }
            pop();
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

    // barLabels(){
    //     let labelSpacing = 10;
    //     let labelBar = 400/this.bars;
    //     textSize(10);
    //     noStroke();
    //     fill(1);
    //         for(let x=0; x<this.bars; x++){
    //             text(this.data.rows[x].obj.total, (x*labelBar)+this.barWidth/2, this.barScaler(this.data.rows[x].obj.total)-labelSpacing);
    //         }

    // }


}