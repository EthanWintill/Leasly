import React, {useState, useEffect} from 'react';
import {auth} from '../../util/FirebaseFuncs';

export default function ProfilePage() {
  const [data, setdata] = useState({
    listings: [],
  });

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch('https://leaslybackend.herokuapp.com/api/sublets?user=' + auth.currentUser.displayName).then((res) =>
      res.json().then((sublets) => {
        // Setting a data from api
        // only one listing rn, feel free to add some
        setdata({
          listings: sublets,
        });
        console.log(data);
      }),
    );
  });

  return (
    <div>
      <h1 style={{color: 'black'}}>Your listings</h1>
      <div className="listings">
        <ul>

          {data.listings.map((sublet) =>
            <div key={sublet.rent}>
              <li>Listing description: {sublet.description}</li>
            </div>,
          )}

        </ul>

      </div>
    </div>
  );
}

export {
  ProfilePage,
};
