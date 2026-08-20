import styles from "./StampBack.module.css";

export default function StampBack({ country, year, title, value, description, catalogNo }) {
  return (
    <div className={styles.back}>
      <div>
        <p className={styles.eyebrow}>
          {country} · {year}
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.meta}>
          Face value {value} · Catalogue No. {catalogNo}
        </p>
        <p className={styles.desc}>{description}</p>
      </div>

      <svg className={styles.postmark} width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="32" fill="none" stroke="#443a28" strokeWidth="1.5" />
        <circle cx="36" cy="36" r="26" fill="none" stroke="#443a28" strokeWidth="1" />
        <line x1="4" y1="36" x2="68" y2="36" stroke="#443a28" strokeWidth="1" />
        <text x="36" y="20" textAnchor="middle" fontSize="8" fill="#443a28" fontFamily="Georgia, serif">
          RECEIVED
        </text>
        <text x="36" y="54" textAnchor="middle" fontSize="8" fill="#443a28" fontFamily="Georgia, serif">
          {year}
        </text>
      </svg>
    </div>
  );
}
