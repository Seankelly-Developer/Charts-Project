let data;
let userSelect = ["2022_Sales", "2021_Sales", "2020_Sales"];
let colors = ["	#ffa700", "	#d600ff", "#7e00b6"
];
const colors2 = [
    "#171717",
    "#1A1A1A",
    "#1B1B1B",
    "#1C1C1C",
    "#1D1D1D",
    "#1E1E1E",
    "#1F1F1F",
    "#202020",
    "#212121",
    "#222222",
    "#232323",
    "#242424",
    "#252525",
    "#262626",
    "#272727",
    "#282828",
    "#292929",
    "#2A2A2A",
    "#2B2B2B",
    "#2C2C2C",
    "#2D2D2D",
    "#2E2E2E",
    "#2F2F2F",
    "#303030",
    "#313131",
    "#323232",
    "#333333",
    "#343434",
    "#353535",
    "#363636",
    "#373737",
    "#383838",
    "#393939",
    "#3A3A3A",
    "#3B3B3B",
    "#3C3C3C",
    "#3D3D3D",
    "#3E3E3E",
    "#3F3F3F",
    "#404040",
    "#414141",
    "#424242",
    "#434343",
    "#444444",
    "#454545",
    "#464646",
    "#474747",
    "#484848",
    "#494949",
    "#4A4A4A",
    "#4B4B4B",
    "#4C4C4C",
    "#4D4D4D",
    "#4E4E4E",
    "#4F4F4F",
    "#505050",
    "#515151",
    "#525252",
    "#535353",
    "#545454",
    "#555555",
    "#565656",
    "#575757",
    "#585858",
    "#595959",
    "#5A5A5A",
    "#5B5B5B",
    "#5C5C5C",
    "#5D5D5D",
    "#5E5E5E",
    "#5F5F5F",
    "#606060",
    "#616161",
    "#626262",
    "#636363",
    "#646464",
    "#656565",
    "#666666",
    "#676767",
    "#686868",
    "#696969",
    "#6A6A6A",
    "#6B6B6B",
    "#6C6C6C",
    "#6D6D6D",
    "#6E6E6E",
    "#6F6F6F",
    "#707070",
    "#717171",
    "#727272",
    "#737373",
    "#747474",
    "#757575",
    "#767676",
    "#777777",
    "#787878",
    "#797979",
    "#7A7A7A",
    "#7B7B7B",
    "#7C7C7C",
    "#7D7D7D",
    "#7E7E7E",
    "#7F7F7F"
  ];


//Arrays to store instantiated graph objects
let graphs=[];

function preload(){
    data = loadTable('data/master.csv', 'csv', 'header');
    drawLegend(userSelect, colors, 800, 300, 10, 16);
}
async function setup(){
    createCanvas(1300,3000);
    angleMode(DEGREES);
    rectMode(CORNER);

     //Bar Chart
     graphs.push(new barChart(100, 450, 400, 400, data, data.getRowCount(), 10, 10, -5, 5, "Bar Chart"));

     //Stacked Chart
     graphs.push(new StackedBarChart(700, 450, 400, 400, data, data.getRowCount(), 10, 10, -5, 5));
}



function draw(){
    
    //Insert render commands in here to draw to canvas
    graphs[0].render();
    graphs[1].render();
    drawLegend(colors, userSelect, 1000, 100, 12);
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
