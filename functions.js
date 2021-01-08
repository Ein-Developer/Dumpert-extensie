var topreaguursel_kudos = 249;
var topreaguursel		= false;

function GetAPI(item) {
    let link = "https://comments.dumpert.nl/api/v1.1/articles/" + item + "/comments/";
    let data = $.getJSON(link);
    return data;
}

function datetime(ISOtime) {
    var ISOtime = new Date(ISOtime);
    var jaar = ISOtime.getFullYear();
    var maand = ISOtime.getMonth()+1;
    var dag = ISOtime.getDate();
    var uur = ISOtime.getHours();
    var minuut =  ISOtime.getMinutes();

    if (minuut < 10) {
        minuut = '0' + minuut;
    }
    if (uur < 10) {
        uur = '0' + uur;
    }
    if (dag < 10) {
        dag = '0' + dag;
    }
    if (maand < 10) {
        maand = '0' + maand;
    }

    var answer = {
        date: dag + '-' + maand + '-' + jaar,
        time: uur + ':' + minuut
    }
    return answer;
}

function length(obj) {
    return Object.keys(obj).length;
}

function sortJSON(arr, key, way) {
    return arr.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function load_reaguursel (data) {
    var date = datetime(data.creation_datetime);
    var aantalantwoorden = length(data.child_comments);

    if (topreaguursel === false && Number(data.kudos_count) > topreaguursel_kudos) {
        topreaguursel = true;
        var reaguursel_class = 'topcomment';
        var reaguursel_topcomment = '1';
    } else {
        var reaguursel_class = '';
        var reaguursel_topcomment = '0';
    }

    var reaguursel = '' +
        '<article class="comment '+ reaguursel_class +'" id="c' + data.id + '" data-commentid="' + data.id + '" data-kudos="'+ data.kudos_count +'" data-topcomment="' + reaguursel_topcomment + '">' +
        '<div class="anchor-pos" id="cid_' + data.id + '"></div>' +
        data.html_markup +
        '<footer>\n' +
        '<span class="username">'+ data.author_username +'</span>\n' +
        ' | <span class="datetime">'+ date.date +' | '+ date.time +'</span>\n' +
        '<span class="divider">|</span>\n' +
        '<a class="comment-count">'+ aantalantwoorden +'</a>\n' +
        ' | <a href="javascript:alert(\'Commentkudos uitgeschakeld.\')" class="commentkudo plus inactive" title="reacties en commentkudos uitgeschakeld">+</a>\n' +
        '<span class="commentkudocount">'+ data.kudos_count +'</span>\n' +
        '<a href="javascript:alert(\'Commentkudos uitgeschakeld.\')" class="commentkudo min inactive" title="reacties en commentkudos uitgeschakeld">-</a>\n' +
        //'<a class="reportcomment" title="Deze reactie is in overtreding met de huisregels."></a>\n' +
        '</footer>\n' +
        '</article>';

    if (aantalantwoorden > 0) {
        var tag1 = '<div class="subcomments" id="subcomments">';
        var tag2 = '</div>';
        var subguursels = '';

        $.each(data.child_comments, function() {
            subguursels = subguursels + subguursel(this);
        });

        reaguursel = reaguursel + tag1 + subguursels + tag2;
    }

    return reaguursel;
}

function subguursel (data) {
    var date = datetime(data.creation_datetime);

    var reaguursel = '' +
        '<article class="comment" id="c' + data.id + '" data-commentid="' + data.id + '" data-kudos="'+ data.kudos_count +'" data-topcomment="0">' +
        '<div class="anchor-pos" id="cid_' + data.id + '"></div>' +
        data.html_markup +
        '<footer>\n' +
        '<span class="username">'+ data.author_username +'</span>\n' +
        ' | <span class="datetime">'+ date.date +' | '+ date.time +'</span>\n' +
        ' | <a href="javascript:alert(\'Commentkudos uitgeschakeld.\')" class="commentkudo plus inactive" title="reacties en commentkudos uitgeschakeld">+</a>\n' +
        '<span class="commentkudocount">'+ data.kudos_count +'</span>\n' +
        '<a href="javascript:alert(\'Commentkudos uitgeschakeld.\')" class="commentkudo min inactive" title="reacties en commentkudos uitgeschakeld">-</a>\n' +
        //'<a class="reportcomment" title="Deze reactie is in overtreding met de huisregels."></a>\n' +
        '</footer>\n' +
        '</article>';

    return reaguursel;
}