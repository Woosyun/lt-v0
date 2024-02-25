"use client"
import Link from 'next/link'

const Dashboard = ({posts}) => {
  return (
    <div className='dashboard'>
      {posts.map((post, idx) => (
        <div
          key={idx}
          className='dashboard-post-item1'
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

const PostCard = ({post}) => {
  return (
    <Link href={`/edit-doc/${post._id}`} className='link-without-underline'>
      {post.title || "empty title"}
    </Link>
  )
}

export default Dashboard