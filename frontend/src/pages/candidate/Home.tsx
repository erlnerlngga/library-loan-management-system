import { useAppSelector } from "@/state/redux";
import HomePsikotest from "./HomePsikotest";
import RegisterCandidate from "./Register";

import { useGetCandidateQuery } from "@/state/api";
import { useAuth } from "@/hooks/use-auth";

const Home = () => {
  const currentUser = useAppSelector((state) => state.global.user);
  const { logout } = useAuth();

  const { data } = useGetCandidateQuery({
    currentPage: 1,
    user_id: currentUser!.id!,
  });

  if (!currentUser) {
    logout();
    return;
  }

  if (!data || !data.results || data.results.length === 0) {
    logout();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, have_done, project, user, ...res } = data.results[0];

  const isEmpty = Object.values(res).some((val) => val === "");

  if (isEmpty) {
    return <RegisterCandidate />;
  }

  return <HomePsikotest />;
};

export default Home;
