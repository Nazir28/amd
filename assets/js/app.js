"use strict";

//********************************************* SLIDESHOW ***************************************/
let slideIndex = 1;
//showSlides(slideIndex, 'mySlides');

// Next/previous controls
function plusSlides(n, nameClass) {
    showSlides(slideIndex += n, nameClass);
}

// Thumbnail image controls
function currentSlide(n, nameClass) {
    showSlides(slideIndex = n, nameClass);
}

function showSlides(n, nameClass) {
    let i;
    let slides = document.getElementsByClassName(nameClass);
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

//********************************************* TAB ***************************************
function openNewsTab(evt, name) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabNewsContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

function req(url, method='GET', callback,  data=null, errorElementID= 'null') {
    $.ajaxSetup({
        headers: {
            'X-CSRF-Token': $('meta[name=csrf-token]').attr('content')
        }
    });
    $.ajax({
        url: url,
        data: data,
        type: method,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json',
        success: function( data ) {
            callback(data);
        },
        error: function( data ) {
            console.log(data);
            if (errorElementID === 'null') {
                console.log(data);
            }
            else if (errorElementID === 'window.alert') {
                let a;
                $.each(data.responseJSON.errors, function (key, value) {
                    a += value[0];
                });
                //alert(a);
            }
            else {
                $('#' + errorElementID).removeClass('d-none');
                $.each(data.responseJSON.errors, function (key, value) {
                    $('#' + errorElementID).append(value[0]+'<br>');
                });
            }

        }
    });
}

//********************************************* Lang ***************************************

$(document).on('click', '#lang a.active', function (e) {
    e.preventDefault();
    let sts = $(this).attr('data-sts');
    let langIc = document.querySelectorAll("#lang>div>img");
    if(sts == '0'){
        // show
        $(this).attr('data-sts', 1);
        $('#lang .lang-overlay').show(500);
        for(let i = 0; i<langIc.length; i++){
            langIc[i].classList.add("rot180")
        }
    }
    else{
        // hide
        for(let i = 0; i<langIc.length; i++){
            langIc[0].classList.remove("rot180")
        }
        
        $(this).attr('data-sts', 0);
        $('#lang .lang-overlay').hide(500);
    }
});

$(document).on('click', '.lang-overlay a', function (e) {
    e.preventDefault();
    let id = $(this).attr('data-id');
    let txt = $(this).text();
    $('#lang a.active span').attr('data-id', id).html(txt);
    $('#lang a.active img').attr('src', 'assets/images/arrow_down_black.svg');
    $('#lang .lang-overlay').hide(500);
    //window.location.href = "https://amonatbonk.tj/" + id;
});





//********************************************* CONVERTOR ***************************************
$(document).on('click', '.c-c-sel-input a', function (e) {
    e.preventDefault();
    let _v = $(this).attr('data-val');
    $('.c-c-select-input').attr('data-stat', 0).removeClass('c-c-select-input-active');
    $('.c-c-select-input .c-c-arrow img').attr('src', 'assets/images/arrow_down.svg');
    $('.c-c-sel-input').hide();
    $('.c-c-current-input').attr('data-val', _v).html(_v);
});

$(document).on('click', '.c-c-sel-output a', function (e) {
    e.preventDefault();
    let _v = $(this).attr('data-val');
    $('.c-c-select-output').attr('data-stat', 0).removeClass('c-c-select-output-active');
    $('.c-c-select-output .c-c-arrow img').attr('src', 'assets/images/arrow_down.svg');
    $('.c-c-sel-output').hide();
    $('.c-c-current-output').attr('data-val', _v).html(_v);
});

$(document).on('click', '.c-c-select-input', function (e) {
    e.preventDefault();
    $('.c-c-sel-output').hide();
    let _s = $(this).attr('data-stat');
    if(_s == 0){
        $(this).attr('data-stat', 1).addClass('c-c-select-input-active');
        $('.c-c-select-input .c-c-arrow img').attr('src', 'assets/images/arrow_up.svg')
        $('.c-c-sel-input').show();
    }
    else{
        $(this).attr('data-stat', 0).removeClass('c-c-select-input-active');
        $('.c-c-select-input .c-c-arrow img').attr('src', 'assets/images/arrow_down.svg')
        $('.c-c-sel-input').hide();
    }
});

$(document).on('click', '.c-c-select-output', function (e) {
    e.preventDefault();
    $('.c-c-sel-input').hide();
    let _s = $(this).attr('data-stat');
    if(_s == 0){
        $(this).attr('data-stat', 1).addClass('c-c-select-output-active');
        $('.c-c-select-output .c-c-arrow img').attr('src', 'assets/images/arrow_up.svg');
        $('.c-c-sel-output').show();
    }
    else{
        $(this).attr('data-stat', 0).removeClass('c-c-select-output-active');
        $('.c-c-select-output .c-c-arrow img').attr('src', 'assets/images/arrow_down.svg');
        $('.c-c-sel-output').hide();
    }
});

/* Nazirjan scripts */

$(document).ready(function(){
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
        $(this).toggleClass('open');
    });
});

