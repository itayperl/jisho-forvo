var busy = false;

function parse(html)
{
    let play = $(html).find('.results_match .play');

    if (play.length == 0)
    {
        return;
    }

    let raw = play.first().attr('onclick').split("'");
    let audio_obj = $('<audio>');
    if ( raw[5] != '' )
    {
        let mp3h = 'https://audio00.forvo.com/audios/mp3/' + atob(raw[5]);
        audio_obj.append($('<source>').attr('src', mp3h).attr('type', 'audio/mpeg'));
    }
    if ( raw[7] != '' )
    {
        let oggh = 'https://audio00.forvo.com/audios/ogg/' + atob(raw[7]);
        audio_obj.append($('<source>').attr('src', oggh).attr('type', 'audio/ogg'));
    }
    let mp3l = 'https://audio00.forvo.com/mp3/' + atob(raw[1]);
    audio_obj.append($('<source>').attr('src', mp3l).attr('type', 'audio/mpeg'));
    let oggl = 'https://audio00.forvo.com/ogg/' + atob(raw[3]);
    audio_obj.append($('<source>').attr('src', oggl).attr('type', 'audio/ogg'));

    return audio_obj[0].outerHTML;
}

function add_links()
{
    $('#primary .concept_light-wrapper, .page .concept_light-wrapper').each(function() {
        if ($(this).parent().find('.forvo').length > 0) {
            return;
        }

        var word = $(this).find('.concept_light-readings .text').text().trim();
        var href = $('<a class="forvo concept_light-status_link">Play on Forvo</a>').insertBefore($(this).parent().find('.concept_light-status > a').first());
        href.click(function() {
            if (busy)
            {
                return;
            }

            busy = true;
            chrome.runtime.sendMessage({word: word}).then(html => {
                busy = false;
                let obj = parse(html);
                if (obj != null) {
                    $('#forvo').html(obj);
                    $('#forvo audio')[0].play();
                }
                else
                {
                    href.text('Word not found');
                }
            });
        });
    });
}

$(function() {
    add_links();

    var observer = new MutationObserver(function(mutations) {
        add_links();
    });

    observer.observe($('body')[0], { subtree:true, childList: true });
    $('<div id="forvo"/>').appendTo('body');
});
