// Section headings are written as HTTP routes: a small nod to backend work.
export default function Section({ id, method = "GET", route, title, children }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <p className="route"><span className={`method method-${method.toLowerCase()}`}>{method}</span> {route}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}
