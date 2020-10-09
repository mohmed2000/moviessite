let moviesInner = document.getElementById("Movies");
let search = document.getElementById("search");
let word = document.getElementById("word");

let AllMovies = []; //5s
async function GetAllMovies(type="now_playing") {
  let respone = await fetch(
    `https://api.themoviedb.org/3/movie/${type}?api_key=e7ec94517a59bcd40a493b182802b7ff&language=en-US&page=1`
  );
  let result = await respone.json();

  AllMovies = result.results;
  DisplayAllMovies(AllMovies);
}

GetAllMovies();

function DisplayAllMovies(AllMovies) {
  let cartona = ``;
  for (let index = 0; index < AllMovies.length; index++) {
    cartona += `
        <div class="col-md-4 mt-3">
        <div class="movie position-relative overflow-hidden">
            <img class="w-100" src="https://image.tmdb.org/t/p/w500${AllMovies[index].poster_path}" alt="">
            <div class="overlay position-absolute text-center pt-5">
                <h2>${AllMovies[index].title}</h2>
                <p>${AllMovies[index].overview}</p>
                <h3>${AllMovies[index].vote_average}</h3>
                <span>${AllMovies[index].release_date}</span>
            </div>
        </div>
    </div>
        `;
  }

  moviesInner.innerHTML = cartona;
}

// ============================= array search========================
search.addEventListener("keyup", () => {
  SearchInput(search.value);
  console.log(search.value);
});

function SearchInput(search) {
  let cartona = ``;
  for (let index = 0; index < AllMovies.length; index++) {
    if (
      AllMovies[index].title.toLowerCase().includes(search.toLowerCase()) ==
      true
    ) {
      cartona += `
            <div class="col-md-4 mt-3">
            <div class="movie position-relative overflow-hidden">
                <img class="w-100" src="https://image.tmdb.org/t/p/w500${AllMovies[index].poster_path}" alt="">
                <div class="overlay position-absolute text-center pt-5">
                    <h2>${AllMovies[index].title}</h2>
                    <p>${AllMovies[index].overview}</p>
                    <h3>${AllMovies[index].vote_average}</h3>
                    <span>${AllMovies[index].release_date}</span>
                </div>
            </div>
        </div>
            `;
    }
  }

  moviesInner.innerHTML = cartona;
}

// ================================= search by word=========================

word.addEventListener("keyup", () => {
  SearchByWord(word.value);
  console.log(word.value);
});

async function SearchByWord(term) {
  if (term == "") return null;

  let AllMovies = [];
  let newResult = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=e7ec94517a59bcd40a493b182802b7ff&language=en-US&query=${term}&page=1&include_adult=false`
  );
  let result = await newResult.json();

  AllMovies = result.results;
  console.log(AllMovies);
  DisplayAllMovies(AllMovies);
}

// ====================================== side menu==========================

let isOpen = true;
let MenuItems=$("ul li")

$("#close").click(() => {
  let SideMenu = $("#sideMenu").outerWidth();
  let rightSide = $(".rightSide").outerWidth();

  let width = SideMenu - rightSide;
  console.log(SideMenu);
  if (isOpen) {
    $("#sideMenu").animate({ left: 0 });


    for (let index = 0; index < MenuItems.length; index++) {

        $(`.item${index}`).animate({ paddingTop: "30px" },index*50+1000);

        
    }

    $("#close").removeClass("fa-bars").addClass("fa-times");
    isOpen = false;
  } else {
    $("ul li").animate({ paddingTop: "500px" });

    $("#close").removeClass("fa-times").addClass("fa-bars");
    $("#sideMenu").animate({ left: -width });

    isOpen = true;
  }
});



for (let index = 0; index < MenuItems.length; index++) {
   
    MenuItems[index].addEventListener('click',()=>{
        GetAllMovies(MenuItems[index].getAttribute("MovieTitle"))

    })

// console.log();

    
}