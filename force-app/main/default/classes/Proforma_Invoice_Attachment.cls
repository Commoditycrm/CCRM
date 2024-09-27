global class Proforma_Invoice_Attachment {
   
	global String PageContents{ get; set; }
	global String quoteObjectId{ get; set {
    	UpdateContents(value);
	} }

    public void UpdateContents(String quoteObjectID) 
    {
        try {
            PageReference pageRef = Page.MTC_Invoice_PDF;
            pageRef.getParameters().put('recId ', quoteObjectID);   
            
            PageContents = pageRef.getContent().toString().replace
            ('<html style="display:none !important;">', '<html>');
        } catch(exception ex) { 
            PageContents = 'An error has occurred while trying to generate this invoice.  Please contact customer service.';
        }
    }

}