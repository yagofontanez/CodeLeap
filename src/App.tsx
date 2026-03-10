import { SignupModal } from "./components/SignupModal";
import { MainPage } from "./pages/MainPage";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const username = useAuthStore((state) => state.username);

  return (
    <div>
      {!username && <SignupModal onConfirm={() => {}} />}
      {username && <MainPage />}
    </div>
  );
}

export default App;
