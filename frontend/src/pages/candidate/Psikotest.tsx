import { useParams } from "react-router";
import Cfit from "../../components/candidate/tool-test/Cfit.tsx";
import Disc from "../../components/candidate/tool-test/Disc.tsx";
import Ist from "../../components/candidate/tool-test/Ist.tsx";
import Krapal from "../../components/candidate/tool-test/Krapal.tsx";
import Mbti from "../../components/candidate/tool-test/Mbti.tsx";
import Msdt from "../../components/candidate/tool-test/Msdt.tsx";
import PapiKostick from "../../components/candidate/tool-test/PapiKostick.tsx";

const Psikotest = () => {
  const { name } = useParams();

  if (name === "mbti") {
    return <Mbti />;
  }

  if (name === "papi-kostik") {
    return <PapiKostick />;
  }

  if (name === "msdt") {
    return <Msdt />;
  }

  if (name === "disc") {
    return <Disc />;
  }

  if (name === "cfit") {
    return <Cfit />;
  }

  if (name === "ist") {
    return <Ist />;
  }

  if (name === "krapal") {
    return <Krapal />;
  }

  return (
    <div className="mx-12 my-6">
      <p>{name}</p>
    </div>
  );
};

export default Psikotest;
