$(document).ready(function(){

$(".team-member").hover(
    function() {
        var photo = $(this).find("img.photo");
        var orig = photo.attr("src");
        var swap = photo.attr("swap");
        photo.attr({
            swap: orig,
            src: swap
        });
        $(this).find(".reason").toggle();
    }
);

});
