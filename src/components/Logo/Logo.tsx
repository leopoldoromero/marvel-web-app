import Image from "next/image";
import Link from "next/link";

const Logo = () => (
    <Link href='/'>
        <Image
            priority
            src="/marvel_logo.svg"
            alt='marvel_logo'
            width={130}
            height={52}
        />
    </Link>
)

export default Logo;