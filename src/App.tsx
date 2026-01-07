import "./App.css";
import GamePage from "@/components/page/GamePage/GamePage";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/ui/footer";
import StyleCycler from "@/components/domain/StyleCycler/StyleCycler";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <GamePage />
      <Separator />
      <Footer />
      <StyleCycler />
    </div>
  );
}

export default App;
