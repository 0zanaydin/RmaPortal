import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createShippingLabel from '@salesforce/apex/RmaCallout.createMockShippingLabel';

export default class RmaShippingButton extends LightningElement {
    @api recordId; // Bulunulan Case kaydının ID'sini otomatik alır
    isLoading = false;

    handleCreateLabel() {
        this.isLoading = true;

        createShippingLabel({ recordId: this.recordId })
            .then(result => {
                // Apex'ten dönüş başarılıysa
                this.showToast('Başarılı', 'Kargo Takip No: ' + result, 'success');
                // İlerleyen adımda burada sayfayı refresh edeceğiz
            })
            .catch(error => {
                // Try-catch'ten fırlatılan AuraHandledException buraya düşer
                this.showToast('Hata', error.body.message, 'error');
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}