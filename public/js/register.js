$(document).ready(function(){
    console.log('jquery loaded');
    $('.register-form').on('submit', function(e){
        e.preventDefault();
        const username = $('.username').val();
        const password = $('.password').val();
        $.ajax({
            type: "POST",
            url: "/createAccount",
            data: {
                username: username,
                password: password
            },
            success: function (response) {
                console.log(response);
            },
            error: function(__xhr,__statusCode,error){
                console.log(error);
            } 
        });
    })
});