let API_KEY = "dc786d31ccfa2a8201a39dc39eac1523";
let symbol = "MEL.BMEX";
async function getAPI()
{
    //let url = "http://api.marketstack.com/v1/eod?access_key="+API_KEY+"&symbols="+symbol
    let respuesta = await fetch(url)
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth()+1;
    let year = currentDate.getFullYear();

    if(respuesta.ok){
        let resultado = await respuesta.json();
        let dict1 = [], dict2= [];
        for(let i = 0; i < resultado.data.length; i++){
            dict1.push({x: new Date(resultado.data[i].date), y: [Number(resultado.data[i].open), Number(resultado.data[i].high), Number(resultado.data[i].low), Number(resultado.data[i].close)]});
            dict2.push({x: new Date(resultado.data[i].date), y: Number(resultado.data[i].close)});
        }
        var stockChart = new CanvasJS.StockChart("chartContainer",{
          theme: "light2",
          exportEnabled: true,
          charts: [{
            axisX: {
              crosshair: {
                enabled: true,
                snapToDataPoint: true
              }
            },
            axisY: {
              suffix: "€"
            },
            data: [{
              type: "candlestick",
              yValueFormatString: "#,###.##€",
              dataPoints : dict1
            }]
          }],
          navigator: {
            data: [{
              dataPoints: dict2
            }],
            slider: {
              minimum: new Date(2021, 04, 01),
              maximum: currentDate
            }
          }
        });
        stockChart.render();
    }
}

getAPI();