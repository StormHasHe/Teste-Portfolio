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

function loadDesktop(){
    var content = "" +
    "            <div class='accordion'>"+
    "                <ul>"+
    "                    <li data-toggle='modal' data-target='#lightboxOwner'>"+
    "                    </li>"+
    "                    <li data-toggle='modal' data-target='#lightboxTP'>"+
    "                    </li>"+
    "                    <li data-toggle='modal' data-target='#lightboxPI'>"+
    "                    </li>"+
    "                </ul>"+
    "            </div>";

    $(".divGalery").html(content);
}

function loadMobile(){
    var content = "" +
    "            <div class='images-slide'> "+
    "                <a href='javascript:;'><img data-toggle='modal' data-target='#lightboxOwner' src='Content/images/portfolio/Owner/ownerLogo.jpg' /></a>"+
    "                <a href='javascript:;'><img data-toggle='modal' data-target='#lightboxOwner' src='Content/images/portfolio/TenisPolar/divulgacao_facebook.png' /></a>"+
    "                <a href='javascript:;'><img data-toggle='modal' data-target='#lightboxOwner' src='Content/images/portfolio/PequenosInfinitos/CAPA1.jpg' /></a>"+
    "            </div>";

    $(".divGalery").html(content);
}

$(function(){
    setAccordion();
})