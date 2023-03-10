import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';



function App() {
  
  const [bogdanData, setBogdanData] = useState({});
  const [fabianData, setFabianData] = useState({});
  const [leoData, setLeoData] = useState({});
  const [mateiData, setMateiData] = useState({});
  const [stefanData, setStefanData] = useState({});
  const [bogdanData2, setBogdanData2] = useState({});

  const [testData, setTestData] = useState({});

  const riotKey = 'RGAPI-58040c67-a4fe-4ca9-9b8b-47b4fcedb85e';
  
  let fabian = 'N954To8SyMXoTd2JhRlMg200GyNNHOG0JbZ04Ef3URfLg2Y';
  let leo = 'NI6JBJ7tYn407b1fnaOFv7AFTDhMqtkE6V30lWBopj1Annk';
  let bogdan = 'xcHpMYaiY3S4kphUd_8OKlIs_JongRT5DKa1jMu_mb64yas';
  let matei = 'g6f7kyCiQKjzV1cP9BeDEu7Ru0ZIow79NcdrFFQ99phbGVI';
  let stefan = 'jg3iSRnW2YJO5go_Ou-EwPrFrtllHkwcVbF_yEq0CUszh4o';
  let bogdan2 = '_0ngHMLC7hPbq-47VDVqB3Jc7RrFPz2HS87r_wl6Fa2UnjjfgZIWf7doBg';

  let test = '1FcO8WEt1dbe_dwtj6gx1dgTI1WivZXjux1lV4uH1x4IdIU';
    
  let link = 'https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/';


  let rankToValue = {
    "UNRANKED": 16,
    "IRON IV": 15,
    "IRON III": 14,
    "IRON II": 13,
    "IRON I": 12,
    "BRONZE IV": 11,
    "BRONZE III": 10,
    "BRONZE II": 9,
    "BRONZE I": 8,
    "SILVER IV": 7,
    "SILVER III": 6,
    "SILVER II": 5,
    "SILVER I": 4,
    "GOLD IV": 3,
    "GOLD III": 2,
    "GOLD II": 1,
    "GOLD I": 0
  };

  let valueToRank = {
    16: "UNRANKED",
    15: "IRON IV",
    14: "IRON III",
    13: "IRON II",
    12: "IRON I",
    11: "BRONZE IV",
    10: "BRONZE III",
    9: "BRONZE II",
    8: "BRONZE I",
    7: "SILVER IV",
    6: "SILVER III",
    5: "SILVER II",
    4: "SILVER I",
    3: "GOLD IV",
    2: "GOLD III",
    1: "GOLD II",
    0: "GOLD I"
  };
    
  function searchForPlayer(name){
    var APICallString = link + name + '?api_key=' + riotKey;
    axios.get(APICallString).then(function (response){
      //console.log(response.data);
      if(name == bogdan)
        setBogdanData(response.data);
      else if(name == leo)
        setLeoData(response.data);
      else if(name == fabian)
        setFabianData(response.data);
      else if(name == matei)
        setMateiData(response.data);
      else if(name == stefan)
        setStefanData(response.data);
      else if(name == bogdan2)
        setBogdanData2(response.data);
      else 
        setTestData(response.data);
    }).catch(function(error){
      console.log(error);
    });
  }
  
  function RefreshPage(event){
    window.location.reload();   
  }
  
  window.onload = function() {
    searchForPlayer(bogdan);
    searchForPlayer(fabian);
    searchForPlayer(leo);    
    searchForPlayer(matei);
    searchForPlayer(stefan);
    searchForPlayer(bogdan2);
    searchForPlayer(test);


    if (window.innerWidth < 56 * 16) {
      var firstItem = document.getElementById("li1");
      var secondItem = document.getElementById("li2");
      firstItem.parentNode.insertBefore(secondItem,firstItem);
    } else {
      var firstItem = document.getElementById("li1");
      var secondItem = document.getElementById("li2");
      secondItem.parentNode.insertBefore(firstItem,secondItem);
    }
    
  }

  function autoUpdate(nameData, fct){
    for(let i = 0; i < nameData.length; i++){
      if(JSON.stringify(nameData[i].queueType) == '"RANKED_SOLO_5x5"'){
        fct(nameData[i]);  
        break;
      }
    }
  }

  autoUpdate(bogdanData, setBogdanData);
  autoUpdate(leoData, setLeoData);
  autoUpdate(fabianData, setFabianData);
  autoUpdate(mateiData, setMateiData);
  autoUpdate(stefanData, setStefanData);
  autoUpdate(bogdanData2, setBogdanData2);

  function toSort(playerData, name){
    var rank;
    var player;
    if(JSON.stringify(playerData) != '{}' && playerData.length != 0){
      rank = playerData.tier + " " + playerData.rank;
      player = [name, rank, playerData.wins, playerData.losses, playerData.leaguePoints];
    }
    else{
      rank = "UNRANKED";
      player = [name, rank, 0, 0, 0];
    }

    return player;
  }

  function compare(a, b){

    // WR = Math.round((a[2] * 100) / Math.max(1, a[2] + a[3]))

    let aWR = Math.round((a[2] * 100) / Math.max(1, a[2] + a[3]));
    let bWR = Math.round((b[2] * 100) / Math.max(1, b[2] + b[3]));

    if (rankToValue[a[1]] !== rankToValue[b[1]]) {
      return rankToValue[a[1]] - rankToValue[b[1]];
    } else if (aWR !== bWR) {
      return bWR - aWR;
    } else {
      return a[0].localeCompare(b[0]);
    }
  }

  function sorting(){
    var zuzuytb = toSort(bogdanData, "ZuZuYTB");
    var leo2978 = toSort(leoData, "Leo2978");
    var joxta = toSort(fabianData, "Joxta");
    var kenddd = toSort(mateiData, "kenddd");
    var whitecreepyskull = toSort(stefanData, "WhiteCreepySkuLL");
    var erobam = toSort(bogdanData2, "Erobam");
    
    var players = [zuzuytb, leo2978, joxta, kenddd, whitecreepyskull, erobam];
    players.sort(compare);


    return players;
  }

  var us = sorting();
  let firstplace;
  let secondplace;
  let photo1;
  let photo2;
  let place1;
  let place2;



  window.addEventListener("resize", function(){
    if (window.innerWidth < 56 * 16) {
      var firstItem = document.getElementById("li1");
      var secondItem = document.getElementById("li2");
      firstItem.parentNode.insertBefore(secondItem,firstItem);
    } else {
      var firstItem = document.getElementById("li1");
      var secondItem = document.getElementById("li2");
      secondItem.parentNode.insertBefore(firstItem,secondItem);
    }
  });
  

  


  (function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;

    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "03/01/",
        endDate = dayMonth + yyyy;
    
    today = mm + "/" + dd + "/" + yyyy;
    if (today > endDate) {
      endDate = dayMonth + nextYear;
    }
    
    const countDown = new Date(endDate).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
  
            document.getElementById("days").innerText = Math.floor(distance / (day));
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            if (distance <= 0) {
              document.getElementById("days").innerText = 0;
              document.getElementById("hours").innerText = 0;
              document.getElementById("minutes").innerText = 0;
              document.getElementById("seconds").innerText = 0;
              clearInterval(x);
          }
        }, 0)
    }());



  return (
    <div className="App">
      

      <div className="main">
        <h1 className="neonText">Climbathon 2023 - EUNE Romania Edition</h1>
        <h2 className="neonTextCity">Roman | Cluj | Iasi | Bucuresti</h2>

        <div className="container">
          <div id="countdown">
            <ul className="container_countdown">
              <li className="mylist"><span id = "days"></span>days</li>
              <li className ="mylist"><span id = "hours"></span>Hours</li>
              <li className ="mylist"><span id = "minutes"></span>Minutes</li>
              <li className ="mylist"><span id = "seconds"></span>Seconds</li>
            </ul>
          </div>
        </div>


        <button className="refresh" onClick={e=>RefreshPage(e)}>Refresh Data</button>

        <ul className="cards">
          <li id = "li1" className="cards_item_second">
            <div className="card">
              <div className="card_image"><img id = "img2" src={require('./images/2ndplace.jpg')}></img></div>
              <div className="card_content">
                <h2 className="card_title">2nd Place</h2>
                <h2 className="card_title">{us[1][0]}</h2>
                <h2 className="card_title_rank">{us[1][1] + " " + us[1][4] + " LP"}</h2>
                <p className="card_text">
                  <span className = "Wins">{us[1][2] + "W"}</span> <span className = "Slash"> / </span> <span className = "Losses">{us[1][3] + "L"}</span>
                  <br></br>
                  <span className = "Winrate">{Math.round((us[1][2] * 100) / (Math.max(1, us[1][3] + us[1][2]))) + "% WR - " + (us[1][3] + us[1][2]) + " Games"}</span>
                </p>
              </div>
            </div>
          </li>

          <li id = "li2" className="cards_item_winner">
            <div className="card">
              <div className="card_image"><img id = "img1" src={require('./images/1stplace.jpg')}></img></div>
              <div className="card_content">
              <h2 className="card_title">1st Place</h2>
                <h2 className="card_title">{us[0][0]}</h2>
                <h2 className="card_title_rank">{us[0][1] + " " + us[0][4] + " LP"}</h2>
                <p className="card_text">
                  <span className = "Wins">{us[0][2] + "W"}</span> <span className = "Slash"> / </span> <span className = "Losses">{us[0][3] + "L"}</span>
                  <br></br>
                  <span className = "Winrate">{Math.round((us[0][2] * 100) / (Math.max(1, us[0][3] + us[0][2]))) + "% WR - " + (us[0][3] + us[0][2]) + " Games"}</span>
                </p>
              </div>
            </div>
          </li>

          <li className="cards_item">
            <div className="card">
              <div className="card_image"><img src={require('./images/3rdplace.jpg')}></img></div>
              <div className="card_content">
              <h2 className="card_title">3rd Place</h2>
                <h2 className="card_title">{us[2][0]}</h2>
                <h2 className="card_title_rank">{us[2][1] + " " + us[2][4] + " LP"}</h2>
                <p className="card_text">
                  <span className = "Wins">{us[2][2] + "W"}</span> <span className = "Slash"> / </span> <span className = "Losses">{us[2][3] + "L"}</span>
                  <br></br>
                  <span className = "Winrate">{Math.round((us[2][2] * 100) / (Math.max(1, us[2][3] + us[2][2]))) + "% WR - " + (us[2][3] + us[2][2]) + " Games"}</span>
                </p>
              </div>
            </div>
          </li>

          <li className="cards_item">
            <div className="card">
              <div className="card_image"><img src={require('./images/restplace.jpg')}></img></div>
              <div className="card_content">
                <h2 className="card_title">{us[3][0]}</h2>
                <h2 className="card_title_rank">{us[3][1] + " " + us[3][4] + " LP"}</h2>
                <p className="card_text">
                  <span className = "Wins">{us[3][2] + "W"}</span> <span className = "Slash"> / </span> <span className = "Losses">{us[3][3] + "L"}</span>
                  <br></br>
                  <span className = "Winrate">{Math.round((us[3][2] * 100) / (Math.max(1, us[3][3] + us[3][2]))) + "% WR - " + (us[3][3] + us[3][2]) + " Games"}</span>
                </p>
              </div>
            </div>
          </li>

          <li className="cards_item">
            <div className="card">
              <div className="card_image"><img src={require('./images/restplace.jpg')}></img></div>
              <div className="card_content">
                <h2 className="card_title">{us[4][0]}</h2>
                <h2 className="card_title_rank">{us[4][1] + " " + us[4][4] + " LP"}</h2>
                <p className="card_text">
                  <span className = "Wins">{us[4][2] + "W"}</span> <span className = "Slash"> / </span> <span className = "Losses">{us[4][3] + "L"}</span>
                  <br></br>
                  <span className = "Winrate">{Math.round((us[4][2] * 100) / (Math.max(1, us[4][3] + us[4][2]))) + "% WR - " + (us[4][3] + us[4][2]) + " Games"}</span>
                </p>
              </div>
            </div>
          </li>

          <li className="cards_item">
            <div className="card">
              <div className="card_image"><img src={require('./images/restplace.jpg')}></img></div>
              <div className="card_content">
                <h2 className="card_title">{us[5][0]}</h2>
                <h2 className="card_title_rank">{us[5][1] + " " + us[5][4] + " LP"}</h2>
                <p className="card_text">
                  <span className = "Wins">{us[5][2] + "W"}</span> <span className = "Slash"> / </span> <span className = "Losses">{us[5][3] + "L"}</span>
                  <br></br>
                  <span className = "Winrate">{Math.round((us[5][2] * 100) / (Math.max(1, us[5][3] + us[5][2]))) + "% WR - " + (us[5][3] + us[5][2]) + " Games"}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
