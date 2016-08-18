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