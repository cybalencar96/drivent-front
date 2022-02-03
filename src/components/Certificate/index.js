import { useContext, useEffect, useState } from "react";
import UserApi from "../../services/UserApi";
import UserContext from "../../contexts/UserContext";
import { Document, Page } from "react-pdf";

export default function CertificateSection() {
  const { userData } = useContext(UserContext);
  const [userEvents, setUserEvents] = useState(null);

  const url = "http://localhost:4000/certificate";

  useEffect(() => {
    const promise = UserApi.listMyEvents(userData.user.id);
    promise.then((res) => console.log(res.data));
  }, []);

  return <Document file={url}></Document>;
}
