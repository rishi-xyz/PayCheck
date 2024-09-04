export async function Signupcall({Username,Password,Firstname,Lastname}){
  const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
    username:Username,
    password:Password,
    firstname:Firstname,
    lastname:Lastname
  });
  return response;
};