import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/lib/components/Loading"; // You can replace this with your loading component

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Check if the user is authenticated
    if (status === "loading") {
      return <Loading />;
    }

    if (!session) {
      // Redirect to the login page if not authenticated
      alert('you have to login!');
      router.replace("/signIn");
      return null;
    }

    // If authenticated, render the wrapped component
    return <WrappedComponent {...props} session={session} router={router} />;
  };
};

export default withAuth;
