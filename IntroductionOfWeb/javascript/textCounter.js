$('#inputText').keyup(function () {
    let textLength = $('#inputText').val().length;
    console.log(textLength);

    $('#textLength').html(textLength);
});