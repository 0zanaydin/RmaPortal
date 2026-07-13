public class HrCalloutService {
    
    public static List<HrUserWrapper.UserDetail> getUsersFromApi(){
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint('callout:HrExtServices/users?limit=200');
        HttpResponse response = http.send(request);
        
        if(response.getStatusCode() == 200){

            HrUserWrapper gelenVeri = (HrUserWrapper) JSON.deserialize(response.getBody(), HrUserWrapper.class);
            //System.debug('Toplam Gelen Kayıt Sayısı: ' + gelenVeri.total);
            return gelenVeri.users;
            
        }
        
        return null;
    }
}