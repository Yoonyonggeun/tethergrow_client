import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/core/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import ApiGuideContent from "./ApiGuideContent";

const ApiGuideDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-primary hover:underline mx-auto"
        >
          <HelpCircle className="w-4 h-4" />
          API 키 발급 방법을 모르시나요? 30초 가이드 보기
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>API 키 발급 가이드</DialogTitle>
        </DialogHeader>
        <ApiGuideContent />
      </DialogContent>
    </Dialog>
  );
};

export default ApiGuideDialog;
