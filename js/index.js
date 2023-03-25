/**
 * (c) Kjeld Borch Egevang
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Index extends Page {
    Contents(body, title = '') {
        let div = super.Contents(body, 'PostNord pakkeforsendelse');
        let url = 'https://developer.postnord.com/';
        div.P(`Her kan du oprette pakker til forsendelse med PostNord.
            Du skal være erhvervskunde hos PostNord.`);
        div.P(`For at kunne sende pakker, skal du bruge en API-nøgle
            og et produktionskundenummer.
            Du kan oprette en API-nøgle på <a href='${url}'>${url}</a>.
            Produktionskundenummeret findes i dit kontrolpanel hos PostNord
            i træet med indstillinger.`);
        div.P(`
            Diverse indstillinger og midlertidig data,
            gemmes lokalt i din browser.`);
        url = 'https://github.com/Gitdyr/postnordjs';
        div.P(`
            Du kan downloade og installere koden fra GitHub:
            <a href='${url}'>${url}</a>.`);
        div.style('max-width: 50em');
    }
}

window.index = new Index();
