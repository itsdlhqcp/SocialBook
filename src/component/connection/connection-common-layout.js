import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoProfileImage from "../../image/no_profile_picture.png";
import { ConnectionType } from "../../types/posttypes";
import { successMessage } from "../main-helper/desktop-notification";
import { connectionSpecificOperations } from "./helper/api_call";

const ConnectionCollectionItem = ({
  user,
  connectionType,
  setCollectiveIds,
}) => {
  const { darkMode } = useSelector((state) => state);

  return (
    <div
      className={` ${
        darkMode ? "hover:bg-darkCardColor" : "hover:bg-lightBgColor"
      } flex justify-between items-center p-4 rounded-md transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between w-full">
        <ConnectionTile user={user} />

        <ButtonCollectionPrediction
          darkMode={darkMode}
          connectionType={connectionType}
          userId={user.id}
          setCollectiveIds={setCollectiveIds}
        />
      </div>
    </div>
  );
};

const ButtonCollectionPrediction = ({
  connectionType,
  darkMode,
  userId,
  setCollectiveIds,
}) => {
  if (connectionType === ConnectionType.AlreadyConnected) {
    return (
      <ConnectedUsersButtonCollection
        darkMode={darkMode}
        userId={userId}
        setCollectiveIds={setCollectiveIds}
      />
    );
  } else if (connectionType === ConnectionType.RequestReceived) {
    return (
      <ReceivedInvitationButtonsCollection
        darkMode={darkMode}
        userId={userId}
        setCollectiveIds={setCollectiveIds}
      />
    );
  } else if (connectionType === ConnectionType.RequestSent) {
    return (
      <SentRequestButtonCollection
        darkMode={darkMode}
        userId={userId}
        setCollectiveIds={setCollectiveIds}
      />
    );
  }

  return <></>;
};

const ConnectionTile = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center w-full md:w-2/3 cursor-pointer"
      onClick={() => {
        navigate(`/${user.id}/profile`);
      }}
    >
      <div className="w-10 h-10 md:w-16 md:h-16 bg-lightCardColor dark:bg-darkCardColor rounded-full">
        <img
          className="rounded-full w-10 h-10 md:w-16 md:h-16 object-cover"
          src={user.profilePic || NoProfileImage}
          alt="profile"
        />
      </div>
      <div className="ml-4">
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-sm opacity-60">
          {" "}
          {user.description.length > 45
            ? user.description.slice(0, 45) + "..."
            : user.description}
        </p>
      </div>
    </div>
  );
};

const ConnectedUsersButtonCollection = ({
  darkMode,
  userId,
  setCollectiveIds,
}) => {
  // ** NOTE: Message Button Will be redirect to the specific chat..
  // ** We will do it after implement chat feature.

  return (
    <div className="md:flex items-center sm:ml-5 text-sm md:text-md 2xl:text-lg md:tracking-wider">
      <button
        className={`${
          darkMode ? "hover:bg-blue-800" : "hover:bg-blue-300"
        }  text-lightPrimaryFgColor dark:text-darkPrimaryFgColor  border-darkPrimaryFgColor  connection-screens-common-button-layout hover:bg-opacity-30 mx-3 md:mx-0`}
        style={{ borderWidth: "0.2px" }}
      >
        Message
      </button>

      <button
        className={`${
          darkMode ? "hover:bg-red-400" : "hover:bg-red-300"
        } mx-3 md:ml-5 text-red-500  border-red-500  connection-screens-common-button-layout hover:bg-opacity-30 mt-3 md:mt-0`}
        style={{ borderWidth: "0.2px" }}
        onClick={() => {
          connectionSpecificOperations(userId, "removeConnections");
          successMessage("😔 Connection Removed", 2000);
          setCollectiveIds((prev) => [...prev, userId]);
        }}
      >
        Remove
      </button>
    </div>
  );
};

const ReceivedInvitationButtonsCollection = ({
  darkMode,
  userId,
  setCollectiveIds,
}) => {
  return (
    <div className="md:flex items-center text-sm md:text-md 2xl:text-lg md:tracking-wider">
      <button
        className={`${
          darkMode ? "hover:bg-green-400" : "hover:bg-green-300"
        }  text-green-600  border-green-600 dark:text-green-400 dark:border-green-400 connection-screens-common-button-layout hover:bg-opacity-30 mx-3`}
        style={{ borderWidth: "0.2px" }}
        onClick={() => {
          connectionSpecificOperations(userId, "acceptConnectionRequest");
          successMessage("🥳 Connection request accepted", 2000);
          setCollectiveIds((prev) => [...prev, userId]);
        }}
      >
        Accept
      </button>

      <button
        className={`${
          darkMode ? "hover:bg-red-400" : "hover:bg-red-300"
        } mr-5 text-red-500  border-red-500  connection-screens-common-button-layout hover:bg-opacity-30 mt-3 md:mt-0 mx-3 md:mx-0`}
        style={{ borderWidth: "0.2px" }}
        onClick={() => {
          connectionSpecificOperations(
            userId,
            "removeIncomingConnectionRequest"
          );
          successMessage("😏 Incoming Connection Request Removed", 2000);
          setCollectiveIds((prev) => [...prev, userId]);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

const SentRequestButtonCollection = ({
  darkMode,
  userId,
  setCollectiveIds,
}) => {
  return (
    <div className="flex items-center">
      <button
        className={`${
          darkMode ? "hover:bg-red-400" : "hover:bg-red-300"
        } ml-3 md:mr-5 text-red-500  border-red-500 connection-screens-common-button-layout hover:bg-opacity-30 text-sm md:text-md 2xl:text-lg md:tracking-wider`}
        style={{ borderWidth: "0.2px" }}
        onClick={() => {
          connectionSpecificOperations(userId, "withDrawSentRequest");
          successMessage("😏 Outgoing Connection Request Removed", 2000);
          setCollectiveIds((prev) => [...prev, userId]);
        }}
      >
        Withdraw
      </button>
    </div>
  );
};

export default ConnectionCollectionItem;
