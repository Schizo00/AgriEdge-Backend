
const functions = require('firebase-functions');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

// import * as corsModule from 'cors'
const corsModule = require('cors');
const cors = corsModule({origin:true});


const admin = require('firebase-admin');
admin.initializeApp();

exports.insertFromPubsubPlant = functions.pubsub.topic('edge-device-plant').onPublish((message, context) => {
    // //console.log('The function was triggered at ', context.timestamp);

    const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
    // // //console.log('full message:', messageBody);
    let objectArray = [];

    let tempData = '';
    try {
        tempData = message.json['plantInfo'][0];               // if the message is in JSON format, we can use message.json
        // //console.log('received message', tempData.id);
    } catch (e) {
        functions.logger.error('PubSub message not in JSON format. error:', e);
    }

    for (let i = 0; i < message.json['plantInfo'].length; i++) {
    
        let xCoord = '';
        let yCoord = '';
        let diseaseName = '';
        let severity = '';
        try {
            id = message.json['plantInfo'][i].id;
            xCoord = message.json['plantInfo'][i].xCoord;
            yCoord = message.json['plantInfo'][i].yCoord;
            diseaseName = message.json['plantInfo'][i].diseaseName;
            severity = message.json['plantInfo'][i].severity;

            // //console.log('id', id);
            // //console.log('xCoord', xCoord);
            // //console.log('yCoord', yCoord);
            // //console.log('diseaseName', diseaseName);
            // //console.log('severity', severity);

            var plantInfo = {
                'id': id,
                'xCoord': xCoord,
                'yCoord': yCoord,
                'diseaseName': diseaseName,
                'severity': severity,
            };

            objectArray.push(plantInfo)
        

        } catch (e) {
            functions.logger.error('PubSub message attributes error:', e);
        }


    }

    plantInfoObject = JSON.parse(JSON.stringify(objectArray))

    // //console.log("JSON Object", plantInfoObject)
    
    return admin.firestore().collection('plantDiseaseData').add({"plantInfo":plantInfoObject, "date": FieldValue.serverTimestamp()});
});


exports.insertFromPubsubWeather = functions.pubsub.topic('edge-device-weather').onPublish((message, context) => {
  // //console.log('The function was triggered at ', context.timestamp);

  const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
  // // //console.log('full message:', messageBody);
  let objectArray = [];

  let tempData = '';
  try {
      tempData = message.json['humidity'];               // if the message is in JSON format, we can use message.json
      // //console.log('received message', tempData.id);
  } catch (e) {
      functions.logger.error('PubSub message not in JSON format. error:', e);
  }

  
    let windSpeed = '';
    let temperature = '';
    let precipitation = '';
    let severity = '';
    try {
        humidity = message.json['humidity'];
        windSpeed = message.json['windSpeed'];
        temperature = message.json['temperature'];
        precipitation = message.json['precipitation'];

        // //console.log('id', id);
        // //console.log('xCoord', xCoord);
        // //console.log('yCoord', yCoord);
        // //console.log('diseaseName', diseaseName);
        // //console.log('severity', severity);

        var weatherObject = {
          humidity: humidity,
          windSpeed: windSpeed,
          temperature: temperature,
          precipitation: precipitation,
          date: FieldValue.serverTimestamp()
        };


    

    } catch (e) {
        functions.logger.error('PubSub message attributes error:', e);
    }



  // //console.log("JSON Object", plantInfoObject)
  
  return admin.firestore().collection('weatherData').add(weatherObject);
});



