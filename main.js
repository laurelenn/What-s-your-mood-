//DEFINITION DES VARIABLES//

var Happy_Baby = {
  'SENTENCE' : 'Stay happy and laught a lot !',
  'VIDEOID' : 'w0AOGeqOnFY',
};
var Happy_Young = {
  'SENTENCE' : 'Stay happy and laught a lot !',
  'VIDEOID' : 'LACbVhgtx9I',
};
var Happy_Old = {
  'SENTENCE' : 'Stay happy and laught a lot !',
  'VIDEOID' : 'Ct6BUPvE2sM',
};

var Sad_Baby = {
  'SENTENCE' : 'Be happy !',
  'VIDEOID' : 'Z2xooz6844k',
};
var Sad_Young = {
  'SENTENCE' : 'Be happy !',
  'VIDEOID' : 'H0m3Lfkzcw4',
};
var Sad_Old = {
  'SENTENCE' : 'Be happy !',
  'VIDEOID' : 'VnJeG9RGUVM',
};

var Nervous_Baby = {
  'SENTENCE' : 'Be positive and find ZEN attitude !',
  'VIDEOID' : 'aaJANT6adDw',
};
var Nervous_Young = {
  'SENTENCE' : 'Be positive and find ZEN attitude !',
  'VIDEOID' : 'MRL0KomHIOk',
};
var Nervous_Old = {
  'SENTENCE' : 'Be positive and find ZEN attitude !',
  'VIDEOID' : '3GAAW9HzBo4',
};

var Tired_Baby = {
  'SENTENCE' : 'Motivate yourself and be energetic !',
  'VIDEOID' : 'jVm1NbrXaXc',
};
var Tired_Young = {
  'SENTENCE' : 'Motivate yourself and be energetic !',
  'VIDEOID' : 'pXvoeCgi59o',
};
var Tired_Old = {
  'SENTENCE' : 'Motivate yourself and be energetic !',
  'VIDEOID' : 'pMYCOYjIKrE',
};

var Dead_Baby = {
  'SENTENCE' : 'Rest in peace... Sorry for you.',
  'VIDEOID' : 'gJFm65l84GA',
};
var Dead_Young = {
  'SENTENCE' : 'Rest in peace... Sorry for you.',
  'VIDEOID' : 'Xx3nTsFJEQE',
};
var Dead_Old = {
  'SENTENCE' : 'Rest in peace... Sorry for you.',
  'VIDEOID' : 'nld33qxlgCA',
};

var player; // player de la video


////////////////// [DEFINITION DE TOUTES LES FONCTIONS] ////////////////


//CHARGE L'API YOUTUBE
function loadPlayer(){
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// QUAND ON APPUIE SUR SEARCH //

function changeMoodFirstPart(){  //PREMIERE PARTIE CHANGEMENT SECTION MOOD//

  var activePicture = document.querySelector('.picture-active');
  document.querySelector("#mood-need").innerHTML="You need<span>.</span><span>.</span><span>.</span>" // Phrase Need apparait
  activePicture.classList.remove('picture-active');
  document.querySelector("#allFaces").classList.add('picture-active');
  setTimeout(changeMoodSecondPart, 2000); // Après 2 sec, appelle la deuxieme partie
}


function changeMoodSecondPart(){   //DEUXIEME PARTIE CHANGEMENT SECTION MOOD//

  var valueMood = document.querySelector("#input-mood").value;
  var valueAge = document.querySelector("#input-age").value;
  var chosenPicture = document.querySelector("#"+valueMood+"-"+valueAge);
  document.querySelector("#allFaces").classList.remove('picture-active');
  document.querySelector("#mood-need").innerHTML="You need to : ";
  chosenPicture.classList.add('picture-active');
  var sentenceMood = valueMood+"_"+valueAge;
  document.querySelector("#mood-sentence").innerHTML =  window[sentenceMood].SENTENCE;
  var video_id = window[sentenceMood].VIDEOID;

  // APPEL DE L'API
  player = new YT.Player('video-content', {   //Créer un iframe / yt player
    width: 1080,
    height: 540,
    // videoId : video_id,
    videoId: window[sentenceMood].VIDEOID, //--> Je n'arrive pas à mettre les "''"
    playerVars: { 'rel':0, 'loop' : 1 }
  });


  setTimeout(buttonGoAppear, 1500); // APRES 1.5 SECONDES, APPELLE BUTTONGOAPPEAR()
}

function buttonGoAppear(){   //FAIT APPPARAITRE LE BOUTON GO
  document.querySelector("#go").style.display = "inline"; // Bouton let's go apparait
}


// QUAND ON APPUIE SUR LET'S GO //
function letsGo(){
  document.querySelector("#popup-video").style.display = "inline"; // Ouvre pop-up vidéo
  player.playVideo(); // La video démarre
}

// QUAND ON APPUIE SUR LE "?" --> popup-surprise s'ouvre//
function surpriseOpen(){
  document.querySelector("#popup-surprise").style.display = "inline";
  setTimeout(surpriseClose ,  2500);
}

// FERMER LE POP-UP SURPRISE AU BOUT DE QUELQUES SECONDES
function surpriseClose(){
  document.querySelector("#popup-surprise").style.display = "none";
}

// QUAND ON APPUIE SUR LE "X" --> pop-up-video se ferme//
function closeVideo(){
  document.querySelector("#go").style.display = "none";
  document.querySelector("#popup-video").style.display = "none";
  player.stopVideo(); // La video s'arrête
  player.destroy(); // Le lecteur disparait (se remet à 0 également)
}



////////////////////////////////////////////////////////////////////////////////////////


////////[APPEL DES FONCTIONS ET EVENT PERMANENTS]////////

// MODIFIE LE TITRE EN FONCTION DU NOM //
document.querySelector("#input-name").addEventListener("keyup", function(event){
  var userName =  document.querySelector("#input-name").value;
  document.querySelector("#welcome-title").innerHTML =  "Welcome " + userName;
});


// EVENT : Quand on appuie sur search;
document.querySelector("#button-search").addEventListener("click", function(event) {
  event.preventDefault();
  loadPlayer();
  changeMoodFirstPart();
});


// EVENT: Quand on appuie sur Let's go;
document.querySelector("#go").addEventListener("click", function(event) {
  letsGo();
});


// EVENT : Quand on appuie sur ?;
document.querySelector("#button-surprise").addEventListener("click", function(event) {
  surpriseOpen();
});

// EVENT : Quand on appuie sur X;
document.querySelector("#button-cross").addEventListener("click", function(event) {
  closeVideo();
  delete player;
});
