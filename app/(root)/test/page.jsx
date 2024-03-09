"use client"
import withAuth from "@/lib/components/withAuth";
import Test from "@/lib/components/Test";

const page = ({ session }) => {
  return (
    <Test />
  )
}

export default withAuth(page)