exports.insertFromPubsubRainfall = functions.pubsub.topic('edge-device-rainfall').onPublish((message, context) => {
  // //console.log('The function was triggered at ', context.timestamp);

  const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
  // // //console.log('full message:', messageBody);
  let objectArray = [];

  let tempData = '';
  try {
      tempData = message.json['Rainfall'];               // if the message is in JSON format, we can use message.json
      // //console.log('received message', tempData.id);
  } catch (e) {
      functions.logger.error('PubSub message not in JSON format. error:', e);
  }

  
  let rainfall = '';
  let sunshine = '';
  let windGustSpeed = '';
  let humidity9am = '';
  let humidity3pm = '';
  let cloud9am = '';
  let cloud3pm = '';
  let temp3pm = '';
  let rainToday = '';

    try {
        rainfall = message.json['Rainfall'];
        sunshine = message.json['Sunshine'];
        windGustSpeed = message.json['WindGustSpeed'];
        humidity9am = message.json['Humidity9am'];
        humidity3pm = message.json['Humidity3pm'];
        cloud9am = message.json['Cloud9am'];
        cloud3pm = message.json['Cloud3pm'];
        temp3pm = message.json['Temp3pm'];
        rainToday = message.json['RainToday'];

        // //console.log('id', id);
        // //console.log('xCoord', xCoord);
        // //console.log('yCoord', yCoord);
        // //console.log('diseaseName', diseaseName);
        // //console.log('severity', severity);

        var rainfallObject = {
          rainfall: rainfall,
          sunshine: sunshine,
          windGustSpeed: windGustSpeed,
          humidity9am: humidity9am,
          humidity3pm: humidity3pm,
          cloud9am: cloud9am,
          cloud3pm: cloud3pm,
          temp3pm: temp3pm,
          rainToday:rainToday,
          date: FieldValue.serverTimestamp()
        };

    

    } catch (e) {
        functions.logger.error('PubSub message attributes error:', e);
    }


  // //console.log("JSON Object", plantInfoObject)
  
  return admin.firestore().collection('rainfallData').add(rainfallObject);
});


exports.insertFromPubsubTemp = functions.pubsub.topic('edge-device-temp').onPublish((message, context) => {
  // //console.log('The function was triggered at ', context.timestamp);

  const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
  // // //console.log('full message:', messageBody);
  let objectArray = [];

  let tempData = '';
  try {
      tempData = message.json['Rainfall'];               // if the message is in JSON format, we can use message.json
      // //console.log('received message', tempData.id);
  } catch (e) {
      functions.logger.error('PubSub message not in JSON format. error:', e);
  }

  
  let rainfall = '';
  let sunshine = '';
  let evaporation = '';
  let humidity3pm = '';
  let windSpeed9am = '';
  let pressure3pm = '';
  let temp = '';


    try {
        rainfall = message.json['Rainfall'];
        sunshine = message.json['Sunshine'];
        windSpeed9am = message.json['WindSpeed9am'];
        humidity3pm = message.json['Humidity3pm'];
        pressure3pm = message.json['Pressure3pm'];
        evaporation = message.json['Evaporation'];
        temp = message.json['Temp'];

        // //console.log('id', id);
        // //console.log('xCoord', xCoord);
        // //console.log('yCoord', yCoord);
        // //console.log('diseaseName', diseaseName);
        // //console.log('severity', severity);

        var tempObject = {
          rainfall: rainfall,
          sunshine: sunshine,
          windSpeed9am: windSpeed9am,
          humidity3pm: humidity3pm,
          pressure3pm: pressure3pm,
          evaporation: evaporation,
          temp: temp,
          date: FieldValue.serverTimestamp()
        };

    

    } catch (e) {
        functions.logger.error('PubSub message attributes error:', e);
    }


  // //console.log("JSON Object", plantInfoObject)
  
  return admin.firestore().collection('tempData').add(tempObject);
});





