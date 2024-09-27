import { LightningElement,track } from 'lwc';
import stlaptopimg from '@salesforce/resourceUrl/tppaymentimg';
import stpolicyimg from '@salesforce/resourceUrl/tptravelpolicyimg';

export default class Inventorychoice extends LightningElement {

    @track paymentimg;
    @track policyimg;

    paymentimg = stlaptopimg;
    policyimg = stpolicyimg;
}