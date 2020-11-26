import React from "react";

function Landing({ user }) {
  return (
    <div>
      <h1>{user.email}</h1>
    </div>
  );
}

export default Landing;