exports.plantData = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {

        var dbData = await firebaseToFrontEnd();
        // //console.log("DB Data: ", dbData);
        let pieDataVariable = processPieDataPlant(dbData);
        let lineDataVariable = processLineDataPlant(dbData)
        let barAndTableVariable = processBarDataPlant(dbData);
        let barDataVariable = barAndTableVariable[0];
        let plantTableVariable = processTableDataPlant(dbData);
        let heatMapVariable = processAreaDataPlant(dbData);
        // //console.log("Area Variable: ", heatMapVariable.topVal);

        let lineDataConstant = {
          "isUp": lineDataVariable.isUp,
          "topVal": lineDataVariable.topVal,
          "xAxis":{
             "type":"category",
             "data":lineDataVariable.day,
             "axisLine": {
                "show": false
             },
             "axisLabel": {
              "show": true
             },
             "axisTick": {
              "show": false
            }
          },
          "yAxis":{
             "type":"value",
             "splitLine": {
              "show": false
            },
            "axisLine": false,
            "min": Math.min(...lineDataVariable.value),
            "max": Math.max(...lineDataVariable.value) + Math.max(...lineDataVariable.value) * 0.25
          },
          "series":[
             {
                "color": ['#0099FF'],
                "data":lineDataVariable.value,
                "type":"line",
                "smooth":true,
                "emphasis": {
                  "label": {
                    "show": true,
                    "fontSize": 10,
                    "fontWeight": "bold"
                  }
                }
             }
          ]
       }


       

    
    

       

       let barDataConstant = {
        "isUp": barDataVariable.isUp,
        "topVal": barDataVariable.topVal,
        "xAxis":{
           "type":"category",
           "data":barDataVariable.day,
           "axisLabel":{
              "show":true
           },
           "axisLine":{
              "show":false
           },
           "axisTick": {
            "show": false
          }
        },
        "yAxis":{
           "type":"value",
           "splitLine":{
              "show":false
           },
           "axisLabel":{
              "show":false
           },
           "max": Math.max(...barDataVariable.value) + Math.max(...barDataVariable.value) * 0.25
        },
        "series":[
           {
              "data":barDataVariable.value,
              "type":"bar",
              "emphasis": {
                "label": {
                  "show": true,
                  "fontSize": 10,
                  "fontWeight": "bold"
                }
              }
          }
        ],
        "color":[
           "#61CDBB"
        ]
     }
     
    
    
        let pieDataConstant = {
              "isUp": pieDataVariable.isUp,
              "topVal": pieDataVariable.topVal,
              "tooltip": {
                "trigger": "item"
              },
              "legend": null,
              "series": [
                {
                  "name": "",
                  "color": ['#F02E2E','#8DFF00'],
                  "type": "pie",
                  "radius": ["50%", "70%"],
                  "avoidLabelOverlap": false,
                  "itemStyle": {
                    "borderRadius": 10,
                    "borderColor": "#fff",
                    "borderWidth": 2
                  },
                  "label": {
                    "show": false,
                    "position": "center"
                  },
                  "emphasis": {
                    "label": {
                      "show": true,
                      "fontSize": 10,
                      "fontWeight": "bold"
                    }
                  },
                  "labelLine": {
                    "show": false
                  },
                  "data": pieDataVariable.value
                }
              ]
            };

        let heatMapConstant = {
          isUp: heatMapVariable.isUp,
          topVal: heatMapVariable.topVal * 0.72,
          tooltip: {
            position: 'top',
            formatter: "params => `X: ${params.value[0]}, Y: ${params.value[1]}`",
            show: false
          },
          grid: {
            height: '50%',
            top: '10%'
          },
          xAxis: {
            type: 'category',
            splitArea: {
              show: true
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            splitArea: {
              show: true
            },
            axisLabel: {
              show: false
            },
             axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          visualMap: {
            min: 0,
            max: 10,
            inRange : {   
              color: ['#8DFF00','#F02E2E']
            },//From smaller to bigger value ->
          
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
            show: false,
          },
          series: [
            {
              name: '',
              type: 'heatmap',
              data: heatMapVariable.value,
              label: {
                show: false
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
          };

        
        let outputData = {
          plantPieData: pieDataConstant,
          plantLineData: lineDataConstant,
          plantBarData: barDataConstant,
          plantAreaData: heatMapConstant,
          plantTableData: plantTableVariable
        }
        
          
    
        res.send(JSON.stringify(outputData));
    })
    
    
});



async function firebaseToFrontEnd() {
    const db = await getFirestore();
    const plantDiseaseDataCollection = await db.collection('plantDiseaseData');
    const queryData = await plantDiseaseDataCollection.orderBy('date', 'desc').limit(7).get();
    let data = []

    queryData.forEach(doc => {
        data.push(doc.data())
      });
    
    data.reverse()

    // //console.log(data)
 
    return data;
};


async function firebaseToFrontEndWeather() {
  const db = await getFirestore();
  const weatherDataCollection = await db.collection('weatherData');
  const queryData = await weatherDataCollection.orderBy('date', 'desc').limit(7).get();
  let data = []

  queryData.forEach(doc => {
      data.push(doc.data())
    });
  
  data.reverse()

  //console.log("firebase reading: ", data)

  return data;
};



function processPieDataPlant(data) {
    diseasedPlantsCount = 0;
    prevDiseasedPlantsCount = 0

    for (let i = 0; i < data[6]['plantInfo'].length; i++) {
        // //console.log("For Loop: ",data[i])
        if (data[6]['plantInfo'][i]['diseaseName'] != "Healthy"){
            diseasedPlantsCount++;
        }

        if (data[5]['plantInfo'][i]['diseaseName'] != "Healthy"){
            prevDiseasedPlantsCount++;
        }
    }

    var isUpVar = false;

    if (diseasedPlantsCount <= prevDiseasedPlantsCount) {
        isUpVar = false;
    } else {
        isUpVar = true;
    }

    // //console.log("prevDiseasedPlants", prevDiseasedPlantsCount);
    // //console.log("diseasedPlants", diseasedPlantsCount);

    var returnData = { value: [
        {
          "value": diseasedPlantsCount,
          "name": "Infected"
        },
        {
          "value": data[6]['plantInfo'].length - diseasedPlantsCount,
          "name": "Healthy"
        }
    ], isUp: isUpVar, topVal:diseasedPlantsCount,
  };

  return returnData;
}


function processTableDataPlant(data) {

    var plantDataArray = []

    for (let i = 0; i < data[6]['plantInfo'].length; i++) {
        var tempPlantData = {
            "plantID": data[6]['plantInfo'][i]['id'],
            "xCoord": data[6]['plantInfo'][i]['xCoord'],
            "yCoord": data[6]['plantInfo'][i]['yCoord'],
            "diseaseName": data[6]['plantInfo'][i]['diseaseName'],
            "severityLevel": data[6]['plantInfo'][i]['severity']
        }
        plantDataArray.push(tempPlantData)
    }

    return plantDataArray;
}


function processLineDataPlant(data) {
    
    var dayCountArray = [0,0,0,0,0,0,0];
    var dayNameArray = [];
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // //console.log("Time: ",data[6]['date'].toDate().getDay())

    var isUpVar = false;

    for (let i = 0; i < data.length; i++) {
        
        var tempCount = 0;

        for (let j = 0; j < data[i]['plantInfo'].length; j++) {

            if (data[i]['plantInfo'][j]['diseaseName'] != "Healthy"){
                tempCount++;
            }

        }
        
        dayCountArray[i] = tempCount;
        dayNameArray.push(weekday[data[i]['date'].toDate().getDay()]);

    }

    if (dayCountArray[dayCountArray.length - 1] <= dayCountArray[dayCountArray.length - 2]) {
        isUpVar = false;
    } else {
        isUpVar = true;
    }

    var topVal = Math.ceil(((dayCountArray[dayCountArray.length - 1]) / (dayCountArray[dayCountArray.length - 2])) * 100);

    var returnData = {day: dayNameArray, value: dayCountArray, isUp: isUpVar, topVal: topVal}

    return returnData;


}


function processBarDataPlant(data) {
    
    var dayCountArray = [0,0,0,0,0,0,0];
    var dayNameArray = [];
    var detectedVariationsData = [];
    var detectedVariations = {};
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    // //console.log("Time: ",data[6]['date'].toDate().getDay())

    var isUpVar = false;

    

    for (let i = 0; i < data.length; i++) {
        
        for (let j = 0; j < data[i]['plantInfo'].length; j++) {

          // //console.log('data check', data[i]['plantInfo'][j]['diseaseName']);

            if (!(data[i]['plantInfo'][j]['diseaseName'] in detectedVariations)) {
                detectedVariations[data[i]['plantInfo'][j]['diseaseName']] = 1;
                // // //console.log("first: ", data[i]['plantInfo'][j]['diseaseName'])
            } else {
                detectedVariations[data[i]['plantInfo'][j]['diseaseName']] = detectedVariations[data[i]['plantInfo'][j]['diseaseName']]++;
                // //console.log("else: ", data[i]['plantInfo'][j]['diseaseName'])
            }


            // // //console.log("first disease: ", detectedVariations)

        }

        dayCountArray[i] = Object.keys(detectedVariations).length;
        detectedVariationsData.push(JSON.parse(JSON.stringify(detectedVariations)));
        // // //console.log("After: ", detectedVariations);
        detectedVariations = {};
        dayNameArray.push(weekday[data[i]['date'].toDate().getDay()]);

    }

    // //console.log("day count: ", dayCountArray);
    // // //console.log("detected variations", detectedVariationsData);

    if (dayCountArray[dayCountArray.length - 1] <= dayCountArray[dayCountArray.length - 2]) {
        isUpVar = false;
    } else {
        isUpVar = true;
    }

    
  

    var topVal = dayCountArray[dayCountArray.length - 1];

    var returnBarData = {day: dayNameArray, value: dayCountArray, isUp: isUpVar, topVal: topVal};

    return [returnBarData, detectedVariationsData];


}

function processAreaDataPlant(data) {
    var dataArray = [];
    var diseaseCount = 0;
    var prevDiseaseCount = 0;
    var diseases = []


    // have to add every disease count except healthy 

    for (let i = 0; i < data[6]['plantInfo'].length; i++) {
        

        if (data[6]['plantInfo'][i]['diseaseName'] != "Healthy"){
            var tempVal = [data[6]['plantInfo'][i]['xCoord'], data[6]['plantInfo'][i]['yCoord'], 10];
            dataArray.push(tempVal);
            diseases.push(data[6]['plantInfo'][i]['diseaseName']);
            diseaseCount++;
        } else {
          var tempVal = [data[6]['plantInfo'][i]['xCoord'], data[6]['plantInfo'][i]['yCoord'], 1];
          dataArray.push(tempVal);
        }
    }

    for (let i = 0; i < data[5].length; i++) {
    
        if (data[5]['plantInfo'][i]['xCoord'] != "Healthy"){
            prevDiseaseCount++;
        }
    }

    var isUpVar = false;

    if (prevDiseaseCount <= diseaseCount) {
        isUpVar = true;
    }

    var topVal = diseaseCount;

    // //console.log("Area topVal: ", topVal);

    var returnData = {value : dataArray.map(function (item) {
        return [item[1], item[0], item[2] || '-']
      }), isUp : isUpVar, topVal: topVal
    } 

    

    // //console.log("return Data: ",dataArray)

    return returnData;
}



exports.weatherData = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {

    dbData = await firebaseToFrontEndWeather();
    // //console.log("from http: ", dbData)
    barData1Variable = processDataWeather(dbData, 'humidity');
    barData2Variable = processDataWeather(dbData, 'precipitation');
    lineDataVariable = processDataWeather(dbData, 'temperature');
    gaugeDataVariable = processDataWeather(dbData, 'windSpeed');

    let barData1Constant = {
      "isUp": barData1Variable.isUp,
      "topVal": barData1Variable.lastVal,
      "xAxis":{
         "type":"category",
         "data":barData1Variable.day,
         "axisLabel":{
            "show":true
         },
         "axisLine":{
            "show":false
         },
         "axisTick": {
          "show": false
        }
      },
      "yAxis":{
         "type":"value",
         "splitLine":{
            "show":false
         },
         "axisLabel":{
            "show":false
         },
         "max": Math.max(...barData1Variable.value) + Math.max(...barData1Variable.value) * 0.25
      },
      "series":[
         {
            "data":barData1Variable.value,
            "type":"bar",
            "emphasis": {
              "label": {
                "show": true,
                "fontSize": 10,
                "fontWeight": "bold"
              }
            }
        }
      ],
      "color":[
         "#61CDBB"
      ]
   }

   let barData2Constant = {
    "isUp": barData2Variable.isUp,
    "topVal": barData2Variable.lastVal,
    "xAxis":{
       "type":"category",
       "data":barData2Variable.day,
       "axisLabel":{
          "show":true
       },
       "axisLine":{
          "show":false
       },
       "axisTick": {
        "show": false
      }
    },
    "yAxis":{
       "type":"value",
       "splitLine":{
          "show":false
       },
       "axisLabel":{
          "show":false
       },
       "max": Math.max(...barData2Variable.value) + Math.max(...barData2Variable.value) * 0.25
    },
    "series":[
       {
          "data":barData2Variable.value,
          "type":"bar",
          "emphasis": {
            "label": {
              "show": true,
              "fontSize": 10,
              "fontWeight": "bold"
            }
          }
      }
    ],
    "color":[
       "#61CDBB"
    ]
 }


 let lineDataConstant = {
  "isUp": lineDataVariable.isUp,
  "topVal": lineDataVariable.lastVal,
  "xAxis":{
     "type":"category",
     "data":lineDataVariable.day,
     "axisLine": {
        "show": false
     },
     "axisLabel": {
      "show": true
     },
     "axisTick": {
      "show": false
    }
  },
  "yAxis":{
     "type":"value",
     "splitLine": {
      "show": false
    },
    "axisLine": false,
    "min": Math.min(...lineDataVariable.value),
    "max": Math.max(...lineDataVariable.value) + Math.max(...lineDataVariable.value) * 0.25
  },
  "series":[
     {
        "color": ['#0099FF'],
        "data":lineDataVariable.value,
        "type":"line",
        "smooth":true,
        "emphasis": {
          "label": {
            "show": true,
            "fontSize": 10,
            "fontWeight": "bold"
          }
        }
     }
  ]
}

let gaugeDataConstant = {
  series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 20,
      splitNumber: 5,
      itemStyle: {
        color: '#FFAB91'
      },
      progress: {
        show: true,
        width: 30
      },
      pointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          width: 30
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        distance: -20,
        length: 10,
        lineStyle: {
          width: 1,
          color: '#999'
        }
      },
      axisLabel: {
        distance: -20,
        color: '#999',
        fontSize: 10
      },
      anchor: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 20,
        borderRadius: 8,
        offsetCenter: [0, '-15%'],
        fontSize: 20,
        fontWeight: 'bolder',
        formatter: '{value} kmh',
        color: 'inherit'
      },
      data: [
        {
          value:gaugeDataVariable.lastVal
        }
      ]
    }
  ],
  isUp: gaugeDataVariable.isUp,
  topVal: gaugeDataVariable.lastVal
};


