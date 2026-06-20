import Image from 'next/image';
import smallLog from '@/public/images/graphics/log-for-dark-small.svg';
import largeLog from '@/public/images/graphics/log-for-dark-large.svg';

const LOGS = { small: smallLog, large: largeLog };

const LogGraphic = ({ variant = 'large', className = '' }) => (
  <div aria-hidden className={`pointer-events-none absolute ${className}`}>
    <Image src={LOGS[variant]} alt="" fill className="object-contain" />
  </div>
);

export default LogGraphic;