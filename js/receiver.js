/**
 * (c) Kjeld Borch Egevang
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Receiver extends Page {
    cache = {};
    delivery_parties = {};
    max_archive = 50;
    parcel_shop = ['-- Med omdeling --', 'pdk_1'];

    HandlePost() {
        super.HandlePost();
        if (this.post.size) {
            this.info = 'Modtager gemt';
        }
    }

    SetShopEntries(rows, obj) {
        let parcel_shops = [obj.parcel_shop];
        if (!rows.faults &&
            rows.servicePointInformationResponse &&
            rows.servicePointInformationResponse.servicePoints
        ) {
            rows = rows.servicePointInformationResponse.servicePoints;
            for (let key in rows) {
                let row = rows[key];
                let number = row.servicePointId;
                let name = row.name;
                name += ', ' + row.visitingAddress.streetName;
                name += ' ' + row.visitingAddress.streetNumber;
                name += ', ' + row.visitingAddress.postalCode;
                name += ' ' + row.visitingAddress.city.charAt(0).toUpperCase();
                name += row.visitingAddress.city.slice(1).toLowerCase();
                parcel_shops.push([name, number]);
                obj.delivery_parties[number] = row;
            }
        }
        let div = obj.html.Div();
        let select = obj.InputSelect(div, 'service', parcel_shops, 'Pakkeshop');
        select.id('parcel_shop');
        let node = document.getElementById('parcel_shop');
        if (node) {
            node.outerHTML = select.Render();
        }
    }

    GetShopEntries() {
        super.SavePost();
        let iso_code = this.post.get('receiver_country');
        let postcode = this.post.get('receiver_postcode');
        let address = this.post.get('receiver_address');
        if (!postcode.match(/^[0-9 ]+$/)) {
            return;
        }
        let rest_url;
        if (this.GetStorage('test_server')) {
            rest_url = 'https://atapi2.postnord.com/rest/';
        } else {
            rest_url = 'https://api2.postnord.com/rest/';
        }
        let url = rest_url;
        url += 'businesslocation/v5/servicepoints/nearest/byaddress';
        url += '?apikey=' + this.GetStorage('api_key');
        url += '&returnType=json';
        url += '&streetName=' + address;
        url += '&postalCode=' + postcode;
        url += '&countryCode=' + iso_code;
        url += '&numberOfServicePoints=' + 10;
        if (!this.cache[url]) {
            this.Get(url, this.SetShopEntries);
            this.cache[url] = true;
        }
    }

    PrintCallback(data, obj) {
        if (!data.labelPrintout) {
            if (data.error.description) {
                obj.error = data.error.status;
            } else if (data.compositeFault && data.compositeFault.faults[0]) {
                obj.error = data.compositeFault.faults[0].explanationText;
            } else {
                obj.error = 'Failed';
            }
            obj.Display();
            return;
        }
        if (obj.GetStorage('label_format') == 'zpl') {
            // Currently not supported in this script
            let iframe = document.createElement('iframe');
            document.body.appendChild(iframe);
	    let bytes = data.labelPrintout[0].printout.data;
            iframe.contentWindow.document.open('text/plain');
            iframe.contentWindow.document.write('<pre>' + bytes + '</pre>');
            iframe.contentWindow.document.close()
            iframe.contentWindow.print();
	} else {
            let iframe = document.createElement('iframe');
	    let bytes = atob(data.labelPrintout[0].printout.data);
	    let pkg_no = data.labelPrintout[0].itemIds[0].itemIds;
	    let byteNumbers = new Array(bytes.length);
	    for (let i = 0; i < bytes.length; i++) {
	      byteNumbers[i] = bytes.charCodeAt(i);
	    }
	    let byteArray = new Uint8Array(byteNumbers);
	    let file = new Blob([byteArray], { type: 'application/pdf;base64' });
	    let fileURL = URL.createObjectURL(file);
            iframe.src = fileURL;
            iframe.style.display = "none";
            iframe.onload = function() {
                this.contentWindow.print();
                document.onfocus = function() {
                    location.href = location.href;
                }
            }
            document.body.appendChild(iframe);
            let archive = obj.GetStorage('archive', {});
            let post = Object.fromEntries(obj.post);
            let keys = [
                'sender_company', 
                'sender_company',
                'sender_name',
                'sender_address',
                'sender_postcode',
                'sender_city',
                'sender_country',
                'sender_email',
                'sender_phone'
            ];
            post['pkg_no'] = pkg_no;
            for (let key of keys) {
                post[key] = obj.GetStorage(key).trim();
            }
            post = JSON.stringify(post);
            archive[obj.date] = { 'post': post, 'pdf': btoa(bytes) };
            if (Object.keys(archive).length > obj.max_archive) {
                let new_archive = {};
                for (let date of Object.keys(archive).slice(1)) {
                    new_archive[date] = archive[date]; 
                }
                archive = new_archive;
            }
            obj.SetStorage('archive', archive);
            keys = [
                'receiver_company', 
                'receiver_company',
                'receiver_name',
                'receiver_address',
                'receiver_postcode',
                'receiver_city',
                'receiver_email',
                'receiver_phone'
            ];
            for (let key of keys) {
                obj.SetStorage(key, '');
            }
            obj.SaveStorage();
	}
    }

    Print() {
        super.SavePost();
        super.HandlePost();
        let rest_url;
        if (this.GetStorage('test_server')) {
            rest_url = 'https://atapi2.postnord.com/rest/';
        } else {
            rest_url = 'https://api2.postnord.com/rest/';
        }
        let url = rest_url;
        let label_format = this.GetStorage('label_format', 'pdf');
        url += 'shipment/v3/edi/labels/' + label_format;
        url += '?apikey=' + this.GetStorage('api_key');
        url += '&returnType=json';
        url += '&locale=da';
        url += '&paperSize=' + this.GetStorage('label_size');
        const date = new Date();
        this.date = date.getFullYear();
        this.date += '-' + ('0' + date.getMonth()).slice(-2);
        this.date += '-' + ('0' + date.getDate()).slice(-2);
        this.date += ' ' + ('0' + date.getHours()).slice(-2);
        this.date += ':' + ('0' + date.getMinutes()).slice(-2);
        this.date += ':' + ('0' + date.getSeconds()).slice(-2);
        let consignee = {};  // Receiver
        let consignor = {};  // Sender
        let parties;
        let receiver_company = this.GetStorage('receiver_company').trim();
        consignee.party = {
            'nameIdentification': {
                'companyName': receiver_company ? receiver_company : null,
                'name': this.GetStorage('receiver_name')
            },
            'address': {
                'streets': [ this.GetStorage('receiver_address'), '' ],
                'postalCode': this.GetStorage('receiver_postcode'),
                'city': this.GetStorage('receiver_city'),
                'countryCode': this.GetStorage('receiver_country')
            },
            'contact': {
                'contactName': this.GetStorage('receiver_name'),
                'emailAddress': this.GetStorage('receiver_email').trim(),
                'smsNo': this.GetStorage('receiver_phone').trim()
            }
        };

        let sender_company = this.GetStorage('sender_company').trim();
        consignor = {
            'issuerCode': 'Z11',
            'partyIdentification': {
                'partyId': this.GetStorage('customer_number'),
                'partyIdType': '160'
            },
        };
        consignor.party = {
            'nameIdentification': {
                'companyName': sender_company ? sender_company : null,
                'name': this.GetStorage('sender_name')
            },
            'address': {
                'streets': [ this.GetStorage('sender_address'), '' ],
                'postalCode': this.GetStorage('sender_postcode'),
                'city': this.GetStorage('sender_city'),
                'countryCode': this.GetStorage('sender_country')
            },
            'contact': {
                'contactName': this.GetStorage('sender_name'),
                'emailAddress': this.GetStorage('sender_email').trim(),
                'smsNo': this.GetStorage('sender_phone').trim()
            }
        }
        let services = [];
        let service = this.GetStorage('service');
        if (service != 'pdk_1') {
            // Without distribution
            let row = this.delivery_parties[service];
            let address = row.visitingAddress.streetName;
            address += ' ' + row.visitingAddress.streetNumber;
            let city = row.visitingAddress.city.charAt(0).toUpperCase();
            city += row.visitingAddress.city.slice(1).toLowerCase();
            let deliveryParty = {
                'partyIdentification': {
                    'partyId': row.servicePointId,
                    'partyIdType': '156'
                },
                'party': {
                    'nameIdentification': {
                        'name': row.name
                    },
                    'address': {
                        'streets': [address],
                        'postalCode': row.visitingAddress.postalCode,
                        'city': city,
                        'countryCode': row.visitingAddress.countryCode
                    }
                }
            };
            parties = {
                'consignor': consignor,
                'consignee': consignee,
                'deliveryParty': deliveryParty
            };
            service = {
                'basicServiceCode': '19'  // MyPack Collect
            };
            services.push('A7');  // Optional Service Point
        } else {
            // With distribution
            parties = {
                'consignor': consignor,
                'consignee': consignee
            };
            if (receiver_company) {
                service = {
                    'basicServiceCode': '18'  // PostNord Parcel
                };
            } else {
                service = {
                    'basicServiceCode': '17'  // MyPack Home
                };
            }
        }

        if (consignee['party']['contact']['emailAddress']) {
            services.push('A4');  // Notification by e-mail
        }
        if (consignee['party']['contact']['smsNo']) {
            services.push('A3');  // Notification by SMS
        }
        if (services.length) {
            service['additionalServiceCode'] = services;
        }
        let items = {
            'itemIdentification': {
                'itemId': '0',
                'itemIdType': 'SSCC'
            },
            'grossWeight': {
                'value': this.GetStorage('weight'),
                'unit': 'KGM'
            }
        };
        let goodsItem = {
            'packageTypeCode': 'PC',
            'items': [ items ]
        };
        let data = {
            'messageDate': date.toISOString(),
	    'messageFunction': 'Instruction',
	    'language': 'DA',
	    'updateIndicator': 'Original',
	    'testIndicator': this.GetStorage('test_server') ? true : false,
            'shipment' : [
                {
		    'references': [
                        {
                            'referenceNo': this.GetStorage('referenceNo'),
                            'referenceType': 'CU'
                        }
                    ],
		    'service': service,
		    'parties': parties,
		    'goodsItem': [ goodsItem ],
                }
            ]
        };
        this.DoAjax(url, data, this.PrintCallback);
    }

    Contents(body, title = '') {
        let div = super.Contents(body, 'Modtager');
        this.InputField(div, 'Firma (valgfrit)', 'receiver_company');
        this.InputField(div, 'Navn', 'receiver_name');
        this.InputField(div, 'Adresse', 'receiver_address');
        this.InputField(div, 'Postnummer', 'receiver_postcode');
        this.InputField(div, 'By', 'receiver_city');
        this.InputSelect(div, 'receiver_country', this.countries, 'Land');
        this.InputField(div, 'E-mail-adresse', 'receiver_email');
        this.InputField(div, 'Telefonnummer', 'receiver_phone');
        this.SubmitButton(div);
        div.onchange('window.receiver.GetShopEntries()');

        div.Br().class('clear');
        div.Br();
        div.Hr();
        div.H1('Pakke').class('text-center');
        this.InputField(div, 'Referencenummer', 'referenceNo');
        this.InputField(div, 'Vægt [kg]', 'weight');
        let select = this.InputSelect(div, 'service', [this.parcel_shop], 'Pakkeshop');
        select.id('parcel_shop');
        select.parent.attributes.class = ['col-sm-8'];
        let button = div.Button('Udskriv');
        button.class('btn btn-primary float-end');
        button.type('button');
        button.onclick('window.receiver.Print()');
    }

    Display() {
        this.cache = {};
        super.Display();
        this.GetShopEntries();
        this.post = new Map();
    }
}

window.receiver = new Receiver();
