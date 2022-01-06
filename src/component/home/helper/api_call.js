import { API } from "../../main-helper/backend";
import {
  errorMessage,
  infoMessage,
} from "../../main-helper/desktop-notification";
import { getDataFromLocalStorage } from "../../main-helper/local-storage-management";

export const fetchFeedPosts = async (page, mainRoot, desiredProfileId) => {
  try {
    const storedData = getDataFromLocalStorage();

    const res = await fetch(
      `${API}/${mainRoot}/${desiredProfileId || storedData?.user}?page=${page}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedData?.token}`,
            }
        }
    );

    const data = await res.json();

    if (data.code === 403) {
      infoMessage("You are not authorized");
      return;
    } else {
      return data.code === 200 && data.data;
    }
  } catch (error) {
    console.log("error in fetchFeedPosts", error);
    errorMessage("Something went wrong");
    return [];
  }
};
