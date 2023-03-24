/**
 * (c) Kjeld Borch Egevang
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Archive extends Page {
    count = 10;
    increment = 10;

    GetName(post, field) {
        let names = [];
        let keys = ['company', 'name'];
        for (let key of keys) {
            if (post[field + '_' + key]) {
                names.push(post[field + '_' + key]);
            }
        }
        return names.join('<br>');
    }

    ShowLabel(date) {
        let archive = this.GetStorage('archive', {});
        let pdf = archive[date].pdf;
        let bytes = atob(pdf);
        let byteNumbers = new Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) {
          byteNumbers[i] = bytes.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        let file = new Blob([byteArray], { type: 'application/pdf;base64' });
        let fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    }

    CopyReceiver(date) {
        let archive = this.GetStorage('archive', {});
        let post = JSON.parse(archive[date].post);
        for (const key of Object.keys(post)) {
            this.SetStorage(key, post[key]);
        }
        history.replaceState({}, null, window.receiver.href);
        window.receiver.copy_storage = this.storage;
        window.receiver.Display();
        window.receiver.copy_storage = null;
    }

    CopySender(date) {
        let archive = this.GetStorage('archive', {});
        let post = JSON.parse(archive[date].post);
        for (const key of Object.keys(post)) {
            this.SetStorage(key, post[key]);
        }
        history.replaceState({}, null, window.sender.href);
        window.sender.copy_storage = this.storage;
        window.sender.Display();
        window.sender.copy_storage = null;
    }

    More() {
        this.count += this.increment;
        this.Display();
    }

    Contents(body, title = '') {
        let div = super.Contents(body, 'Arkiv');
        let table = div.Table();
        let tr;
        let th;
        let td;
        let img;
        tr = table.Tr();
        th = tr.Th('Tidspunkt');
        th = tr.Th('Modtager');
        th = tr.Th('Afsender');
        th = tr.Th('Label');
        let archive = this.GetStorage('archive', {});
        let count = 10;
        for (let date of Object.keys(archive).reverse().slice(0, this.count)) {
            let post = JSON.parse(archive[date].post);
            let pdf = archive[date].pdf;
            tr = table.Tr();
            tr.Td(date)
            td = tr.Td(this.GetName(post, 'receiver'));
            img = td.Img();
            img.src('img/save.svg');
            img.class('cp');
            img.onclick("window.archive.CopyReceiver".concat("('", date, "')"));
            td = tr.Td(this.GetName(post, 'sender'));
            img = td.Img();
            img.src('img/save.svg');
            img.class('cp');
            img.onclick("window.archive.CopySender".concat("('", date, "')"));
            let a = tr.Td().A(post['pkg_no']);
            a.href('#');
            a.onclick("window.archive.ShowLabel".concat("('", date, "')"));
        }
        div.Br();
        if (Object.keys(archive).length > this.count) {
            let button = div.Button('Flere');
            button.class('btn btn-secondary float-end');
            button.type('button');
            button.onclick('window.archive.More()');
        }
    }
}

window.archive = new Archive();
