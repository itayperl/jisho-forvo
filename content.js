$(function() {
    $('#primary .concept_light-wrapper').each(function() {
        var word = $(this).find('.concept_light-readings .text').text().trim();
        var href = $('<a class="concept_light-status_link">Play on Forvo</a>').insertBefore($(this).parent().find('.concept_light-status > a').first());
        href.click(function() {
            chrome.runtime.sendMessage(null, {word: word}, function(obj) {
                if (obj !== null) {
                    $(obj)[0].play();
                }
                else
                {
                    href.text('Word not found');
                }
            }.bind(this));
        });
    });
});
