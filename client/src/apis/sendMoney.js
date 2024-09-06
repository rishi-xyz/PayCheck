import  ApiConnector  from "../components/ApiConnector";
export const sendMoney = async(amount, to, token)=>{
    try{
        const response = await ApiConnector(
            "POST",
            `http://localhost:3000/api/v1/account/transfer`,
            {amount, to},
            {authorization:`Bearer ${token}`}
        );
        if(response.status!==200){
            throw new Error(response.data.message);
        }else{
            return response.data.message;
        } 
    }catch(error){
        console.log("Send money error...",error.message);
    }
};