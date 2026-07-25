import React from "react";

export function MakeTable({ comPosts }) {
  const postRows = [];
  if (comPosts.length) {
    for (let i = comPosts.length-1; i >= 0; i--) {
      let post = comPosts[i];
      postRows.push(
        <tr key={i}>
          <td>{post.author}</td>
          <td>{post.content.title}</td>
          <td>{post.content.desc}</td>
          <td>{post.content.date}</td>
          <td>{post.content.time}</td>
        </tr>
      );
    }
  } else {
    postRows.push(
      <tr key='empty'>
        <td colSpan='5' className='text-center'>No posts yet. Share Yours!</td>
      </tr>
    )
  }

  return (
    <section id="posts-display" className="card mx-2">
      <h3 className="card-header">Service Opportunities in your Community</h3>
      <table className="card-body table table-striped-columns">
        <thead className="table-light">
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{postRows}</tbody>
      </table>
    </section>
  )
}