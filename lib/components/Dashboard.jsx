"use client"
import Link from 'next/link'
import styles from "@/styles/dashboard.module.css";

const Dashboard = ({posts}) => {
  return (
    <div className={styles.container}>
      {posts.map((post, idx) => (
        <div
          key={idx}
          className={styles.item}
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

const PostCard = ({post}) => {
  return (
    <Link href={`/edit/${post._id}`} className='link-without-underline'>
      {post.title || "empty title"}
    </Link>
  )
}

export default Dashboard