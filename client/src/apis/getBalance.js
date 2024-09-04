import ApiConnector from "../components/ApiConnector"

export const getBalance = async (token) => {
  try{
    const response = await ApiConnector(
      "GET",
      `http://localhost:3000/api/v1/account/balance`,
      null,
      {
        authorization:`Bearer ${token}`
      }
    );
    if(response.status === 200){
      return response.data.balance;
    }else{
      throw new Error(response.data.message);
    }
  }catch(error){
    console.log("Get balance error...",error.message);
  }
};