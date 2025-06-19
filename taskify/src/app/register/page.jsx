import Registrationform from "../components/registrationForm";
function Registration() {
  return (
    <>
      <div className="p-5 my-5 text-black text-xl flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4"> Taskify</h1>
        <h2 className="text-2xl font-semibold mb-2">Create a new account</h2>
        <h2 className="mb-4">
          {" "}
          Or <a className="text-blue-700">sign in to your existing account</a>
        </h2>
        <Registrationform />
      </div>
    </>
  );
}

export default Registration;
