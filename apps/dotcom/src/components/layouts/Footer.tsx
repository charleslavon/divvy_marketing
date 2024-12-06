import { Flex, Grid, Text } from '@near-pagoda/ui';

import NearLogoSvg from '@/svg/near-logo.svg';

import s from './Footer.module.scss';

//also checkout these terms - https://www.proximity.dev/termsofuse
// https://www.bankless.com/disclosures

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <Flex gap="s">
        <Grid columns="1fr 1fr 1fr 1fr" gap="3xl" phone={{ columns: '1fr 1fr 1fr', gap: 'm' }}>
          <a className={s.logo} href="/terms">
            <Text size="text-xs">Terms of Use</Text>
          </a>
          <a className={s.logo} href="/privacy">
            <Text size="text-xs">Privacy Policy</Text>
          </a>
          <div className={s.near}>
            <a className={s.logo} href="https://near.org" target="_blank">
              <Text size="text-xs" style={{ paddingRight: '5px', display: 'inline' }}>
                Powered by
              </Text>
              <NearLogoSvg style={{ display: 'inline', verticalAlign: 'middle' }} />
            </a>
          </div>
          <Text size="text-xs">© 2024 Divvy Wealth</Text>
        </Grid>
      </Flex>
    </footer>
  );
};
