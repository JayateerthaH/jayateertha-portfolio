// Microservices architecture as a responsive grid diagram (no image, readable on phones).
const SERVICES = [
  ["auth-service", "authdb"],
  ["events-service", "eventsdb"],
  ["management-service", "managementdb"],
  ["attendance-service", "attendancedb"],
  ["dashboard-service", "dashboarddb"],
  ["scheduler-service", "schedulardb · Quartz"],
  ["email-service", "Brevo API"],
];

export default function Architecture() {
  return (
    <figure className="arch" aria-label="Microservices architecture diagram">
      <div className="arch-row">
        <div className="arch-node client">Client <small>HTTPS + Bearer JWT</small></div>
      </div>
      <div className="arch-arrow" aria-hidden="true">↓</div>
      <div className="arch-row arch-edge">
        <div className="arch-node gateway">
          gateway-service <small>Spring Cloud Gateway · JWT validated here · only public port</small>
        </div>
        <div className="arch-side">
          <div className="arch-node infra">eureka-server <small>service registry</small></div>
          <div className="arch-node infra">configuration-server <small>per-service YAML</small></div>
        </div>
      </div>
      <div className="arch-arrow" aria-hidden="true">↓ <span>lb://service-name + internal key</span></div>
      <div className="arch-services">
        {SERVICES.map(([s, db]) => (
          <div key={s} className="arch-node svc">
            {s}
            <small>{db}</small>
          </div>
        ))}
      </div>
      <figcaption>
        Services call each other with OpenFeign by name. Every service loads <code>event-security-common</code>, which rejects requests without the internal key. Only the gateway is on the public Docker network.
      </figcaption>
    </figure>
  );
}
