import { HeaderContainer } from './styles';

import logoImage from '../../assets/logo.svg';
import Link from 'next/link';
import Image from 'next/image';
import Cart from '../Cart';

export default function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImage.src} alt="Image logo" width={130} height={136} />
      </Link>

      <Cart />
    </HeaderContainer>
  );
}
