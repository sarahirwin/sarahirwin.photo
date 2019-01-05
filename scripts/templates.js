/**
 * Created by daniel.irwin on 2/19/17.
 */

function getDeepProperty(entity, accessor){
    if(!entity || !accessor){
        return undefined;
    }
    var arr = (accessor && accessor.constructor === Array) ? accessor : accessor.split('.');
    while(arr.length && (entity = entity[arr.shift()]));
    return entity;
}

function escapeHtml(html) {
    return html.replace(/[\"&<>]/g, function (a) {
        return { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' }[a];
    });
}

function interpolateTemplate(template, entity) {
    return template.replace(/{{([^{}]*)}}/g, function (templateMatch, compoundKey) {
        try {
            return escapeHtml(getDeepProperty(entity, compoundKey).toString());
        }
        catch(e){
            return '';
        }
    });
}


function loadFile(file, json, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var schema = this.responseText;
        if (this.readyState == 4 && this.status == 200) {
            if(json) {
                schema = JSON.parse(this.responseText);
            }
            callback(schema);
        }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
}

function runTemplate(opts, callback){
    loadFile('data/' + opts.dataFile, true, function(data){
        loadFile('templates/' + opts.templateFile, false, function(template){
            var repeat = /((.|\n)*)<repeat>((.|\n)*)<\/repeat>((.|\n)*)/m;

            if(Array.isArray(data) && repeat.exec(template)){
                var matches = template.split(/<.*repeat>/);

                var result = '';
                data.forEach(function(element){
                    result = result + interpolateTemplate(matches[1], element)
                });

                callback(matches[0] + result + matches[2]);
            }
            else {
                callback(interpolateTemplate(template, data));
            }

        });
    });
}