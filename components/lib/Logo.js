import Image from 'next/image';
import logoBlack from '@/public/images/classic-log-homes.svg';
import logoWhite from '@/public/images/classic-log-homes-white.svg';
import Link from 'next/link';

const Logo = ({ height, width, url, white = false }) => {
    return (
        <Link href='/'>
            <div className='z-[9999]'>
                <Image
                    src={url || (white ? logoWhite : logoBlack)}
                    alt='logo'
                    width={width}
                    height={height}
                />
            </div>
        </Link>
    );
};

export default Logo;