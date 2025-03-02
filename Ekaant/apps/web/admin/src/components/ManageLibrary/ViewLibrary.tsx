
import { useParams } from "react-router-dom";

const ViewLibrary = () => {
  const { library_id } = useParams();
  return <div>{library_id}</div>;
};

export default ViewLibrary;
