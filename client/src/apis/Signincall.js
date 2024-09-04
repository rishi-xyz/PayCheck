export async function Signincall({Username,Password}){
  const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
    username:Username,
    password:Password
  });
  return response;
}