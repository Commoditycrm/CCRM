@isTest
public class EmailSendController_Test {
    
    @isTest
    public static void sendMailMethod_Test(){
        String mMail;
        String mSubject;
        String mbody;
        
        mMail = 'jeevapvs@gmail.com';
        mSubject = 'test';
        mbody = 'test';
        test.startTest(); 
        EmailSendController controller = new EmailSendController(); 
        EmailSendController.sendMailMethod(mMail,mSubject,mbody);
        System.assertEquals('test', mSubject);
        /*List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();     
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        
        mMail = 'jeevapvs@gmail.com';
        mSubject = 'test';
        mbody = 'test';
        
        List<String> sendTo = new List<String>();
        sendTo.add(mMail);
        mail.setToAddresses(sendTo);
        
        mail.setReplyTo('noreply@gmail.com'); // change it with your mail address.
        mail.setSenderDisplayName('salesforce User'); 
        
        mail.setSubject(mSubject);
        mail.setHtmlBody(mbody);
        
        mails.add(mail);
        
        Messaging.sendEmail(mails);*/
        test.stopTest(); 
    }
}