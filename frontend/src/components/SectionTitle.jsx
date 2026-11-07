export default function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={`section-heading ${align === 'left' ? 'text-left' : 'text-center'}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="muted-text max-w-2xl">{description}</p> : null}
    </div>
  );
}
