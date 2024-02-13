// YourComponent.js
import { useDispatch, useSelector } from "react-redux";
import { AlterToast } from "../../utils/renderUitils";
import { useEffect } from "react";

function Toast() {
  const dispatch = useDispatch();
  const { customization }: any = useSelector((state) => state);

  useEffect(() => {
    if (customization.data) {
      // Display toast for successful API call
      AlterToast("Success !!", "API call was successful");
    } else if (customization.error) {
      // Display toast for failed API call
      AlterToast("Error !!", "API call failed");
    }
  }, [customization.data, customization.error]);

  // ... rest of your component code
}
