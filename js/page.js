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
            idiv.class('col-sm-3');
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
