export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "60px",
        padding: "20px",
        background: "#f5f5f5",
        textAlign: "center",
        fontSize: "14px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        © {new Date().getFullYear()} JELUDA
      </div>

      <div>
        <a href="/aviso-legal">Aviso legal</a> |{" "}
        <a href="/politica-privacidad">Política de privacidad</a> |{" "}
        <a href="/politica-cookies">Política de cookies</a>
      </div>
    </footer>
  );
}