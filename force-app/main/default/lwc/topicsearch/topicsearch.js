import { LightningElement,track} from 'lwc';

import getTopic from '@salesforce/apex/Topic_ctrl.getTopic';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
 
export default class customSearch extends LightningElement {
    
    @track Wrapperclasses;
    sVal = '';
 
    updateSeachKey(event) {
        this.sVal = event.target.value;
    }
 
    handleSearch() {
        if (this.sVal !== '') {
            getTopic({
                    searchKey: this.sVal
                })
                .then(result => {  
                    this.Wrapperclasses = result;
                })
                .catch(error => {
                    
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                
                    this.Wrapperclasses = null;
                });
        } else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}