//range
var fillColor = "green",
    emptyColor = "silver";

let ranges =  document.querySelectorAll('input[type=range]');
for(let i = 0; i<ranges.length; i++){
    ranges[i].addEventListener('input', function() {
      var percent = 100*(this.value-this.min)/(this.max-this.min)+'%';
    //  this.setAttribute('value', this.value);
    //  this.setAttribute('title', this.value);
      this.style.backgroundImage = `linear-gradient( to right, ${fillColor}, ${fillColor} ${percent}, ${emptyColor} ${percent})`;
    });
}

//icontogler

const yetIcon = document.querySelector("#yetIcon");
dropdownMenuButton.onclick=()=>{
    yetIcon.classList.toggle("rot180")
}

const rightNavBlock = document.querySelectorAll(".right-nav-block");
const span = document.querySelectorAll(".right-nav>.right-nav-span");
const iconMenu = document.querySelectorAll(".right-nav-span>.iconMenu");
for(let i=0; i<span.length; i++){
    span[i].onclick =()=> {
        rightNavBlock[i].classList.toggle("d-block");
        iconMenu[i].classList.toggle("rot180");
    }
}


jQuery(document).ready(function($) {
    $('#pills-tab[data-mouse="hover"] a').hover(function() {
        $(this).tab('show');
    });
    $('a[data-toggle="pill"]').on('shown.bs.tab', function(e) {
        var target = $(e.relatedTarget).attr('href');
        $(target).removeClass('active');
    })
});
const search = document.querySelector(".search");
const serchBlock = document.querySelector("#serchBlock");
search.onclick = () => {
    serchBlock.classList.toggle("d-none")
}


const navItems = document.querySelectorAll(".header .nav-pills.Desc>a");
const navHover = document.querySelectorAll(".header .nav-pills.Desc>.nav-item>a");
const navDescCont = document.querySelectorAll(".navDescCont");
for (var k = 0 ; k < navDescCont.length; k++) {
    navDescCont[k].classList.add("animate__animated" , "animate__fadeIn")
}

for(let i = 0; i < navItems.length; i++){
    navItems[i].onmouseover=()=>{
        for(let s = 0; s < navDescCont.length; s++){
            navDescCont[s].classList.remove("show", "active");
        }
        for (var r = 0; r < navHover.length; r++) {
            navHover[r].removeAttribute('aria-selected');
            navHover[r].classList.remove("active")
        }
    }
}
for (var r = 0; r < navHover.length; r++) {
    navHover[r].onmouseover=()=>{
        navHover[r].setAttribute('aria-selected', 'true');
        for(let s = 0; s < navDescCont.length; s++){
            navDescCont[s].classList.add("show", "active");
        }
        for (var r = 0; r < navHover.length; r++) {
            navHover[r].setAttribute('aria-selected', "true");
            navHover[r].classList.add("active")
        }
        
    }
}
for (var i = 0 ; i < navDescCont.length; i++) {
    navDescCont[i].onmouseleave=()=>{
        for(let s = 0; s < navDescCont.length; s++){
            navDescCont[s].classList.remove("show", "active");
        }
        for (var r = 0; r < navHover.length; r++) {
            navHover[r].removeAttribute('aria-selected');
            navHover[r].classList.remove("active")
        }
    }
}




let clickForClose = ()=>{
    const content = document.querySelector('#content'),
          footer = document.querySelector('footer'),
          baner = document.querySelector('#baner'),
          navbarCollapsToggler = document.querySelector('header #nav-icon2'),
          navbarCollapsBlock = document.querySelector('header #navbarText');
          
    const closers =()=>{
        serchBlock.classList.add("d-none");
        navbarCollapsToggler.classList.remove('open')
        navbarCollapsToggler.classList.add('collapsed')
        navbarCollapsToggler.setAttribute('aria-expanded', 'false');
        navbarCollapsBlock.classList.remove('show')
    }
    
    content.addEventListener('click', closers);
    footer.addEventListener('click', closers);
    baner.addEventListener('click', closers);
    
    
    console.log(navbarCollapsToggler)
    console.log(navbarCollapsBlock)
    console.log(footer)
    console.log(baner)
    console.log(content)
}

clickForClose()

const quesTogler = document.querySelectorAll(".quesTogler");
const questionsCont = document.querySelectorAll(".questionsCont");
const quesToglerImg = document.querySelectorAll(".quesTogler>.c-p>img");
for (let i = 0; i <= quesTogler.length; i++) {
    quesTogler[i].onclick = () => {
        questionsCont[i].classList.toggle("d-block")
        quesToglerImg[i].classList.toggle("rot180")
    }
}