import { Container, Text } from '@near-pagoda/ui';

import NearLogoSvg from '@/svg/near-logo.svg';

import s from './Footer.module.scss';

//also checkout these terms - https://www.proximity.dev/termsofuse
export const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container className={s.container}>
        <div className={s.links}>
          <a className={s.logo} href="https://www.bankless.com/terms" target="_blank">
            <Text size="text-xs" color="current">
              Terms of Use
            </Text>
          </a>
          <a className={s.logo} href="https://www.bankless.com/disclosures" target="_blank">
            <Text size="text-xs" color="current">
              Disclaimer
            </Text>
          </a>
          <div className={s.copyright}>
            <Text size="text-xs">© 2024 CJ Stealth Apps</Text>
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
