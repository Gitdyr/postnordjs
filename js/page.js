/**
 * (c) Kjeld Borch Egevang
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Page {
    debug = false;
    error = false;
    info = false;
    saved_info = false;
    detail = false;
    charge_count = 5;
    post = new Map();
    countries = [
        ["Afghanistan", "AF"],
        ["Albanien", "AL"],
        ["Algeriet", "DZ"],
        ["Amerikansk Samoa", "AS"],
        ["Amerikanske Jomfruøer", "VI"],
        ["Andorra", "AD"],
        ["Angola", "AO"],
        ["Anguilla", "AI"],
        ["Antarktis", "AQ"],
        ["Antigua og Barbuda", "AG"],
        ["Argentina", "AR"],
        ["Armenien", "AM"],
        ["Aruba", "AW"],
        ["Aserbajdsjan", "AZ"],
        ["Australien", "AU"],
        ["Bahamas", "BS"],
        ["Bahrain", "BH"],
        ["Bangladesh", "BD"],
        ["Barbados", "BB"],
        ["Belarus", "BY"],
        ["Belgien", "BE"],
        ["Belize", "BZ"],
        ["Benin", "BJ"],
        ["Bermuda", "BM"],
        ["Bhutan", "BT"],
        ["Bolivia", "BO"],
        ["Bonaire, Skt. Eustatius og Saba", "BQ"],
        ["Bosnien-Hercegovina", "BA"],
        ["Botswana", "BW"],
        ["Bouvetøen", "BV"],
        ["Brasilien", "BR"],
        ["Britisk territorium i det Indiske Ocean", "IO"],
        ["Britiske Jomfruøer", "VG"],
        ["Brunei", "BN"],
        ["Bulgarien", "BG"],
        ["Burkina Faso", "BF"],
        ["Burundi", "BI"],
        ["Cambodja", "KH"],
        ["Cameroun", "CM"],
        ["Canada", "CA"],
        ["Caymanøerne", "KY"],
        ["Centralafrikanske Republik", "CF"],
        ["Chile", "CL"],
        ["Cocosøerne", "CC"],
        ["Colombia", "CO"],
        ["Comorerne", "KM"],
        ["Congo, Demokratiske Republik", "CD"],
        ["Congo, Republikken", "CG"],
        ["Cookøerne", "CK"],
        ["Costa Rica", "CR"],
        ["Cuba", "CU"],
        ["Curacao", "CW"],
        ["Cypern", "CY"],
        ["Danmark", "DK"],
        ["Djibouti", "DJ"],
        ["Dominica", "DM"],
        ["Dominikanske Republik", "DO"],
        ["Ecuador", "EC"],
        ["Egypten", "EG"],
        ["El Salvador", "SV"],
        ["Elfenbenskysten", "CI"],
        ["Eritrea", "ER"],
        ["Estland", "EE"],
        ["Eswatini", "SZ"],
        ["Etiopien", "ET"],
        ["Falklandsøerne", "FK"],
        ["Fiji", "FJ"],
        ["Filippinerne", "PH"],
        ["Finland", "FI"],
        ["Forenede Arabiske Emirater", "AE"],
        ["Frankrig", "FR"],
        ["Fransk Guyana", "GF"],
        ["Fransk Polynesien", "PF"],
        ["Franske Sydlige og Antarktiske Territorier", "TF"],
        ["Færøerne", "FO"],
        ["Gabon", "GA"],
        ["Gambia", "GM"],
        ["Georgien", "GE"],
        ["Ghana", "GH"],
        ["Gibraltar", "GI"],
        ["Grenada", "GD"],
        ["Grækenland", "GR"],
        ["Grønland", "GL"],
        ["Guadeloupe", "GP"],
        ["Guam", "GU"],
        ["Guatemala", "GT"],
        ["Guernsey", "GG"],
        ["Guinea", "GN"],
        ["Guinea-Bissau", "GW"],
        ["Guyana", "GY"],
        ["Haiti", "HT"],
        ["Heard- og McDonaldøerne", "HM"],
        ["Honduras", "HN"],
        ["Hongkong", "HK"],
        ["Indien", "IN"],
        ["Indonesien", "ID"],
        ["Irak", "IQ"],
        ["Iran", "IR"],
        ["Irland", "IE"],
        ["Island", "IS"],
        ["Isle of Man", "IM"],
        ["Israel", "IL"],
        ["Italien", "IT"],
        ["Jamaica", "JM"],
        ["Japan", "JP"],
        ["Jersey", "JE"],
        ["Jordan", "JO"],
        ["Juleøen", "CX"],
        ["Kap Verde", "CV"],
        ["Kasakhstan", "KZ"],
        ["Kenya", "KE"],
        ["Kina", "CN"],
        ["Kirgisistan", "KG"],
        ["Kiribati", "KI"],
        ["Kroatien", "HR"],
        ["Kuwait", "KW"],
        ["Laos", "LA"],
        ["Lesotho", "LS"],
        ["Letland", "LV"],
        ["Libanon", "LB"],
        ["Liberia", "LR"],
        ["Libyen", "LY"],
        ["Liechtenstein", "LI"],
        ["Litauen", "LT"],
        ["Luxembourg", "LU"],
        ["Macao", "MO"],
        ["Madagaskar", "MG"],
        ["Malawi", "MW"],
        ["Malaysia", "MY"],
        ["Maldiverne", "MV"],
        ["Mali", "ML"],
        ["Malta", "MT"],
        ["Marokko", "MA"],
        ["Marshalløerne", "MH"],
        ["Martinique", "MQ"],
        ["Mauretanien", "MR"],
        ["Mauritius", "MU"],
        ["Mayotte", "YT"],
        ["Mexico", "MX"],
        ["Mikronesien", "FM"],
        ["Moldova", "MD"],
        ["Monaco", "MC"],
        ["Mongoliet", "MN"],
        ["Montenegro", "ME"],
        ["Montserrat", "MS"],
        ["Mozambique", "MZ"],
        ["Myanmar", "MM"],
        ["Namibia", "NA"],
        ["Nauru", "NR"],
        ["Nederlandene", "NL"],
        ["Nepal", "NP"],
        ["New Zealand", "NZ"],
        ["Nicaragua", "NI"],
        ["Niger", "NE"],
        ["Nigeria", "NG"],
        ["Niue", "NU"],
        ["Nordkorea", "KP"],
        ["Nordmakedonien", "MK"],
        ["Nordmarianerne", "MP"],
        ["Norfolkøen", "NF"],
        ["Norge", "NO"],
        ["Ny Kaledonien", "NC"],
        ["Oman", "OM"],
        ["Pakistan", "PK"],
        ["Palau", "PW"],
        ["Palæstina", "PS"],
        ["Panama", "PA"],
        ["Papua Ny Guinea", "PG"],
        ["Paraguay", "PY"],
        ["Peru", "PE"],
        ["Pitcairn", "PN"],
        ["Polen", "PL"],
        ["Portugal", "PT"],
        ["Puerto Rico", "PR"],
        ["Qatar", "QA"],
        ["Reunion", "RE"],
        ["Rumænien", "RO"],
        ["Rusland", "RU"],
        ["Rwanda", "RW"],
        ["Salomonøerne", "SB"],
        ["Samoa", "WS"],
        ["San Marino", "SM"],
        ["Sao Tome og Principe", "ST"],
        ["Saudi-Arabien", "SA"],
        ["Schweiz", "CH"],
        ["Senegal", "SN"],
        ["Serbien", "RS"],
        ["Seychellerne", "SC"],
        ["Sierra Leone", "SL"],
        ["Singapore", "SG"],
        ["Skt. Barthelemy", "BL"],
        ["Skt. Helena", "SH"],
        ["Skt. Kitts og Nevis", "KN"],
        ["Skt. Lucia", "LC"],
        ["Skt. Martin (NL)", "SX"],
        ["Skt. Pierre og Miquelon", "PM"],
        ["Skt. Vincent og Grenadinerne", "VC"],
        ["Slovakiet", "SK"],
        ["Slovenien", "SI"],
        ["Somalia", "SO"],
        ["Spanien", "ES"],
        ["Sri Lanka", "LK"],
        ["St. Martin (FR)", "MF"],
        ["Storbritannien", "GB"],
        ["Sudan", "SD"],
        ["Surinam", "SR"],
        ["Svalbard og Jan Mayen", "SJ"],
        ["Sverige", "SE"],
        ["Sydafrika", "ZA"],
        ["Sydgeorgien og Sydsandwichøerne", "GS"],
        ["Sydkorea", "KR"],
        ["Sydsudan", "SS"],
        ["Syrien", "SY"],
        ["Tadsjikistan", "TJ"],
        ["Taiwan", "TW"],
        ["Tanzania", "TZ"],
        ["Tchad", "TD"],
        ["Thailand", "TH"],
        ["Tjekkiet", "CZ"],
        ["Togo", "TG"],
        ["Tokelau", "TK"],
        ["Tonga", "TO"],
        ["Trinidad og Tobago", "TT"],
        ["Tunesien", "TN"],
        ["Turkmenistan", "TM"],
        ["Turks- og Caicosøerne", "TC"],
        ["Tuvalu", "TV"],
        ["Tyrkiet", "TR"],
        ["Tyskland", "DE"],
        ["Uganda", "UG"],
        ["Ukraine", "UA"],
        ["Ungarn", "HU"],
        ["Uruguay", "UY"],
        ["USA", "US"],
        ["USA's mindre øbesiddelser", "UM"],
        ["Usbekistan", "UZ"],
        ["Vanuatu", "VU"],
        ["Vatikanstaten", "VA"],
        ["Venezuela", "VE"],
        ["Vestsahara", "EH"],
        ["Vietnam", "VN"],
        ["Wallis og Futuna", "WF"],
        ["Yemen", "YE"],
        ["Zambia", "ZM"],
        ["Zimbabwe", "ZW"],
        ["Ækvatorialguinea", "GQ"],
        ["Østrig", "AT"],
        ["Østtimor", "TL"],
        ["Ålandsøerne", "AX"]
    ];

    constructor() {
        let page = this.GetPage();
        if (page == this.constructor.name.toLowerCase()) {
            window.onload = () => this.Display();
        }
    }

    SetChargeCount() {
        let i;
        let metering_point_id = this.GetStorage('metering_point_id', '');
        for (i = 0; i < 100; i++) {
            let j = metering_point_id + '_' + i;
            if (!this.GetStorage('d_charge_' + j)) {
                break;
            }
        }
        if (this.charge_count == i + 1) {
            this.charge_count_changed = false;
        } else {
            this.charge_count = i + 1;
            this.charge_count_changed = true;
        }
    }

    GetPage() {
        let params = new URLSearchParams(location.search);
        let prefix;
        let page = params.get('page');
        if (page) {
            if (page.split('_').length > 1) {
                page = 'meter';
            }
        } else {
            page = 'index';
        }
        return page;
    }

    Item(ul, name, href = null, page = null) {
        let dropdown = ul.Attributes()['class'].includes('dropdown-menu');
        if (href == null) {
            href = name.toLowerCase();
        }
        href += '.html';
        if (page) {
            href += '?page=' + page;
        }
        let li = ul.Li();
        if (!dropdown) {
            li.class('nav-item');
        }
        let a = li.A(name);
        if (dropdown) {
            a.class('dropdown-item');
        } else {
            a.class('nav-link');
        }
        a.href(href);
        window[page].href = href;
        let parms = new URLSearchParams(location.search);
        if (page == parms.get('page')) {
            a.class('active');
        }
        return li;
    }

    Dropdown(ul, name) {
        let li = ul.Li();
        li.class('nav-item dropdown');
        let a = li.A(name);
        a.class('nav-link dropdown-toggle');
        a.href('#');
        a.role('button');
        a['data-bs-toggle']('dropdown');
        a['aria-expanded']('false');
        ul = li.Ul();
        ul.class('dropdown-menu');
        return ul;
    }

    SetStorage(key, val) {
        this.storage.set(key, val);
    }

    SaveStorage() {
        let storage = Object.fromEntries(this.storage);
        try {
            localStorage.setItem('postnord', JSON.stringify(storage));
        } catch (e) {
            console.log('Too much');
        }
    }

    RestoreStage() {
        let storage = localStorage.getItem('postnord');
        if (this.copy_storage) {
            this.storage = this.copy_storage;
        } else {
            if (storage) {
                storage = JSON.parse(localStorage.getItem('postnord'));
                this.storage = new Map(Object.entries(storage));
            } else {
                this.storage = new Map();
            }
        }
    }

    GetStorage(name, def = '') {
        let val = this.storage.get(name);
        if (!val) {
            val = def;
        }
        return val;
    }

    HandlePost() {
        if (this.post.size) {
            if (this.GetValue('debug')) {
                this.debug = true;
            }
            for (const [key, val] of this.post) {
                this.SetStorage(key, val);
            }
            this.SaveStorage();
        }
    }

    GetValue(name, def = '') {
        let params = new URLSearchParams(location.search);
        let val = params.get(name);
        if (!val) {
            val = def;
        }
        return val;
    }

    InputField(div, title, name = null, text = null) {
        if (name == null) {
            name = title.toLowerCase();
        }
        div = div.Div();
        div.class('row mb-3');
        let label = div.Label(title);
        label.class('col-sm-4 col-form-label');
        label.class('text-right');
        let idiv = div.Div();
        idiv.class('col-sm-8');
        let input = idiv.Input();
        input.class('form-control');
        input.name(name);
        input.type('text');
        input.size('40');
        input.value(this.GetStorage(name));
        if (text) {
            idiv.Div(text).class('form-text');
        }
        return input;
    }

    InputSelect(div, name, options, title = null, text = null) {
        if (name == null) {
            name = title.toLowerCase();
        }
        div = div.Div();
        div.class('row mb-3');
        if (title) {
            let label = div.Label(title);
            label.class('col-sm-4 col-form-label');
            label.class('text-right');
        }
        let idiv = div.Div();
        if (title) {
            idiv.class('col-sm-6');
        } else {
            idiv.class('col-sm-7 mx-auto');
        }
        let select = idiv.Select();
        select.class('form-select');
        select.name(name);
        for (let option of options) {
            let key;
            let value;
            if (Array.isArray(option)) {
                [key, value] = option;
            } else {
                key = value = option;
            }
            option = select.Option(key);
            option.value(value);
            if (value == this.GetStorage(name)) {
                option.selected('true');
            }
        }
        if (text) {
            idiv.Div(text).class('form-text');
        }
        return select;
    }

    InputSelectCell(tr, name, options) {
        let td = tr.Td();
        let select = td.Select();
        select.class('form-select');
        select.name(name);
        for (let option of options) {
            let key;
            let value;
            if (Array.isArray(option)) {
                [key, value] = option;
            } else {
                key = value = option;
            }
            option = select.Option(key);
            option.value(value);
            if (value == this.GetStorage(name)) {
                option.selected('true');
            }
        }
        return select;
    }

    InputCell(tr, name, text = null) {
        let td = tr.Td();
        let input = td.Input();
        input.class('form-control');
        input.name(name);
        input.type('text');
        input.value(this.GetStorage(name));
        input.size('10');
        if (text) {
            td.Div(text).class('form-text');
        }
        return td;
    }

    CheckBox(div, name, text = null) {
        div = div.Div();
        div.class('form-check');
        let checkbox = div.Input();
        checkbox.type('checkbox');
        if (this.GetStorage(name)) {
            checkbox.checked('checked');
        }
        checkbox.name(name);
        checkbox.id(name);
        checkbox.class('form-check-input');
        if (text) {
            let label = div.Label(text);
            label.for(name);
            label.class('form-check-label');
        }
        return checkbox;
    }

    SubmitButton(div, text = 'Gem') {
        let button = div.Button(text);
        button.type('submit');
        button.class('btn btn-primary float-end');
        return button;
    }

    Navigation(body) {
        let header = body.Header();
        let nav = header.Nav();
        nav.class('navbar navbar-expand-sm navbar-dark bg-dark');
        let div = nav.Div();
        div.class('container-fluid');
        let a = div.A('PostNord');
        a.class('navbar-brand nav-link');
        a.href('index.html');
        let ul = div.Ul();
        ul.class('navbar-nav me-auto');

        this.Item(ul, 'Modtager', 'index', 'receiver');
        this.Item(ul, 'Afsender', 'index', 'sender');
        this.Item(ul, 'Arkiv', 'index', 'archive');

        ul = div.Ul();
        ul.class('navbar-nav');
        this.Item(ul, 'Indstillinger', 'index', 'settings');
    }

    Alert(body) {
        if (this.error) {
            let div = body.Div();
            div.class('card mx-auto alert alert-danger w-50');
            div = div.Div();
            div.class('card-body');
            div.Div(this.error);
        } else if (this.info) {
            let div = body.Div();
            div.class('card mx-auto alert alert-success w-50');
            div = div.Div();
            div.class('card-body');
            div.Div(this.info);
        }
        if (this.detail) {
            let div = body.Div();
            div.class('card mx-auto alert alert-warning w-50');
            div = div.Div();
            div.class('card-body');
            div.Div(this.detail);
        }
    }

    Result(body) {
        if (!empty(this.response)) {
            let div = body.Div();
            div.class('card ms-2 me-2');
            div = div.Div();
            div.class('card-body');
            div.H5('Results').class('card-title');
            let table = div.Table();
            table.class('table');
            let tr = table.Tr();
            tr.Th('index');
            for (field of this.fields) {
                tr.Th(field);
            }
            for (const [key, row] of Object.entries(this.response)) {
                let tr = table.Tr();
                tr.Td(key);
                for (field of this.fields) {
                    let val = row[field];
                    if (is_array(val)) {
                        val = sprintf('[%s]', implode(', ', val));
                    }
                    val = val.replaceAll('\n', '<br>');
                    tr.Td(val);
                }
            }
        }
    }

    Contents(body, title = '') {
        let form = body.Form();
        form.method('post');
        let div = form.Div();
        div.class('card mx-3 mx-auto');
        div.style('width: fit-content');
        div = div.Div();
        div.class('card-body bg-light');
        div.H1(title).class('text-center');
        for (const name of ['error', 'info']) {
            let input = div.Input();
            input.type('hidden');
            input.name(name);
            input.value(this[name]);
        }
        return div;
    }

    Body() {
        let body = this.html.Body();
        this.Navigation(body);
        this.Alert(body);
        this.Contents(body);
    }

    SavePost(obj = this) {
        let inputs = document.querySelectorAll('input,select'); 
        for (let input of inputs) {
            if (input.type == 'checkbox' && !input.checked) {
                obj.post.set(input.name, '');
            } else {
                obj.post.set(input.name, input.value);
            }
        }
    }

    Submit(e, obj) {
        this.SavePost(obj);
        obj.Display();
        e.preventDefault();
    }

    ItemSelected(e, obj) {
        e.preventDefault();
        history.replaceState({}, null, e.target.href);
        let page = this.GetPage();
        window[page].Display();
    }

    Display() {
        this.RestoreStage();
        this.SetChargeCount();
        this.HandlePost();
        this.html = new HtmlNode();
        this.Body();
        this.html.Display();
        document.forms[0].addEventListener('submit', (e) => this.Submit(e, this));
        let items = document.getElementsByTagName('a'); 
        for (let item of items) {
            if (!item.classList.contains('dropdown-toggle')) {
                if (item.classList.contains('dropdown-item') ||
                    item.classList.contains('nav-link'))
                {
                    item.onclick = (e) => this.ItemSelected(e, this);
                }
            }
        }
        if (this.post.size && this.charge_count_changed) {
            let tables = document.getElementsByClassName('charges'); 
            if (tables) {
                let tr = tables[0].firstChild.lastChild;
                let input = tr.firstChild.firstChild;
                input.focus();
            }
        }
        this.saved_info = this.info;
        this.post = new Map();
        this.error = false;
        this.info = false;
        this.detail = false;
    }

    Dump(data) {
        for (const [key, val] of Object.entries(data)) {
            console.log(key + ' => ' + val);
        }
    }

    Sum(data) {
        return data.reduce((s, a) => s + parseFloat(a), 0);
    }

    DoAjax(url, data = [], load, progress = null) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhttp.open('POST', url, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        let obj = this;
        xhttp.onload = function() {
            let response;
            if (this.responseText) {
                response = JSON.parse(this.responseText);
            } else {
                response = '';
                console.log(this);
            }
            load(response, obj);
        }
        if (progress) {
            xhttp.onprogress = function(e) {
                progress(e, obj, this);
            }
        }
        xhttp.send(JSON.stringify(data));
    }

    Get(url, load) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhttp.open('GET', url, true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        let obj = this;
        xhttp.onload = function() {
            let response;
            if (this.responseText) {
                response = JSON.parse(this.responseText);
            } else {
                response = '';
                console.log(this);
            }
            load(response, obj);
        }
        xhttp.send();
    }

    Number(val) {
        val = round(val * 100);
        return sprintf('%d,%02d', intdiv(val, 100), val % 100);
    }
}
