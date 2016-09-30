'use strict';

console.clear();

var paragraphs = document.querySelectorAll('h1, h2, h3, p');

function updateInfo() {
    Array.prototype.forEach.call(paragraphs, function (p) {
        var styles = getComputedStyle(p);
        var lh = parseFloat(styles.lineHeight.replace('px', ''));
        var fs = parseFloat(styles.fontSize.replace('px', ''));
        var ratio = Math.round(lh / fs * 100) / 100;
        var roundedFs = Math.round(fs * 100) / 100;
        p.setAttribute('data-info', roundedFs + 'px / ' + ratio);
    });
}

updateInfo();

window.addEventListener('resize', function () {
    updateInfo();
    getCPL(paragraphs[1]);
});

function getCPL(el) {
    var span = document.createElement('span');
    var styles = window.getComputedStyle(el);
    var padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    var containerWidth = el.clientWidth - padding;
    var samples = 1;
    var aggregateCPL = 0;
    var text = 'born like this\ninto this\nas the chalk faces smile\nas Mrs. Death laughs\nas the elevators break\nas political landscapes dissolve\nas the supermarket bag boy holds a college degree\nas the oily fish spit out their oily prey\nas the sun is masked\n\nwe are \nborn like this\ninto this\ninto these carefully mad wars\ninto the sight of broken factory windows of emptiness\ninto bars where people no longer speak to each other\ninto fist fights that end as shootings and knifings...';

    document.body.appendChild(span);
    span.style.whiteSpace = 'nowrap';

    for (var j = 0; j < samples; j++) {
        var spanWidth = span.getBoundingClientRect().width;

        while (spanWidth < containerWidth) {
            span.innerHTML += text[aggregateCPL];
            spanWidth = span.getBoundingClientRect().width;
            aggregateCPL++;
        }

        span.innerHTML = '';
    }
    var avgCPL = aggregateCPL / samples;
    console.log(avgCPL);
};