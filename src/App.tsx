import "./App.css";
import GamePage from "@/components/page/GamePage/GamePage";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/ui/footer";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <GamePage />
      <Separator />
      <Footer />
    </div>
  );
}

export default App;
