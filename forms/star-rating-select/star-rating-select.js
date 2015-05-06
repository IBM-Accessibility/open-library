var rateOptions = [];
$('#rating1').find('option').each(function(i,o) {
    rateOptions.push($(this).text());
});

$('div#rating2').rateit();

$('div#rating2').bind('hover',function(e,v) {
    $(this).attr('title', rateOptions[v-1]);
});
