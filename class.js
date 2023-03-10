let data;
let userSelect = ["2022_Sales", "2021_Sales", "2020_Sales"];
let colors = ["	#ffa700", "	#d600ff", "#7e00b6"
];
let backgroundColor = ["#EAEAEA"];


  const colors3 = ["	#ffa700", "	#d600ff", "#7e00b6","	#ffa700", "	#d600ff", "#7e00b6","	#ffa700", "	#d600ff", "#7e00b6","	#ffa700", "	#d600ff", "#7e00b6","	#ffa700", "	#d600ff", "#7e00b6", "	#ffa700", "	#d600ff", "#7e00b6","	#ffa700", "	#d600ff", "#7e00b6","	#ffa700", "	#d600ff", "#7e00b6"];


//Arrays to store instantiated graph objects
let graphs=[];

function preload(){
    data = loadTable('data/master.csv', 'csv', 'header');
    drawLegend(userSelect, colors, 800, 300, 10, 16);
}
async function setup(){
    
    createCanvas(1300,1700);
    background(backgroundColor);
    angleMode(DEGREES);
    rectMode(CORNER);

     //Bar Chart
     graphs.push(new barChart(100, 500, 400, 400, data, data.getRowCount(), 10, 10, -5, 5, "Label Example", "Label Example"));

     //Stacked Chart
     graphs.push(new StackedBarChart(700, 500, 400, 400, data, data.getRowCount(), 10, 10, -5, 5));

     //Lined Bar Chart
     graphs.push(new linedBarChart(100, 1050, 400, 400, data, data.getRowCount(), 10, 10, -5, 5, "Lined Bar Chart"));

     //Horizontal Bar Chart
     graphs.push(new HorizontalBarChart(700, 1050, 400, 400, data, data.getRowCount(), 10, 10, -5, 5));

     //Horizontal Stacked Chart
     graphs.push(new HorizontalStackedChart(700, 1600, 400, 400, data, data.getRowCount(), 10, 10, -5, 5));

     graphs.push(new LineGraph(100, 1600, 400, 400, data, data.getRowCount(), 10, 10, -5, 5, "LinenGraph"));

     
}



function draw(){
    
    //Insert render commands in here to draw to canvas
    graphs[0].render();
    graphs[1].render();
    graphs[2].render();
    graphs[3].render();
    graphs[4].render();
    graphs[5].render();
    textStyle(BOLD);
    drawLegend(colors, userSelect, 1000, 100, 12);
    drawLegend(colors, userSelect, 1000, 1400, 12);
    //Calling drawTitle function to add titles for each chart. L
    drawTitle("Stacked Bar Chart to display sales for each car make for 3 different years", 880, 50, 12, "black");

    drawTitle("Bar Chart to display average sales of each car make across 3 years", 300, 50, 12, "black");

    drawTitle("Total sales of each car make across 3 years including dots to represent the Average sales per year", 300, 600, 12, "black");

    drawTitle("Horizontal Bar Chart to display 2022 sales of each car make", 880, 600, 12, "black");

    drawTitle("Horizontal Stacked Chart to display sales of each car make for 3 years", 880, 1150, 12, "black");

    drawTitle("Line Graph to display average sales of each car make across 3 years", 300, 1150, 12, "black");
   
    noLoop();
   
}

function drawLegend(colors, labels, x, y, dotSize) {
    const padding = 10; // space between dots and text
    textSize(12);
    textAlign(LEFT, CENTER);
    for (let i = 0; i < colors.length; i++) {
      fill(colors[i]);
      ellipse(x, y + (i * dotSize * 2), dotSize, dotSize);
      fill(0);
      text(labels[i], x + padding, y + (i * dotSize * 2));
    }
  }


  function drawTitle(title, x, y, fontSize, textColor) {
    textSize(fontSize);
    fill(textColor);
    textAlign(CENTER, CENTER);
    text(title, x, y);
  }


  
  

  
  