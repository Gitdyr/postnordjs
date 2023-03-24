/**
 * (c) Kjeld Borch Egevang
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Sender extends Page {
    HandlePost() {
        super.HandlePost();
        if (this.post.size) {
            this.info = 'Afsender gemt';
        }
    }

    Contents(body, title = '') {
        let div = super.Contents(body, 'Afsender');
        this.InputField(div, 'Firma', 'sender_company');
        this.InputField(div, 'Navn', 'sender_name');
        this.InputField(div, 'Adresse', 'sender_address');
        this.InputField(div, 'Postnummer', 'sender_postcode');
        this.InputField(div, 'By', 'sender_city');
        this.InputField(div, 'Landekode (f.eks. DK)', 'sender_country');
        this.InputField(div, 'E-mail-adresse', 'sender_email');
        this.InputField(div, 'Telefonnummer', 'sender_phone');
        this.SubmitButton(div);
    }
}

window.sender = new Sender();
