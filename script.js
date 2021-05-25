// key-6bvsBFAl7CEe8ZWUQ2J8vil5lVEoG1L7
//secret-key:-EBKp9hAESGc8UJEB

function createtag(ele, className = "") {
    const element = document.createElement(ele);
    element.setAttribute("class", className);
    return element;
}
//html elements
const container = createtag("div", "container");
const hrtag = createtag("hr", "hr-tag");
//header
const headerrow = createtag("div", "row");
const headercol = createtag("div", "col-md-12 text-center border-bottom py-3");
const headertitle = createtag("p", "h2 head-title");
headertitle.innerHTML = "NEWS TIMES";
const headerdate = createtag("p", "h6");
headerdate.innerHTML = `${toDaysDate()}`;
//header append
headercol.append(headertitle, headerdate);
headerrow.append(headercol);
//navbar
const navrow = createtag("div", "row");
const navcol = createtag("div", "col-md-12 border-bottom py-2");
const navbar = createtag("nav", "navbar-expand-lg navbar-light");
navbar.innerHTML = `<button class="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>`;
const navbar_collapse = createtag("div", "collapse navbar-collapse");
navbar_collapse.id = "navbarsupportedcontent";
const navbarList = createtag("ul", "navbar-nav navbar-list mx-auto");
//navbar append

navbar.append(navbar_collapse);
navcol.append(navbar);
navrow.append(navcol);

//content
const maincontentrow = createtag("div", "row no-gutters mt-3 d-flex justify-content-center");
const leftsidebarcol = createtag("div", "col-md-3");
const centercol = createtag("div", "col-md-6 mx-3");
const rightsidebarcol = createtag("div", "col-md-2");
//content append
maincontentrow.append(leftsidebarcol, centercol, rightsidebarcol);
console.log(maincontentrow);

container.append(headerrow, navrow, maincontentrow);
document.body.append(container);

function toDaysDate() {
    const today = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const month = today.getMonth();
    const date = today.getDate();
    const year = today.getFullYear();
    const day = today.getDay();
    const dayanddate = `${days[day]},${months[month]},${date},${year}`;
    return dayanddate;
}
//API urls
const api_base_url = "https://api.nytimes.com/svc/topstories/v2/";
const api_key = ".json?api-key=6bvsBFAl7CEe8ZWUQ2J8vil5lVEoG1L7";
const news_section = [
    "world",
    "politics",
    "magazine",
    "technology",
    "science",
    "health",
    "sports",
    "arts",
    "fashion",
    "food",
    "travel",
];



// Function to create navigation bar with news section
function navigationBar(sections) {
    const navbarItemActive = createtag("li", "nav-item active ");
    navbarItemActive.innerHTML = `<a class="nav-link navbar-link" href="#">home<span class="sr-only"></span></a>`;
    let navbarItemList = [];
    sections.forEach((section) => {
        const navbarItems = createtag("li", "nav-item");
        navbarItems.innerHTML = `<a class="nav-link navbar-link" href="#">${section}</a>`;
        navbarItemList.push(navbarItems);
    });
    navbarList.append(navbarItemActive, ...navbarItemList);
    navbar_collapse.append(navbarList);
}
navigationBar(news_section);

const navbar_link = document.querySelectorAll(".navbar-link");

navbar_link.forEach((link) => {
    link.addEventListener("click", () => {
        datafromnyapi(api_base_url, link.textContent, api_key);
    });
});

//fetching data to news section

async function datafromnyapi(baseurl, section, key) {
    try {
        const finalapi = await fetch(baseurl + section + key);
        const apijson = await finalapi.json();
        newsdata(apijson);
    } catch {
        console.log("API error occured");
    }
}

//to get home page

function homepage(baseurl, key) {
    fetch(baseurl + "home" + key)
        .then((res) => res.json())
        .then((data) => {
            newsdata(data);
        });
}
homepage(api_base_url, api_key);

function newsdata(data) {
    const results = data.results;
    leftsidebarcol.innerHTML = "";
    rightsidebarcol.innerHTML = "";
    centercol.innerHTML = "";
    newsleft(results);
    newscenter(results);
    newsright(results);
}

