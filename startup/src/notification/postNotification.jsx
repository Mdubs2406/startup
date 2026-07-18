import React from "react";

export function PostNotification({ show }) {
  if (!show) {
    return;
  }

  return(
    <div className="card w-auto my-3">
      <div className="card-header"></div>
      <div className="card-body text-center fw-bold">
        There's a new service opportunity posted!
      </div>
      <div className="card-footer"></div>
    </div>
  );
}