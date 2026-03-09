export default function Footer() {
  return (
    <footer style={{
      padding: "3rem",
      borderTop: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1.5rem",
    }}>
      <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "1.1rem", letterSpacing: "0.05em", color: "var(--cream-dim)" }}>
        Nadeem © {new Date().getFullYear()}
      </div>

      <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "0.85rem", color: "var(--cream-dim)" }}>
        "Built with intention. Designed with care."
      </div>

      <div style={{ display: "flex", gap: "2rem" }}>
        {[
          { label: "GitHub",    href: "https://github.com/Nadeem-2005"                       },
          { label: "LinkedIn",  href: "https://www.linkedin.com/in/mohammed-nadeem-80628a266" },
          { label: "Instagram", href: "https://www.instagram.com/nadeem._005"                },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--cream-dim)", textDecoration: "none",
            transition: "color 0.3s ease",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--cream)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--cream-dim)"}
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
