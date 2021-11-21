$(document).ready(function () {
    $('a[href="#"]').attr('href', 'javascript:void(0)');
    $(".navbox > ul > li > a").each(function () {
        if (this.href == window.location.href) {
            $(this).addClass("navactive");
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    $('.scrollToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('body').addClass('stickyheader');
        } else {
            $('body').removeClass('stickyheader');
        }
    });
});
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateMobile(mobile) {
    const re = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    return re.test(String(mobile).toLowerCase());
}
function resetDropdownForRoom(ids) {
    if (ids.includes(",")) {
        var ids = ids.split(",");
        for (var i = 0; i < ids.length; i++) {
            $("#" + ids[i]).val(1);

        }
    } else {
        $("#" + ids).val(1);
    }
}
function resetFields(ids) {
    if (ids.includes(",")) {
        var ids = ids.split(",");
        for (var i = 0; i < ids.length; i++) {
            $("#" + ids[i]).val("");
        }
    } else {
        $("#" + ids).val("");
    }
}

$('#Subscribe').click(() => {
    var data = new Object();
    data.Email = $('#subtxtEmail').val()
    if (data.Email.length == 0) {
        alert("Please enter your Email for Subscription");
        return false;
    }
    if (!validateEmail(data.Email)) {
        alert("Please enter a valid Email for Subscription");
        return false;
    }
    $.ajax({
        url: '/Home/SubmitSubscription',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        method: 'POST',
        success: function (data) {
            resetFields("subtxtEmail")
            alert("Thank you for subscribing with Us.We will keep you updated with news over Email !")
        },
        error: function (err) {

        }
    })

})
$('#contactBtn_Submit').click(() => { 
    var data = new Object();
    data.Name = $('#txtContactname').val()
    data.Email = $('#txtContactemail').val()
    data.Mobile = $('#txtContactmobile').val()
    data.Message = $('#txtContctmessage').val()
    if (!validateEmail(data.Email)) {
        alert("Please enter a valid Email");
        return false;
    }
    if (!validateMobile(data.Mobile)) {
        alert("Please enter a valid Mobile No.");
        return false;
    }
    var isValid = validateContactModel(data);


    if (isValid) {
        $.ajax({
            url: '/Home/SubmitContactForm',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            method: 'POST',
            success: function (data) {
                resetFields("txtContactname,txtContactemail,txtContactmobile,txtContctmessage");
                alert("Thank you for contacting Us.We will get back to you soon!")
            },
            error: function (err) {

            }
        })
    }
})
$('#btnsubmit').click(()=>{

    var data = new Object();
    data.txtcheckin = $('#txtcheckin').val();
    data.txtcheckout = $('#txtcheckout').val();
    data.DropDownRoom = $('#DropDownRoom option:selected').val();
    data.DropDownAdult = $('#DropDownAdult option:selected').val();
    data.DropDownChildren = $('#DropDownChildren option:selected').val();
    data.txtname = $('#txtname').val();
    data.txtemail = $('#txtemail').val();
    data.txtmobile = $('#txtmobile').val();
    if (!validateEmail(data.txtemail)) {
        alert("Please enter a valid Email");
        return false;
    }
    if (!validateMobile(data.txtmobile)) {
        alert("Please enter a valid Mobile No.");
        return false;
    }

    var isValid = validateModel(data);
    if (isValid) {
        $.ajax({
            url: '/Home/SubmitForm',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            method: 'POST',
            success: function (data) {
                resetFields("txtcheckin,txtcheckout,txtname,txtemail,txtmobile");
                resetDropdownForRoom("DropDownRoom,DropDownAdult,DropDownChildren")
                alert("Thank you for booking with Us.We will contact you soon!")
            },
            error: function (err) {

            }
        })
    }


})
function validateContactModel(model) {
    if (model.Name.length == 0) {
        alert("Please enter your Name");
        return false;
    }
    if (model.Email.length == 0) {
        alert("Please enter your Email");
        return false;
    }
    if (model.Mobile.length == 0) {
        alert("Please enter your Mobile No");
        return false;
    }
    if (model.Message.length == 0) {
        alert("Please enter your Message");
        return false;
    }
    return true;
}
function validateModel(model) {
    if (model.txtcheckin.length == 0) {
        alert("Please enter Check-in Date");
        return false;
    }
    if (model.txtcheckout.length == 0) {
        alert("Please enter Check-out Date");
        return false;
    }
    if (model.DropDownRoom.length == 0) {
        alert("Please select No of Rooms");
        return false;
    }
    if (model.DropDownAdult.length == 0) {
        alert("Please select No of Rooms");
        return false;
    }
    if (model.txtname == "") {
        alert("Please enter your Name");
        return false;
    }
    if (model.txtemail == "") {
        alert("Please enter your Email");
        return false;
    }
    if (model.txtmobile == "") {
        alert("Please enter valid Mobile Number");
        return false;
    }
    return true;
}