import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";

const UserPhotos = () => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function loadPhotos() {
      const data = await fetchModel(`/photosOfUser/${userId}`);
      if (data) setPhotos(data);
    }
    loadPhotos();
  }, [userId]);

  if (!photos.length) return <div>Loading photos...</div>;

  return (
    <div>
      <h3>User Photos</h3>
      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: "20px" }}>
          <img
            src={`/images/${photo.file_name}`}
            alt={photo.file_name}
            width="300"
          />
          <div>
            <h4>Comments:</h4>
            <ul>
              {photo.comments.map((comment) => (
                <li key={comment._id}>
                  <b>
                    {comment.user.first_name} {comment.user.last_name}:
                  </b>{" "}
                  {comment.comment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPhotos;
