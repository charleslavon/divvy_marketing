import { Container, Text } from '@near-pagoda/ui';

import NearLogoSvg from '@/svg/near-logo.svg';

import s from './Footer.module.scss';

//also checkout these terms - https://www.proximity.dev/termsofuse
// https://www.bankless.com/disclosures

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container className={s.container}>
        <div className={s.links}>
          <a className={s.logo} href="/terms">
            <Text size="text-xs" color="current">
              Terms
            </Text>
          </a>
          <a className={s.logo} href="/privacy">
            <Text size="text-xs" color="current">
              Privacy
            </Text>
          </a>
          <div className={s.copyright}>
            <Text size="text-xs">© 2024 Divvy Wealth</Text>
          </div>
        </div>
        <div className={s.near}>
          <a className={s.logo} href="https://near.org" target="_blank">
            <Text size="text-xs" color="current">
              Powered by
            </Text>
            <NearLogoSvg />
          </a>
        </div>
      </Container>
    </footer>
  );
};
