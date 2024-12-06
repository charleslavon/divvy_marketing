import { Container, SvgIcon } from '@near-pagoda/ui';
import { GithubLogo, TelegramLogo, Tree, TwitterLogo } from '@phosphor-icons/react';
import Link from 'next/link';

import s from './Header.module.scss';

export const Header = () => {
  return (
    <header className={s.header}>
      <div>
        <Container className={s.container}>
          <Link href={'/'} className={s.logo}>
            <SvgIcon icon={<Tree weight="duotone" />} size="m" />
            Divvy Wealth
          </Link>

          <div className={s.links}>
            <Link href="https://github.com/charleslavon/pagoda-experiments" className={s.link} target="_blank">
              <GithubLogo size={24} color="#a1a19e" />
            </Link>
            <Link href="https://twitter.com/openwebseries" className={s.link}>
              <TwitterLogo size={24} color="#a1a19e" />
            </Link>
            <Link href="https://twitter.com/openwebseries" className={s.link}>
              <TelegramLogo size={24} color="#a1a19e" />
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
};
