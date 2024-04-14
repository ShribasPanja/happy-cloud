const API_KEY = process.env.API_KEY;
import express from "express";
import axios from "axios";
import bodyParser from "body-parser"
const app=express();
const port = 3000;
let date = new Date().toLocaleDateString("de-DE");
let hour = new Date().getHours();
console.log(hour);
console.log(date);
let lati;
let long;
let place;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
    app.get("/",async(req,res)=>{
        try{
            const location=await axios.get("http://ip-api.com/json/?fields=61439");
            lati = location.data.lat;
            long = location.data.lon;
            console.log(lati);
            console.log(long);
            place = lati+","+long;
            const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${place}&aqi=yes&days=6`);
            let pic=result.data.current.condition.icon;
            pic=pic.replace("//cdn.weatherapi.com", "");
            let pic1=result.data.forecast.forecastday[0].day.condition.icon;
            pic1=pic1.replace("//cdn.weatherapi.com", "");
            let pic2=result.data.forecast.forecastday[1].day.condition.icon;
            pic2=pic2.replace("//cdn.weatherapi.com", "");
            let pic3=result.data.forecast.forecastday[2].day.condition.icon;
            pic3=pic3.replace("//cdn.weatherapi.com", "");
            let pic4=result.data.forecast.forecastday[3].day.condition.icon;
            pic4=pic4.replace("//cdn.weatherapi.com", "");
            let pic5=result.data.forecast.forecastday[4].day.condition.icon;
            pic5=pic5.replace("//cdn.weatherapi.com", "");
            let pic6=result.data.forecast.forecastday[5].day.condition.icon;
            pic6=pic6.replace("//cdn.weatherapi.com", "");
            console.log(pic);
        res.render("index.ejs",{city: location.data.city,date: date,temperature: result.data.current.temp_c,humidity: result.data.current.humidity,speed: result.data.current.wind_kph,icon: pic,now: result.data.current.condition.text,temp1: result.data.forecast.forecastday[0].hour[0].temp_c,temp2: result.data.forecast.forecastday[0].hour[4].temp_c,temp3: result.data.forecast.forecastday[0].hour[8].temp_c,temp4: result.data.forecast.forecastday[0].hour[12].temp_c,temp5: result.data.forecast.forecastday[0].hour[16].temp_c,temp6: result.data.forecast.forecastday[0].hour[20].temp_c,iconDay1: pic1,iconDay2: pic2,iconDay3: pic3,iconDay4: pic4,iconDay5: pic5,iconDay6: pic6,day1: result.data.forecast.forecastday[0].date,day2: result.data.forecast.forecastday[1].date,day3: result.data.forecast.forecastday[2].date,day4: result.data.forecast.forecastday[3].date,day5: result.data.forecast.forecastday[4].date,day6: result.data.forecast.forecastday[5].date});
        } catch (error) {
            console.error("Failed to make request:", error.message);
            res.render("index.ejs", {
              error: error.message,
            });
        }
    });
    app.post("/",async(req,res)=>{
        const cityName = req.body.city;
        console.log(cityName);
        try{
            const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&aqi=yes&days=6`);
            let pic=result.data.current.condition.icon;
            pic=pic.replace("//cdn.weatherapi.com", "");
            let pic1=result.data.forecast.forecastday[0].day.condition.icon;
            pic1=pic1.replace("//cdn.weatherapi.com", "");
            let pic2=result.data.forecast.forecastday[1].day.condition.icon;
            pic2=pic2.replace("//cdn.weatherapi.com", "");
            let pic3=result.data.forecast.forecastday[2].day.condition.icon;
            pic3=pic3.replace("//cdn.weatherapi.com", "");
            let pic4=result.data.forecast.forecastday[3].day.condition.icon;
            pic4=pic4.replace("//cdn.weatherapi.com", "");
            let pic5=result.data.forecast.forecastday[4].day.condition.icon;
            pic5=pic5.replace("//cdn.weatherapi.com", "");
            let pic6=result.data.forecast.forecastday[5].day.condition.icon;
            pic6=pic6.replace("//cdn.weatherapi.com", "");
            console.log(pic);
        res.render("index.ejs",{city: result.data.location.name,date: date,temperature: result.data.current.temp_c,humidity: result.data.current.humidity,speed: result.data.current.wind_kph,icon: pic,now: result.data.current.condition.text,temp1: result.data.forecast.forecastday[0].hour[0].temp_c,temp2: result.data.forecast.forecastday[0].hour[4].temp_c,temp3: result.data.forecast.forecastday[0].hour[8].temp_c,temp4: result.data.forecast.forecastday[0].hour[12].temp_c,temp5: result.data.forecast.forecastday[0].hour[16].temp_c,temp6: result.data.forecast.forecastday[0].hour[20].temp_c,iconDay1: pic1,iconDay2: pic2,iconDay3: pic3,iconDay4: pic4,iconDay5: pic5,iconDay6: pic6,day1: result.data.forecast.forecastday[0].date,day2: result.data.forecast.forecastday[1].date,day3: result.data.forecast.forecastday[2].date,day4: result.data.forecast.forecastday[3].date,day5: result.data.forecast.forecastday[4].date,day6: result.data.forecast.forecastday[5].date});
        } catch (error) {
            console.error("Failed to make request:", error.message);
            res.render("index.ejs", {
              error: error.message,
            });
        }
    });
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
});