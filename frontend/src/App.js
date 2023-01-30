import { useCookies } from "react-cookie";

function App() {
  const cook  = useCookies('auth_token');
  console.log(cook.pop)
  return (
   <div>
    <h1>logged in successful</h1>
   </div>
  );
}

export default App;
