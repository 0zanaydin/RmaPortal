import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Contact objesindeki Name alanını referans alıyoruz
import NAME_FIELD from '@salesforce/schema/Contact.Name';

export default class ContactContainer extends LightningElement {
    // Bileşen bir Record Page'e eklendiğinde, o anki kaydın ID'sini otomatik alır
    @api recordId; 
    
    selectedId = 'Henüz seçim yapılmadı';
    dynamicContactName = 'Henüz seçim yapılmadı';
    dynamicContact; // Alt bileşene göndereceğimiz obje

    // @wire kullanarak veritabanından güncel kaydın verilerini (Name) okuyoruz
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD] })
    wiredRecord({ error, data }) {
        if (data) {
            // Veri başarıyla geldiyse, alt bileşene göndereceğimiz objeyi oluşturuyoruz
            this.dynamicContact = {
                Id: this.recordId,
                Name: getFieldValue(data, NAME_FIELD)
            };
        } else if (error) {
            console.error('Kayıt çekilirken hata oluştu', error);
        }
    }

    handleContactSelection(event) {
        // Alt bileşenden Custom Event ile gelen ID verisini okuyoruz
        this.selectedId = event.detail; 
        this.dynamicContactName = this.dynamicContact.Name;
    }
}