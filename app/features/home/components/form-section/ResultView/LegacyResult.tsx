import { ArrowRight, Gift } from "lucide-react";
import { Button } from "~/core/components/ui/button";

interface LegacyResultProps {
  onSubmit: () => void;
}

const LegacyResult = ({ onSubmit }: LegacyResultProps) => {
  return (
    <div className="space-y-4">
      <div className="p-5 bg-loss/10 border border-loss/20 rounded-xl text-center">
        <p className="text-sm text-muted-foreground mb-1">최근 90일 지출 수수료</p>
        <p className="font-mono text-3xl font-bold text-loss">-1,240 USDT</p>
      </div>

      <div className="p-5 bg-profit/10 border border-profit/20 rounded-xl text-center">
        <p className="text-sm text-muted-foreground mb-1">페이백 받았을 경우</p>
        <p className="font-mono text-3xl font-bold text-profit">+620 USDT 적립 가능</p>
      </div>

      <Button
        onClick={onSubmit}
        className="w-full bg-gradient-to-r from-primary to-profit hover:opacity-90 text-primary-foreground h-14 text-base font-semibold"
      >
        <Gift className="w-5 h-5 mr-2" />
        초기 멤버 합류하고 90 USDT 크레딧 받기
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};

export default LegacyResult;
