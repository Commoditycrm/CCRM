@isTest
global class DocusignMock implements WebServiceMock {
   global void doInvoke(
           Object stub,
           Object request,
           Map<String, Object> response,
           String endpoint,
           String soapAction,
           String requestName,
           String responseNS,
           String responseName,
           String responseType) {
    /**     DocuSignAPI.CreateAndSendEnvelopeResponse_element response_x = 
            new  DocuSignAPI.CreateAndSendEnvelopeResponse_element();
        response_x.CreateAndSendEnvelopeResult = new List < String > {'a', 'b'};
        response.put('response_x', response_x); **/
   }
}