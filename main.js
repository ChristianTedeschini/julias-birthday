// ------------Now Playing------------
let user = 'juggomess'; //put your username here
let url = 'https://lastfm-last-played.biancarosa.com.br/' + user + '/latest-song';


fetch(url)
  .then(function (response) {
    return response.json()
  }).then(function (json) {
    console.log(json);
    const track = json['track'];
    const t = '#text';
    const small = '0';
    const medium = '1';
    const large = '2';
    const xl = '3';

    const widget = document.getElementById('widget');
    const loading = document.getElementById('loading');
    const playTitle = document.getElementById('playState');

    const art = document.createElement('img');
    art.src = track['image'][large][t];
    widget.appendChild(art);
    const name = document.createElement('h3');
    name.classList.add('lastfm-track-name');
    widget.appendChild(name);
    const artist = document.createElement('p');
    artist.classList.add('lastfm-artist-name');
    widget.appendChild(artist);
    const album = document.createElement('p');
    album.classList.add('lastfm-album-name');
    widget.appendChild(album);
    //To style each element
    // {{selectelement}}.setAttribute('class', {{yourclass}});

    //Add info to elements
    name.innerText = track['name'];
    artist.innerText = track['artist'][t];
    album.innerText = `from "${track['album'][t]}"`;

    const a = document.getElementById('user');
    a.setAttribute('href', 'https://www.last.fm/user/' + user);

    //hide the loading symbol
    loading.setAttribute('class', 'hidden');

    //play boolean
    let playBoo = track['@attr']['nowplaying'];

    console.log(playBoo);
    if (playBoo) { //if there's something in play boolean, say 'now playing'
      playTitle.innerText = 'Now Playing';
    }
    else {
      playTitle.innerText = 'Error';
    }


  });

$('.photobook-carousel').slick({
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 300,
  centerMode: false,
  autoplaySpeed: 2750,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }
  ],
  prevArrow: "<img class='a-left control-c prev slick-prev left-arrow' src='./src/images/left-arrow.png'>",
  nextArrow: "<img class='a-right control-c next slick-next right-arrow' src='./src/images/right-arrow.png'>"
});