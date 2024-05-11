window.addEventListener("scroll", ()=> {
  let btn = document.querySelector(".scrollBtn");
  if (window.pageYOffset > 100) {
    btn.classList.add("show");
  }else {
    btn.classList.remove("show");
  }
})
document.querySelector(".scrollBtn").addEventListener('click', function() {
  window.scrollTo({
    top:0,
  })
})

let btn = document.querySelector('.btn');
let links = document.querySelector('.links');
let menuOpen = false;
btn.addEventListener('click', ()=> {
  if (!menuOpen) {
    btn.classList.add('change');
    links.classList.add('open')
    menuOpen = true;
  }else {
    btn.classList.remove('change');
    links.classList.remove('open')
    menuOpen = false;
  }
})


let wrapper = document.querySelector(".places-container .wrapper"),
fristPlace = wrapper.querySelectorAll("img")[0];
let scrollBtns = document.querySelectorAll(".places-container i");

let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  Position;
let showHideBtn = () => {
  let scrollWidth = wrapper.scrollWidth - wrapper.clientWidth;
  scrollBtns[0].style.display = wrapper.scrollLeft == 0 ? "none" : "block";
  scrollBtns[1].style.display =
    wrapper.scrollLeft == scrollWidth ? "none" : "block";
};
let autoSlide = () => {
  if (wrapper.scrollLeft == wrapper.scrollWidth - wrapper.clientWidth) return;
  Position = Math.abs(Position);
  let fristPlaceWidth = fristPlace.clientWidth + 20;
  let diffre = fristPlaceWidth - Position;
  if (wrapper.scrollLeft > prevScrollLeft) {
    return (wrapper.scrollLeft +=
      Position > fristPlaceWidth / 3 ? diffre : -Position);
  }
  wrapper.scrollLeft -= Position > fristPlaceWidth / 3 ? diffre : -Position;
};
scrollBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let fristPlaceWidth = fristPlace.clientWidth + 20;
    wrapper.scrollLeft += btn.id == "left" ? -fristPlaceWidth : fristPlaceWidth;
    setTimeout(() => showHideBtn(), 500);
  });
});

let dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = wrapper.scrollLeft;
};

let dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  wrapper.classList.add("dragging");
  Position = (e.pageX || e.touches[0].pageX) - prevPageX;
  wrapper.scrollLeft = prevScrollLeft - Position;
  setTimeout(() => showHideBtn(), 500);
};

let dragStop = () => {
  isDragStart = false;
  wrapper.classList.remove("dragging");
  // autoSlide();
};

wrapper.addEventListener("mousemove", dragging);
wrapper.addEventListener("touchmove", dragging);
wrapper.addEventListener("mousedown", dragStart);
wrapper.addEventListener("touchstart", dragStart);
wrapper.addEventListener("mouseup", dragStop);
wrapper.addEventListener("mouseleave", dragStop);
wrapper.addEventListener("touchend", dragStop);

let info = {
  data:[
    {
      placeName: "Aswan",
      info: "Aswan, the city of magic, is located in the south of Egypt, a paradise on an Arab land.",
    },
    {
      placeName: "pyramids",
      info: "The pyramids of Giza lie in Egypt for 7,000 years, great buildings with genius engineering designs.",
    },
    {
      placeName: "France",
      info: "France is a romantic country located in the continent of Europe, a country of magic.",
    },
    {
      placeName: "Khalifa tower",
      info: "Khalifa tower in Dubai is one of the tallest towers in the world, with a length of about 800 meters above sea level.",
    },
    {
      placeName: "Eiffel Tower",
      info: "The Eiffel Tower in France is one of the most beautiful buildings in the world and has been very popular for many years.",
    },
    {
      placeName: "Russia",
      info: "Russia is a country of beauties. There are famous old buildings with great spirituality.",
    },
    {
      placeName: " Pisa Tower",
      info: "The Leaning Tower of Pisa in France is one of the most famous towers in the world, not because of its height, but because it is a tower tilted enough to fall and is still standing in its place without any threat.",
    },
  ]
}

let allImg = document.querySelectorAll(".places-container .wrapper img");
allImg.forEach((img, index) => {
  img.addEventListener("click", ()=> {

    let overlay = document.createElement('div');
    overlay.className = 'popUp-overlay';
    document.body.appendChild(overlay);

    let popUpBox = document.createElement('div');
    popUpBox.className = 'popUp-Box';
    overlay.appendChild(popUpBox);
    
    let popUpInfo = document.createElement('div');
    popUpInfo.className ='popUp-info'
    let placeName = info.data[index].placeName;
    let placeInfo = info.data[index].info;
    popUpInfo.innerHTML = `
    <h2>${placeName}</h2>
    <p>${placeInfo}</p>
    `
    popUpBox.appendChild(popUpInfo);

    let popUpImg = document.createElement('img');
    popUpImg.src = img.src;
    popUpBox.appendChild(popUpImg);

    let closeBtn = document.createElement('span')
    closeBtn.className = 'close-btn';
    let closeBtnText = document.createTextNode('X');
    closeBtn.appendChild(closeBtnText)
    popUpBox.appendChild(closeBtn)
  })
})

document.addEventListener ("click", (e) => {
  if (e.target.className == 'close-btn') {
    // document.querySelector(".popUp-Box").remove();
    document.querySelector(".popUp-overlay").remove();
  }
});

let year = document.querySelector(".year")
let currentYear = new Date().getFullYear();
year.innerHTML = currentYear;