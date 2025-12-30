const TrustBadges = () => {
  return (
    <div className="glass-card p-6">
      <p className="text-sm text-muted-foreground text-center">
        전 세계 <span className="font-mono text-primary">2,847+</span> 트레이더가 신뢰합니다
      </p>
      <div className="flex justify-center gap-4 mt-4">
        {["256-bit SSL", "GDPR", "ISO 27001"].map((badge) => (
          <div
            key={badge}
            className="px-3 py-1 bg-secondary/50 rounded-md text-xs font-mono text-muted-foreground border border-border/50"
          >
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
