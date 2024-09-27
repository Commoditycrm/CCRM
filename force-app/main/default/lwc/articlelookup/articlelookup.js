import { LightningElement, api } from 'lwc';

export default class Articlelookup extends LightningElement {
  //  @api childObjectApiName = 'Contact'; //Contact is the default value
   // @api targetFieldApiName = 'AccountId'; //AccountId is the default value
    @api childObjectApiName = 'CERM__Knowledge__Kav'; //Contact is the default value
    @api targetFieldApiName = 'Title'; //AccountId is the default value
    @api fieldLabel = 'Your field label here';
    @api disabled = false;
    @api value;
    @api required = false;

    handleChange(event) {
        // Creates the event
        const selectedEvent = new CustomEvent('valueselected', {
            detail: event.detail.value
           
        });
        //dispatching the custom event
        this.dispatchEvent(selectedEvent);
      //  window.alert(selectedEvent);
    }

    @api isValid() {
        if (this.required) {
            this.template.querySelector('lightning-input-field').reportValidity();
        }
    }
}