import { LightningElement,track,wire,api } from 'lwc';

import findTopics from '@salesforce/apex/TopicSearch.findTopics'; 
import addTopics from '@salesforce/apex/TopicAdd.addTopics'; 
import {refreshApex} from '@salesforce/apex';

export default class Topics extends LightningElement {

    @track items;
    @track error;
    @api recordId;
    @track topiccount;
    @track topicadd;
    //'ka01G000000TUcoQAG'

   @wire(findTopics,{artId : '$recordId' })
    wirefindTopics({
        error,
        data
    }) {
        if (data) {
            this.items = data;
            this.topiccount  = this.items.length;
            console.log(JSON.stringify(data, null, '\t'));
           // alert("Id = " +Id);
           
        } else {
            this.error = error;
        }
    }    
    
   /*  handleClick(event) {
        window.alert('Navigate');
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes:{
                recordId: '$recordId',
                objectApiName: 'CERM__knowledge__kav',
                relationshipApiName: 'Related Topics',
                actionName: 'view'
            }
        });
    } */

    addpills(){
        findTopics({artId : this.recordId })
        .then((data) => {  
            if (data.length > 0) {
                this.items = data;
                this.topiccount  = this.items.length;
                console.log(JSON.stringify(data, null, '\t'));
              // alert('Inside Pills');
               
            } else {
                this.error = error;
            }
            })  
        .catch((error) => {  
         this.error = error;  
         });  
        }


    addtopic(event) {
   // window.alert(event.which );
        if(event.which  == 13) {
        //window.alert('Inside KeyPress');
        this.topicadd = event.target.value;
     //  window.alert(this.topicadd);
        addTopics({ TopicName:this.topicadd, ArticleId:this.recordId })
        ((data) => {  
            if (data.length > 0) {
                
                return refreshApex(this.Topics);
                console.log(JSON.stringify(data, null, '\t'));
               // alert("Id = " +Id);
               
            } else {
                this.error = error;
            }
            })  
        .catch((error) => {  
         this.error = error;  
         window.alert(this.error);
         });   
         return refreshApex(this.wirefindTopics);
         
       // this.addpills();
        }     
    }

    /* getLookupResult() {  
        findRecords({ searchKey: this.searchKey, objectName : this.objectApiName })  
         .then((result) => {  
          if (result.length===0) {  
            this.recordsList = [];  
            this.message = "No Records Found";  
           } else {  
            this.recordsList = result;  
            this.message = "";  
            //window.alert(result);
           }  
           this.error = undefined;  
         })  
         .catch((error) => {  
          this.error = error;  
          this.recordsList = undefined;  
         });  
       }   */



}