import React from "react";

export function MakeTable() {
  const [comPosts, setComPosts] = React.useState([]);

  // Simulate calling a service to update Community Posts
  React.useEffect(() => {
    const comPostsText = localStorage.getItem('comPosts');
    if (comPostsText) {
      setComPosts(JSON.parse(comPostsText));
    }
  }, []);

  const postRows = [];
  if (comPosts.length) {
    for (const [i, post] of comPosts.entries()) {
      postRows.push(
        <tr key={i}>
          <td>{post.name}</td>
          <td>{post.desc}</td>
          <td>{post.date}</td>
          <td>{post.time}</td>
        </tr>
      );
    }
  } else {
    postRows.push(
      <tr key='empty'>
        <td colSpan='4' className='text-center'>No post yet. Share Yours!</td>
      </tr>
    )
  }

  return (
    <section id="posts-display" className="card mx-2">
      <h3 className="card-header">Service Opportunities in your Community</h3>
      <table className="card-body table table-striped-columns">
        <thead className="table-light">
          <tr>
            <th>Name</th>
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