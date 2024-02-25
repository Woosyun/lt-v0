"use client"
import Dashboard from "@/lib/components/Dashboard";
import DocCreationButton from "@/lib/components/DocCreationButton";
import withAuth from "@/lib/components/withAuth";
import ManageDashboard from "@/lib/utils/ManageDashboard";
import { useEffect, useState } from "react";

const page = ({session, router}) => {
  const [posts, setPosts] = useState([]);
  // const [groups, setGroups] = useState([]);
  
  const dashboard = new ManageDashboard({ userId: session.user.id });

  useEffect(() => {
    const initDashboard = async () => {
      await dashboard.fetch();
      setPosts(dashboard.posts);
    }

    initDashboard();
  }, []);
  // console.log('(dashboard) posts : ', posts);
  
  return (
    <>
      <DocCreationButton userId={session.user.id}/>
      {posts && <Dashboard posts={posts} />}
    </>
  )
}

export default withAuth(page)