let weatherTableConstant = await processWeatherTableData();
 
   

    let outputData = {
      weatherBarData1: barData1Constant,
      weatherBarData2: barData2Constant,
      weatherLineData: lineDataConstant,
      weatherGaugeData: gaugeDataConstant,
      weatherTableData: weatherTableConstant
    }
    

      

    res.send(JSON.stringify(outputData));

  })

});


function processDataWeather(dbData, attrString) {
  var data = dbData;
  //console.log("Weather DB Data: ", data)
  var dataSeries = [];
  var dayNameArray = [];
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var isUp = false;


  for (let i = 0; i < data.length; i++) {
    dataSeries.push(data[i][attrString]);
    dayNameArray.push(weekday[data[i]['date'].toDate().getDay()])
  }

  if (dataSeries[dataSeries.length - 1] <= dataSeries[dataSeries.length - 2]) {
    isUp = false;
  } else {
    isUp = true;
  }

  var returnData = {
    day: dayNameArray,
    value: dataSeries,
    isUp: isUp,
    lastVal: dataSeries[dataSeries.length - 1]
  }

  return returnData
  
}


async function processWeatherTableData() {

  const db = await getFirestore();
  const rainfallDataCollection = await db.collection('rainfallData');
  const rainfallQueryData = await rainfallDataCollection.orderBy('date', 'desc').limit(1).get();

  const tempDataCollection = await db.collection('tempData');
  const tempQueryData = await tempDataCollection.orderBy('date', 'desc').limit(1).get();


  let rainfallData = []
  let tempData = []

  rainfallQueryData.forEach(doc => {
      rainfallData.push(doc.data())
    });

  tempQueryData.forEach(doc => {
    tempData.push(doc.data())
  });

    
  const rainfallUrl = 'https://us-central1-shining-rush-392311.cloudfunctions.net/rain_fall_predict';
  const tempUrl = 'https://us-central1-shining-rush-392311.cloudfunctions.net/temp_predict';

  console.log("rainfallData: ", rainfallData);
  console.log("tempData: ", tempData);

  rainfallPredictBody = rainfallData[0]
  tempPredictBody = tempData[0]


  let returnedDataTemp = await fetch(tempUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      "rainfall": tempPredictBody['rainfall'],
      "sunshine": tempPredictBody['sunshine'],
      "windSpeed9am": tempPredictBody['windSpeed9am'],
      "evaporation": tempPredictBody['evaporation'],
      "humidity3pm": tempPredictBody['humidity3pm'],
      "temp": tempPredictBody['temp'],
      "pressure3pm":tempPredictBody['pressure3pm']
    }),
})

