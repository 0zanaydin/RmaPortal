public class HrUserWrapper {
    
    public integer total;
    public integer skip;
    public List<UserDetail> users;
    
    public class UserDetail{
        
       public Integer Id;
       public String firstName;
       public String lastName;
       public String email;
        
    }
}