/**
 * (c) Kjeld Borch Egevang
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Settings extends Page {
    HandlePost() {
        super.HandlePost();
        if (this.post.size) {
            this.info = 'Indstillinger opdateret';
        }
    }

    Contents(body, title = '') {
        let div = super.Contents(body, 'Indstillinger');
        this.InputField(div, 'API-nøgle', 'api_key');
        this.InputField(div, 'Produktions&shy;kundenummer', 'customer_number');
        this.InputSelect(
            div,
            'label_size',
            [['Label', 'LABEL'], ['A4', 'A4']],
            'Labeltype'
        );
        /*
        this.InputSelect(
            div,
            'label_format',
            [['PDF', 'pdf'], ['ZPL', 'zpl']],
            'Udskrivningsformat'
        );
        */
        this.SetStorage('label_format', 'pdf');
        this.CheckBox(div, 'test_server', 'Benyt testserver hos PostNord');
        this.CheckBox(div, 'test_label', 'Generer testlabels');
        this.SubmitButton(div);
    }
}

window.settings = new Settings();
