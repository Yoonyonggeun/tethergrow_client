const ApiGuideContent = () => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            1
          </span>
          거래소 로그인 후 API 관리 페이지 이동
        </h4>
        <div className="bg-secondary/50 rounded-lg p-4 border border-border/50">
          <p className="text-sm text-muted-foreground mb-2">
            Bybit: 계정 → API 관리
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Bitget: 설정 → API 관리
          </p>
          <p className="text-sm text-muted-foreground">OKX: 계정 → API → 서브 계정 API</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            2
          </span>
          새 API 키 생성 (Read Only 권한만 선택)
        </h4>
        <div className="bg-loss/10 rounded-lg p-4 border border-loss/20">
          <p className="text-sm text-loss">⚠️ 중요: "출금" 권한은 절대 활성화하지 마세요!</p>
          <p className="text-sm text-muted-foreground mt-2">Read / View 권한만 선택하면 안전합니다.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            3
          </span>
          생성된 키 복사 후 입력
        </h4>
        <div className="bg-profit/10 rounded-lg p-4 border border-profit/20">
          <p className="text-sm text-profit">
            ✓ Access Key와 Secret Key를 복사하여 위 폼에 입력하세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiGuideContent;