let returnedDataTempJson = await returnedDataTemp.json()


let returnedDataRainfall = await fetch(rainfallUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    "rainfall": rainfallPredictBody['rainfall'],
    "sunshine": rainfallPredictBody['sunshine'],
    "windGustSpeed": rainfallPredictBody['windGustSpeed'],
    "humidity9am": rainfallPredictBody['humidity9am'],
    "humidity3pm": rainfallPredictBody['humidity3pm'],
    "cloud9am": rainfallPredictBody['cloud9am'],
    "cloud3pm": rainfallPredictBody['cloud3pm'],
    "temp3pm": rainfallPredictBody['temp3pm'],
    "rainToday":rainfallPredictBody['rainToday']
  }),
})


let weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

let returnedDataRainfallJson = await returnedDataRainfall.json()

returnedDataRainfallJson = returnedDataRainfallJson['predictions'].map(Number).map((value) => Math.round(value))
returnedDataTempJson = returnedDataTempJson['predictions'].map(Number).map((value) => Math.round(value))

let pngSeries = weatherClassification(returnedDataRainfallJson, returnedDataTempJson)

let day = new Date(Date.now()).getDay()
console.log("day: ", day)


for (let i = 0; i < day + 1; i++) {
  weekday = arrayRotate(weekday)
}


console.log("after rotating: ", weekday)


var returnObjectArray = []

for (let i = 0; i < weekday.length; i++) {
  var returnObject = {
    rainfall: returnedDataRainfallJson[i],
    temp: returnedDataTempJson[i],
    image: pngSeries[i],
    day: weekday[i]
  }

  returnObjectArray.push(returnObject)
}

console.log("Return Obj: ", returnObjectArray)

return returnObjectArray

}


function weatherClassification(rainfallSeries, tempSeries) {

  var pngArray = [];

  for (let i = 0; i < rainfallSeries.length; i++) {

    if (rainfallSeries[i] >= 5 && tempSeries[i] <= 20) {
      pngArray.push("rainy.png");
    } else if (rainfallSeries[i] <= 5 && tempSeries[i] >= 20 ) {
      pngArray.push("sunny.png");
    } else if (rainfallSeries[i] >= 2 && tempSeries[i] >= 20) {
      pngArray.push("daycloudy.png");
    } else {
      pngArray.push("cloudy.png");
    }

  }


  return pngArray;
}


function arrayRotate(arr, reverse) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
  return arr;
}