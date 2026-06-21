import { TRUST_COMPANIES } from "./hero.constants";

export function TrustStrip() {
    return (
        <div
            style={{
                position: "relative",
                zIndex: 10,
                borderTop: "1px solid rgba(255,255,255,0.05)",
                padding: "28px 24px",
            }}
        >
            <div
                style={{
                    maxWidth: 900,
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                <p style={{ fontSize: 11, fontWeight: 500, color: "#2d2b42", letterSpacing: "0.09em", textTransform: "uppercase" }}>
                    Helped candidates land roles at
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 36, alignItems: "center" }}>
                    {TRUST_COMPANIES.map((co) => (
                        <span key={co} className="logo-chip">
                            {co}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}