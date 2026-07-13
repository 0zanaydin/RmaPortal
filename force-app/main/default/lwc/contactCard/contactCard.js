import { LightningElement, api } from 'lwc';

export default class ContactCard extends LightningElement {
    // @api sayesinde bu değişken dışarıdan (Parent'tan) beslenebilir hale geldi
    // İçindeki sabit değeri sildik.
    @api contact; 

    handleSelect() {
        const selectEvent = new CustomEvent('contactselect', {
            detail: this.contact.Id // Gerçek kaydın ID'sini yukarı fırlatıyoruz
        });
        this.dispatchEvent(selectEvent);
    }
}