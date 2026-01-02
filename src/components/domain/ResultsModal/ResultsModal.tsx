import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ResultsContent from "@/components/domain/ResultsContent/ResultsContent";
import type { BatchGuessValidationView } from "@/model/view/BatchGuessValidationView";

interface ResultsModalProps {
  results: BatchGuessValidationView;
  guesses: Map<number, number | null>;
  onClose: () => void;
}

const ResultsModal = ({ results, guesses, onClose }: ResultsModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[90vw] md:max-w-4xl flex flex-col p-0">
        <div className="sticky top-0 bg-background rounded-t-lg px-6 pt-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle className="text-center">Results</DialogTitle>
          </DialogHeader>
        </div>

        <div className="overflow-y-auto">
          <ResultsContent
            results={results}
            guesses={guesses}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;
