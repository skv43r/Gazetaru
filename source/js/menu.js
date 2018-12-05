var burger = document.querySelector(".menu__button");
var navigation = document.querySelector(".nav-list");
var newsbtn = document.querySelector(".news-button");
var news = document.querySelector(".news-list");
var major = document.querySelector(".major-list");
var majorbtn = document.querySelector(".major-button");
var searchbtn = document.querySelector(".search__button");
var search = document.querySelector(".search");
var input = document.querySelector(".search input");
var search_results_list = document.querySelector(".search_results ul");

var menutoggle = function () {
  navigation.classList.toggle("nav-list--show");
};

menutoggle();
burger.addEventListener('click', function () {
    menutoggle();
});

var newstoggle = function () {
  news.classList.toggle("news-list--show");
  major.classList.toggle("major-list--hide");
};

var majortoggle = function () {
  majorbtn.classList.toggle("major-button--hide");
};

majorbtn.addEventListener('click', function () {
  majortoggle();
  newstoggle();
  newsbtn.classList.toggle("news-button--show");
});

newstoggle();
newsbtn.addEventListener('click', function () {
  newstoggle();
  newsbtn.classList.toggle("news-button--show");
  majorbtn.classList.toggle("major-button--hide");
});

searchbtn.addEventListener('click',function(){
    search.classList.toggle('active');
    this.classList.toggle('close');
    search_results_list.classList.toggle('hide');
});
input.addEventListener('input',function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200) {
            var titles = JSON.parse(this.responseText);
            search_results_list.innerHTML = '';
            for(title of titles){
                search_results_list.innerHTML += wrapTitleAndLink(title.title,title.url)
            }


        }
    }
    xhttp.open("GET","/php/search.php?q=" + this.value,true);
    xhttp.send();
})

function wrapTitleAndLink(title,link){
    return `<li><a href="${link}">${title}</a></li>`
}
