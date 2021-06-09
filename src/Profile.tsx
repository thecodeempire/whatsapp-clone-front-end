import "./Profile.css";
import { createRef, RefObject, useState } from "react";
import { Button, Modal, Card } from "@material-ui/core";
import { IResUser } from "./types";
import { updateUser } from "./services/user";

interface IProps {
  open: boolean;
  onClose: (e: object, reason: string) => void;
  close: () => void;
}

function Profile({ open, onClose, close }: IProps) {
  const [error, setError] = useState("");
  const [profileRefs] = useState<Record<string, RefObject<HTMLInputElement>>>({
    Username: createRef<HTMLInputElement>(),
    Image: createRef<HTMLInputElement>(),
    Email: createRef<HTMLInputElement>(),
  });
  const user: IResUser = JSON.parse(localStorage.getItem("user")!);
  const [values, setValues] = useState<Record<string, string>>({
    Username: user.username,
    Image: user.image!,
    Email: user.email!,
  });

  async function updateProfile() {
    try {
      setError('Updating...')
      const u = await updateUser({
        _id: user._id,
        username: profileRefs.Username?.current?.value!,
        image: profileRefs.Image?.current?.value!,
        email: profileRefs.Email?.current?.value!,
        lastSeen: user.lastSeen,
        officer: user.officer,
      });
      setValues({
        Username: u.username,
        Image: u.image!,
        Email: u.email!,
      });
      setError("Updated Successfully!");
      setTimeout(() => setError(""), 10000);
      close();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 10000);
    }
  }

  return (
    <Modal onClose={onClose} open={open}>
      <div className="profile">
        <Card>
          <h1>Profile</h1>
          <ul className="profile__ul">
            {Object.keys(profileRefs).map((key, i) => (
              <li key={i} className="profile__li">
                <input
                  className="profile__input"
                  defaultValue={values[key]}
                  type="text"
                  ref={profileRefs[key]}
                  placeholder={`${key}...`}
                />
              </li>
            ))}
          </ul>
          <div className="profile_buttonContainer">
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateProfile()}
            >
              Update Profile
            </Button>
          </div>
          {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
        </Card>
      </div>
    </Modal>
  );
}

export default Profile;
