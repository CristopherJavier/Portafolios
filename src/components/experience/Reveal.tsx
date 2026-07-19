interface RevealProps { children: any; className?: string; delay?: string; key?: string | number; }
export function Reveal({ children, className = '', delay = '' }: RevealProps) {
  return <div className={`reveal ${delay} ${className}`.trim()}>{children}</div>;
}
