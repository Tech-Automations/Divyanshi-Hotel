function checkAlphabet(e) {
    var key = window.event ? e.keyCode : e.which;
    var keychar = String.fromCharCode(key);
    var el = document.getElementById('test');
    var msg = document.getElementById('msg');
    reg = /\d/;
    var result = reg.test(keychar);
    if (!result) {
        return true;
    } else {
        return false;
    }
}

// Only for Number Allow
function checkNumber(e) {
    var key = window.event ? e.keyCode : e.which;
    var keychar = String.fromCharCode(key);
    var el = document.getElementById('test');
    var msg = document.getElementById('msg');
    reg = /\d/; var result = reg.test(keychar);
    if (!result) {
        return false;
    }
    else {
        return true;
    }
}

// Onlye Alphabest Allow
function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)|| (charCode==32))
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}



function checkAlphabetDOTS(e,t) {
    var key = window.event ? e.keyCode : e.which;
    var keychar = String.fromCharCode(key);
    var el = document.getElementById('test');
    var msg = document.getElementById('msg');
    reg = /^([\s.]?[a-zA-Z]+)+$/;
    var result = reg.test(keychar);
    if (!result) {
        return true;
    } else {
        return false;
    }
}

//function validate Emailid.

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}


//////////////////////////////


function UpdateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}


////////////////////


function extract(maybeUrl) {
    return maybeUrl.split('?')[1] || '';
};

function parse(str) {
    if (typeof str !== 'string') {
        return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
        return {};
    }

    return str.split('&').reduce(function (ret, param) {
        var parts = param.replace(/\+/g, ' ').split('=');
        var key = parts[0];
        var val = parts[1];

        key = decodeURIComponent(key);
        // missing `=` should be `null`:
        val = val === undefined ? null : decodeURIComponent(val);

        if (!ret.hasOwnProperty(key)) {
            ret[key] = val;
        } else if (Array.isArray(ret[key])) {
            ret[key].push(val);
        } else {
            ret[key] = [ret[key], val];
        }

        return ret;
    }, {});
};

function stringify(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];

        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
};


///////////////////////////////////////////////////