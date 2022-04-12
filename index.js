var http = require('http');
var fs=require('fs');
var requests=require('requests');
var bodyParser=require("body-parser");
var express=require("express");
var bcrypt= require('bcrypt');


const homefile = fs.readFileSync("home.html","utf-8");
const homefile1 = fs.readFileSync("home1.html","utf-8");

const homefile2 = fs.readFileSync("home2.html","utf-8");


http=express();
http.use(express.json());
http.use(bodyParser.json());
http.use(express.static('public'));
http.use(bodyParser.urlencoded({
    extended: true
}));









//Code for 3rd page home3.html page replacement
//create a server object: This is default page code.
http.get('/',function(req,res){
  requests("https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=ac7789ef5adc2b73e00156239fcb3da4")
            .on('data', function (chunk,err) {
              const objdata=JSON.parse(chunk);
              const arrdata=[objdata];
              //console.log(arrdata);
              //console.log(val.main);
              const realTimeData =arrdata.map((val)=>replaceVal(homefile,val))
              .join(" ");
              res.write(realTimeData);

            

           
           
        
            })

            

            .on('end', function (err) {
              if (err) return console.log('connection closed due to errors', err);
            
              console.log('end');
            });
 

})
            
    //This Code here is used for search bar city for weather forecasting only------------ 
   
    http.post('/locasend',function(req,res){

      var cityname=req.body.location;
      console.log(cityname);
      requests("https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=ac7789ef5adc2b73e00156239fcb3da4")
      .on('data', function (chunk) {
        const objdata=JSON.parse(chunk);
        const arrdata=[objdata];
        //console.log(arrdata);
        //console.log(val.main);
        const realTimeData =arrdata.map((val)=>replaceVal(homefile,val))
        .join(" ");
        res.write(realTimeData);
        

        
  
      })

      

      .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
      
        console.log('end');
      });

    })

    //Code for 1st page home.html replacement
          const replaceVal = function(tempVal,orgval){
            var tempmain=parseInt((orgval.main.temp-273.15));
            var tempmax=parseInt((orgval.main.temp_max-273.15));
            var tempmin=parseInt((orgval.main.temp_min-273.15));
            let temparature= tempVal.replace("{%tempval%}",tempmain);
            
            temparature= temparature.replace("{%tempmin%}",tempmax);
            
            temparature= temparature.replace("{%tempmax%}",tempmin);
            
            temparature= temparature.replace("{%location%}",orgval.name);
            
            temparature= temparature.replace("{%country%}",orgval.sys.country);

            temparature=temparature.replace("{%status%}",orgval.weather[0].description);

            return temparature;
          }

      //This Code below is for weather forecasting 

      http.post("/link1",function(req,res){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=ac7789ef5adc2b73e00156239fcb3da4")
        .on('data', function (chunk) {
          const objdata=JSON.parse(chunk);
          const arrdata=[objdata];
          //console.log(arrdata);
          //console.log(val.main);
          const realTimeData =arrdata.map((val)=>replaceVal(homefile,val))
          .join(" ");
          res.write(realTimeData);
       
    
        })

        

      .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
      
        console.log('end');
      });
           
            
    })



         ///////////////////////////////////Weather Forecasting Ends Here//////////////////////////////////////////////////////////////

  




        /////////////////////////////////////////////////Air Forecasting Starts Here ///////////////////////////////////////////////////////////


         //Code for 2nd page home2.html page replacement Air Polution
         var x;
         var y;
         var tempma;
         var z;
 
    const replaceVals = function(tempVal,orgval){
      //var tempmain=parseInt((orgval.main.temp-273.15));
      //let temparature= tempVal.replace("{%tempval%}",tempmain);
      let temparature= tempVal.replace("{%location%}",orgval.name);
      temparature= temparature.replace("{%country%}",orgval.sys.country);
      x=orgval.name;
      y=orgval.sys.country;
     tempma=parseInt((orgval.main.temp-273.15));
     z=orgval.weather[0].description
     // temparature=temparature.replace("{%status%}",orgval.weather[0].description);
      return temparature;
    }

    //This Code below is for Air Pollution Forecasting Button


    const airpollutionstaticdata = function(pollval,porgval){
      let pollution= pollval.replace("{%pollval%}",porgval.coord.lat);
      pollution= pollution.replace("{%pollo2%}",porgval.coord.lon);
   


      pollution= pollution.replace("{%pollpm25%}",porgval.coord.lat);

      pollution=pollution.replace("{%location%}",x);
      pollution=pollution.replace("{%country%}",y);
      pollution=pollution.replace("{%tempval%}", tempma);
      pollution=pollution.replace("{%status%}",z)
      
   

      return pollution;
    
    }

    
    http.post("/link2",function(req,res){
    req.body.cityname="Bangalore";

      requests("https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=ac7789ef5adc2b73e00156239fcb3da4")
      .on('data', function (chunk) {
        const objdata=JSON.parse(chunk);
        const arrdata=[objdata];
        //console.log(arrdata);
        //console.log(val.main);
        const realTimeData =arrdata.map((val)=>replaceVals(homefile1,val))
        .join(" ");

                        //Here is the code we will initialise the connection for api of air pollution forecasting//

                      requests("http://api.openweathermap.org/data/2.5/air_pollution?lat=12.9762&lon=77.6033&appid=ac7789ef5adc2b73e00156239fcb3da4")
                      .on('data', function (chunk) {
                        const objdata=JSON.parse(chunk);
                        const arrdata=[objdata];
                        //console.log(arrdata);
                        //console.log(val.main);
                        const realTimeData =arrdata.map((val)=>airpollutionstaticdata(homefile1,val))
                        .join(" ");
                        res.write(realTimeData);
                      })
                      .on('end', function (err) {
                        if (err) return console.log('connection closed due to errors', err);
                      
                        console.log('end');
                      });
        //res.write(realTimeData);

        
     
  
      })
      
      

      .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
      
        console.log('end');
      });



            
       






                   

   
      
       
    })

   

  




    


  
   
    http.post('/locasend1',function(req,res){

      var latidata=0;
      var londata=0;
      
     //Here we are getting the data of latitude and longitude using arraymap data  

       //This Code here is used for search bar city for Air Pollution forecasting only------------ 

    
       var lats=0;
       var longi=0;//Variable for getting lattitude and longitudeSS

    function getlats(cordata){//Cordinates data will have long and latitude data
        lats=cordata.coord.lat;
                 return lats;}


     function getlon(cordata){
        longi=cordata.coord.lon;
        return longi;}

        /////////////////////////////////////////////////////////////////

      var cityname=req.body.location1;
      console.log(cityname);
      requests("https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=ac7789ef5adc2b73e00156239fcb3da4")
      .on('data', function (chunk) {
        const objdata=JSON.parse(chunk);
        const arrdata=[objdata];
        //console.log(arrdata);
        //console.log(val.main);

        const realTimeData =arrdata.map((val)=>replaceVals(homefile1,val))
        .join(" ");
       const latsdata=arrdata.map(getlats);//Here we are going to get data of longitude and latitude data by using array map method.
       const longidata=arrdata.map(getlon);
      //console.log(lats);
       //console.log(longi);
       latidata=(parseFloat(latsdata));
       londata=(parseFloat(longidata));
       console.log(latidata);
      console.log(londata);

                     //Here is the code we will initialise the connection for api of air pollution forecasting//
                     requests("http://api.openweathermap.org/data/2.5/air_pollution?lat=" + latidata + "&lon=" + londata + "&appid=ac7789ef5adc2b73e00156239fcb3da4")
                     .on('data', function (chunk) {
                      const realTimeData =arrdata.map((val)=>airpollutionstaticdata(homefile1,val))
                      .join(" ");
                      res.write(realTimeData);
                     })
                     .on('end', function (err) {
                       if (err) return console.log('connection closed due to errors', err);
                     
                       console.log('end');
                     });
       

       // res.write(realTimeData)
      })


      .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
      
        console.log('end');
      });



     

                 

    }).listen(process.env.PORT || 5000)




    /////////////////////////////////////////////////Air Forecasting Ends Here ///////////////////////////////////////////////////////////















    //////////////////////////////////////////////////Road Risk Forecasting end here///////////////////////////////////////////////////////