function newsleft(news) {
    for (let i = 2; i < 6; i++) {
        const row = createtag("div", "row");
        const col = createtag("div", "col-md-12");
        col.innerHTML = ` <div class="card mb-3" style="max-width:540px">
        <div class="row no-gutters border-bottom pb-3">
        <div class="col-md-7">
        <div class="card-body p-3">
        <span class="card-text text-size px-2 border-right"> ${news[i].section}</span> 
        <span class="card-text text-size px-2">${news[i].item_type}</span>
        <h5 class="h6 mt-2">${news[i].title} </h5>
        <p class="card-text text-size">${news[i].abstract}</p>
        <p class="card-text text-size"><a class="a-link" href="${ news[i].url}" target="_blank">Continue reading...</a></p>
        <p class="card-text text-size">${news[i].byline}</p>
      </div>
    </div>
    <div class="col-md-5">
      <img src="${news[i].multimedia[3].url}"
      class="card-img h-75 my-3" style="object-fit:cover;"
      alt="${news[i].title}"
      />
      <p class="card-text text-size pl-3">Last updated: <br/>${
        news[i].updated_date.split("T")[0]
      }</p>
    </div>
  </div>
</div>`;
        row.append(col);
        leftsidebarcol.append(row);
    }
}

// function to display news in the middle
function newscenter(news) {
    for (let i = 0; i <= 2; i++) {
        const row = createtag("div", "row");
        const col = createtag("div", "col-md-12");
        col.innerHTML = `<div class="card mb-3">
      <div class="row no-gutters border-bottom pb-3">
        <div class="col-md-12">
          <div class='news-type text-center my-1'>
            <span class="card-text text-size px-2 border-right">${
              news[i].section
            }</span>
            <span class="card-text text-size px-2">${news[i].item_type}</span>
          </div>
          <div class="news-img" style="height: 18rem;">
            <img src="${news[i].multimedia[0].url}"
            class="card-img h-100" style="object-fit:cover";
            alt="${news[i].title}"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="card-body">
            <h5 class="h3">${news[i].title}</h5>
            <p class="card-text text-size">${news[i].abstract}</p>
            <p class="card-text text-size"><a class="a-link" href="${
              news[i].url
            }" target="_blank">Continue reading...</a></p>
            <span class="card-text text-size pr-3 border-right">${
              news[i].byline
            }</span>
            <span class="card-text text-size pl-3">Last updated: ${
              news[i].updated_date.split("T")[0]
            }</span>
          </div>
      </div>
    </div>
  </div>`;
        row.append(col);
        centercol.append(row);
    }
}

// function to display news on the right
function newsright(news) {
    for (let i = 7; i < 12; i++) {
        const row = createtag("div", "row");
        const col = createtag("div", "col-md-12");
        col.innerHTML = `<div class="card mb-3" style="max-width: 540px">
        <div class="row no-gutters border-bottom pb-3">
          <div class='news-type text-center w-100 my-1'>
            <span class="card-text text-size px-2 border-right">${
              news[i].section
            }</span>
            <span class="card-text text-size px-2">${news[i].item_type}</span>
          </div>
        <div class="col-md-6">
          <div class="news-img h-75">
            <img src="${news[i].multimedia[3].url}"
            class="card-img h-100 my-3" style="object-fit:cover;"
            alt="${news[i].title}"
            />
          </div>
        </div>
      <div class="col-md-6">
        <div class="card-body p-2 ">
          <h5 class="h6 mt-2"><a class="a-link" href="${
            news[i].url
          }" target="_blank">${news[i].title}</a></h5>    
        </div>
      </div>
      <div class="news-type text-center" style="width:90%;">
        <p class="card-text text-size">${news[i].byline}</p>
        <p class="card-text text-size">Last updated: ${
          news[i].updated_date.split("T")[0]
        }</p>
      </div>
    </div>
  </div>`;
        row.append(col);
        rightsidebarcol.append(row);
    }
}