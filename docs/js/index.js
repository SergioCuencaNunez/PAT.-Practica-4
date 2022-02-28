let API_KEY = "dc786d31ccfa2a8201a39dc39eac1523";
let symbol = "MEL.BMEX";
async function getAPI()
{
    let url = "http://api.marketstack.com/v1/eod?access_key="+API_KEY+"&symbols="+symbol
    let respuesta = await fetch(url)
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth()+1;
    let year = currentDate.getFullYear();
    if(respuesta.ok){
        let resultado = await respuesta.json();
        let dict1 = [], dict2= [], dict3 = [];
        for(let i = 0; i < resultado.data.length; i++){
            dict1.push({x: new Date(resultado.data[i].date), y: [Number(resultado.data[i].open), Number(resultado.data[i].high), Number(resultado.data[i].low), Number(resultado.data[i].close)]});
            dict2.push({x: new Date(resultado.data[i].date), y: Number(resultado.data[i].close)});
            dict3.push({x: new Date(resultado.data[i].date), y: Number(resultado.data[i].volume)});
        }
        var grafico = new CanvasJS.StockChart("chartContainer",{
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
            legend: {
              verticalAlign: "top"
            },
            data: [{
              showInLegend: true,
              name: "Valor de la Acción (€)",
              type: "candlestick",
              yValueFormatString: "#,###.##€",
              dataPoints : dict1
            }]
          },{
              height: 100,
              toolTip: {
              shared: true
             },
             axisY: {
              suffix: "€",
             },
             legend: {
               verticalAlign: "top"
             },
             data: [{
               showInLegend: true,
               name: "Volumen (€)",
               yValueFormatString: "#,###.##€",
               dataPoints : dict3
            }]
          }],
          navigator: {
            data: [{
              dataPoints: dict2
            }],
            slider: {
              minimum: new Date(2021, 10, 06),
              maximum: currentDate
            }
          }
        });
        grafico.render();
    }
}

getAPI();