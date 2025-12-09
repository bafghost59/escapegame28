import FormulaireConnexion from "../Components/FormulaireConnexion";

const PageConnexion = ({setIsLoggedIn, setUser}) => {
  return (<>
  <FormulaireConnexion setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
  </>
  );
};

export default PageConnexion;

