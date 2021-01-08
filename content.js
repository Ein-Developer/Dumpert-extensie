var item_id = $('body').attr('data-itemid').replace('_', '/');
$("#nm_recbtfcom").before("<div id=\"comments\"></div>");
$( "iframe" ).remove();

$("#comments").html('<section class="comments">\n' +
    '<h1 id="reacties">Reaguursels</h1>\n' +
    '\n' +
    /* '<div class="comment-sort">\n' +
     '    <select name="comment_sort_order" id="comment_sort_order" class="comment-sort-order">\n' +
     '        <option value="oldest_first">Oudste eerst</option>\n' +
     '        <option value="newest_first">Nieuwste eerst</option>\n' +
     '        <option value="topkudos_first" selected="">Meeste kudos</option>\n' +
     '    </select>\n' +
     '</div>' +*/
    '<div id="reaguursel-area"></div>' +
    '</section>\n');

GetAPI(item_id).done(function(data) {
    if (data.status == 'success') {
        console.log('succes');
        var add = [];
        var requursels = sortJSON(data.data.comments, 'kudos_count', '321');
        $.each(requursels, function() {
            add.push(load_reaguursel(this));
        });
        $("#reaguursel-area").append(add.join(""));
    } else {
        console.log(data);
    }
})