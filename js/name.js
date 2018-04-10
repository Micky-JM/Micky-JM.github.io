/**
 ** JS file for landing screen
 ** @author Michael (Micky) Mangrobang
 **/

window.onbeforeunload = function () {
    window.scrollTo(0, 0);    // refresh back to top of screen
}

$(document).ready(function () {

    /*$('#my-name .my-name-segment').transition('hide').transition({
        animation   : 'fly up',
        interval    : 200
    });*/

    if ($(window).width() > 768) {

        $('#my-name .my-name-segment').transition('hide').transition({
            animation   : 'fly up',
            interval    : 200
        });

        setTimeout(beginTyping, 1000);

    } else {

        beginTyping();

    }

    $('#homeToProjects').click(function(){

        let menu = '#desktopMenu';
        let href = $(this).attr('href');
        let anchor = $(href).offset();
        let menuHeight = ($(menu).is(':visible')) ? $(menu).height() : 0;
        $('html, body').animate({ scrollTop: anchor.top - menuHeight }, 500);
       return false;

    });

});

var beginTyping = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }

    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #FFF }";
    document.body.appendChild(css);

};

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    //var delta = 300 - Math.random() * 100;
    var delta = 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
    //delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};