chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    $.ajax('https://forvo.com/search/' + request.word + '/ja').done(function(data) {
        var play = $(data).find('.results_match .play');

        if (play.length == 0)
        {
            sendResponse(null);
            return;
        }

        var raw = play.first().attr('onclick').split("'");
        var audio_obj = $('<audio>');
        if ( raw[5] != '' )
        {
            var mp3h = 'https://audio00.forvo.com/audios/mp3/' + atob(raw[5]);
            audio_obj.append($('<source>').attr('src', mp3h).attr('type', 'audio/mpeg'));
        }
        if ( raw[7] != '' )
        {
            var oggh = 'https://audio00.forvo.com/audios/ogg/' + atob(raw[7]);
            audio_obj.append($('<source>').attr('src', oggh).attr('type', 'audio/ogg'));
        }
        var mp3l = 'https://audio00.forvo.com/mp3/' + atob(raw[1]);
        audio_obj.append($('<source>').attr('src', mp3l).attr('type', 'audio/mpeg'));
        var oggl = 'https://audio00.forvo.com/ogg/' + atob(raw[3]);
        audio_obj.append($('<source>').attr('src', oggl).attr('type', 'audio/ogg'));
        sendResponse(audio_obj[0].outerHTML);
    });

    return true;
});
