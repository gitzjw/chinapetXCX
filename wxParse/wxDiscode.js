
function strcharacterDiscode(str){
    // 加入常用解析
    str = str.replace(/&nbsp;/g, ' ');
    str = str.replace(/&quot;/g, "'");
    str = str.replace(/&amp;/g, '&');
    // str = str.replace(/&lt;/g, '‹');
    // str = str.replace(/&gt;/g, '›');

    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');

    return str;
}

// HTML 支持的其他实体
function strOtherDiscode(str){
    str = str.replace(/&OElig;/g, 'Œ');
    str = str.replace(/&oelig;/g, 'œ');
    str = str.replace(/&Scaron;/g, 'Š');
    str = str.replace(/&scaron;/g, 'š');
    str = str.replace(/&Yuml;/g, 'Ÿ');
    str = str.replace(/&fnof;/g, 'ƒ');
    str = str.replace(/&circ;/g, 'ˆ');
    str = str.replace(/&tilde;/g, '˜');
    str = str.replace(/&ensp;/g, '');
    str = str.replace(/&emsp;/g, '');
    str = str.replace(/&thinsp;/g, '');
    str = str.replace(/&zwnj;/g, '');
    str = str.replace(/&zwj;/g, '');
    str = str.replace(/&lrm;/g, '');
    str = str.replace(/&rlm;/g, '');
    str = str.replace(/&ndash;/g, '–');
    str = str.replace(/&mdash;/g, '—');
    str = str.replace(/&lsquo;/g, '‘');
    str = str.replace(/&rsquo;/g, '’');
    str = str.replace(/&sbquo;/g, '‚');
    str = str.replace(/&ldquo;/g, '“');
    str = str.replace(/&rdquo;/g, '”');
    str = str.replace(/&bdquo;/g, '„');
    str = str.replace(/&dagger;/g, '†');
    str = str.replace(/&Dagger;/g, '‡');
    str = str.replace(/&bull;/g, '•');
    str = str.replace(/&hellip;/g, '…');
    str = str.replace(/&permil;/g, '‰');
    str = str.replace(/&prime;/g, '′');
    str = str.replace(/&Prime;/g, '″');
    str = str.replace(/&lsaquo;/g, '‹');
    str = str.replace(/&rsaquo;/g, '›');
    str = str.replace(/&oline;/g, '‾');
    str = str.replace(/&euro;/g, '€');
    str = str.replace(/&trade;/g, '™');
    str = str.replace(/&larr;/g, '←');
    str = str.replace(/&uarr;/g, '↑');
    str = str.replace(/&rarr;/g, '→');
    str = str.replace(/&darr;/g, '↓');
    str = str.replace(/&harr;/g, '↔');
    str = str.replace(/&crarr;/g, '↵');
    str = str.replace(/&lceil;/g, '⌈');
    str = str.replace(/&rceil;/g, '⌉');
    str = str.replace(/&lfloor;/g, '⌊');
    str = str.replace(/&rfloor;/g, '⌋');
    str = str.replace(/&loz;/g, '◊');
    str = str.replace(/&spades;/g, '♠');
    str = str.replace(/&clubs;/g, '♣');
    str = str.replace(/&hearts;/g, '♥');
    str = str.replace(/&diams;/g, '♦');
    return str;
}

function strMoreDiscode(str){
    str = str.replace(/\r\n/g,"");  
    str = str.replace(/\n/g,"");
    str = str.replace(/code/g,"wxxxcode-style");
    return str;
}

function strDiscode(str){
    str = strcharacterDiscode(str);
    str = strOtherDiscode(str);
    str = strMoreDiscode(str);
    return str;
}
function urlToHttpUrl(url,rep){
        var patt1 = new RegExp("^//");
    var result = patt1.test(url);
    if(result){
        url = rep+":"+url;
    }
    return  url;
}

module.exports = {
    strDiscode:strDiscode,
    urlToHttpUrl:urlToHttpUrl
}