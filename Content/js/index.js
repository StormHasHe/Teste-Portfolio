var currentGallery = "";

var ownerGallery = [];

ownerGallery.push("Content/images/portfolio/Owner/ownerLogo.jpg");
ownerGallery.push("Content/images/portfolio/Owner/owner.jpg");
ownerGallery.push("Content/images/portfolio/Owner/owner2.jpg");
ownerGallery.push("Content/images/portfolio/Owner/owner3.jpg");
ownerGallery.push("Content/images/portfolio/Owner/capa_face.jpg");

var tpGallery = [];

tpGallery.push("Content/images/portfolio/TenisPolar/divulgacao_facebook.png");
tpGallery.push("Content/images/portfolio/TenisPolar/Feature Graphic.png");
tpGallery.push("Content/images/portfolio/TenisPolar/mao2.png");
tpGallery.push("Content/images/portfolio/TenisPolar/img_desc1.png");
tpGallery.push("Content/images/portfolio/TenisPolar/img_desc2.png");
tpGallery.push("Content/images/portfolio/TenisPolar/img_desc3.png");
tpGallery.push("Content/images/portfolio/TenisPolar/img_desc4.png");

var pequenosInfinitosGallery = [];

pequenosInfinitosGallery.push("Content/images/portfolio/PequenosInfinitos/CAPA1.jpg");
pequenosInfinitosGallery.push("Content/images/portfolio/PequenosInfinitos/CAPA2.jpg");
pequenosInfinitosGallery.push("Content/images/portfolio/PequenosInfinitos/PEQINFINITOS-face2.jpg");

function sendEmail() {
    var email = $("#txtEmail").val();
    var subject = $("#txtAssunto").val();
    var message = $("#txtMensagem").val();

    $.ajax({
        type: "POST",
        url: '/Home/SendEmail?clientEmail=' + email + "&subject=" + subject + "&message=" + message,
        success: function (result) {
            if (!result.HasError) {
                $(".alertFade").addClass("alert-success").html(result.Message).fadeIn('slow');
                setTimeout(function () { $(".alertFade").fadeOut('slow').removeClass("alert-success").html(""); }, 5000);
            }
            else {
                $(".alertFade").addClass("alert-danger").html(result.Message).fadeIn('slow');
                setTimeout(function () { $(".alertFade").fadeOut('slow').removeClass("alert-danger").html(""); }, 5000);
            }
        }
    });
}

function setAccordion(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        loadMobile();
    } else{
        loadDesktop();
    }
}

function setScrollEvent() {
    $(".divGalery li").bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($("#portfolioDetails").offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
}

function loadDesktop(){
    var content = "" +
    "            <div class='accordion'>"+
    "                <ul>"+
    "                    <li onclick=loadGalleryDetails(&quot;Owner&quot;)>" +
    "                    </li>"+
    "                    <li onclick=loadGalleryDetails(&quot;TenisPolar&quot;)>" +
    "                    </li>"+
    "                    <li onclick=loadGalleryDetails(&quot;PequenosInfinitos&quot;)>" +
    "                    </li>"+
    "                </ul>"+
    "            </div>";

    $(".divGalery").html(content);
}

function loadMobile(){
    var content = "" +
    "            <div class='images-slide'> "+
    "                <a href='javascript:;'><img onclick=loadGalleryDetails(&quot;Owner&quot;) src='Content/images/portfolio/Owner/ownerLogo.jpg' /></a>"+
    "                <a href='javascript:;'><img onclick=loadGalleryDetails(&quot;TenisPolar&quot;) src='Content/images/portfolio/TenisPolar/divulgacao_facebook.png' /></a>"+
    "                <a href='javascript:;'><img onclick=loadGalleryDetails(&quot;PequenosInfinitos&quot;) src='Content/images/portfolio/PequenosInfinitos/CAPA1.jpg' /></a>"+
    "            </div>";

    $(".divGalery").html(content);
}

function loadGalleryDetails(galleryName){
    if (currentGallery == galleryName){
        $("#portfolioDetails").fadeToggle(500);
        event.stopImmediatePropagation();
        currentGallery = "";
        return false;
    }
    else {
        $("#portfolioDetails").fadeOut(500).promise().done(function(){
            $(".divGaleryDetails").html("");

            switch (galleryName){
                case 'Owner':
                    var title = "Owner Wearing";
                    var description = "Projeto feito para uma nova loja de roupas recem lançada.";
                    loadGalleryTitleAndDescription(title, description);
                    loadGalleryImages(ownerGallery);
                    break;
                case 'TenisPolar':
                    var title = "Tenis Polar";
                    var description = "Aplicativo lançado para android, que codifica mensagens.";
                    loadGalleryTitleAndDescription(title, description);
                    loadGalleryImages(tpGallery);
                    break;
                case 'PequenosInfinitos':
                    var title = "Pequenos Infinitos";
                    var description = "Design do livro escrito por mim como trabalho de conclusão da faculdade.";
                    loadGalleryTitleAndDescription(title, description);
                    loadGalleryImages(pequenosInfinitosGallery);
                    break;
            }

            setImageDetailClickEvent();
            $("#portfolioDetails").fadeIn(500);
        });
    }

    currentGallery = galleryName;
}

function setImageDetailClickEvent(){
    $(".divGaleryDetails img").each(function (){
        $(this).bind("click", function(){
            $(".lightboxImg").attr('src', ($(this).attr('src')));
        });
    });
}

function loadGalleryTitleAndDescription(title, description){
    $("#portfolioDetailTitle").html(title);
    $("#portfolioDetailDescription").html(description);
}

function loadGalleryImages(galleryArray){
    var count = 0;

    addNewGalleryRow();

    for (var i = 0; i < galleryArray.length; i++){
        loadGalleryImageSrc(galleryArray[i]);

        if (count == 3){
            addNewGalleryRow();
            count = 0;
        }
        else
            count++;
    }
}

function loadGalleryImageSrc(src){
    var html = "<div class='col-md-3 col-sm-4 col-xs-6'>" +
                "<img class='img-responsive' data-toggle='modal' data-target='#lightbox' src='" + src + "' />" +
           "</div>";

    $(".divGaleryDetails .row:last-child").append(html);
}

function addNewGalleryRow()
{
    var html = "<div class='row'></div>";
    $(".divGaleryDetails").append(html);
}

$(function(){
    setAccordion();
    setScrollEvent();
})