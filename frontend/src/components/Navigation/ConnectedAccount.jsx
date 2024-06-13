import { useContext } from "react"
import Web3Context from "../Context/Web3Context";
const ConnectedAccount = ()=>{
    const {selectedAccount}=useContext(Web3Context);
    console.log(selectedAccount);
    return (
        <div>
          <p className="connected-ac">
            {selectedAccount ? selectedAccount : "No Account Selected"}
          </p>
        </div>
      );

}
export default ConnectedAccount