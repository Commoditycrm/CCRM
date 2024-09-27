import { LightningElement } from 'lwc';

export default class Startbutton extends LightningElement {

    handleredirect(event) {
     
        window.location.href = window.location.href+'createcase';
     
    }
}