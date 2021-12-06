import { useState } from "react";
import ReceivedInvitation from "./received-invitation";
import SendInvitation from "./send-invitation";

const InvitationTabsCollection = () => {
  /// Make a tabbar for send and receive invitations in tailwind css

  const [currentTab, setcurrentTab] = useState(0);

  return (
    <div>

        {/* Tabs Collection */}
      <ul className="flex justify-around">
        <li
          className={`${
            currentTab === 0
              ? "invitation-tab-bar-item"
              : "px-4 py-2 cursor-pointer"
          }  w-full text-center `}
          onClick={() => setcurrentTab(0)}
        >
          Received
          <div
            className={`${
              currentTab === 0 ? "invitation-tab-bar-item-underbar" : ""
            } mt-4`}
          ></div>
        </li>
        <li
          className={`${
            currentTab === 1
              ? "invitation-tab-bar-item"
              : "px-4 py-2 cursor-pointer"
          } w-full text-center `}
          onClick={() => setcurrentTab(1)}
        >
          Sent
          <div
            className={`${
              currentTab === 1 ? "invitation-tab-bar-item-underbar" : ""
            } mt-4`}
          ></div>
        </li>
      </ul>

      {/* Tab Contents */}
      {currentTab === 0 && <ReceivedInvitation />}
      {currentTab === 1 && <SendInvitation />}
    </div>
  );
};

export default InvitationTabsCollection;
