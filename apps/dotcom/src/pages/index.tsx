import { Button, Card, Flex, Grid, Input, Section, SvgIcon, Text } from '@near-pagoda/ui';
import { CreditCard, HandCoins, MathOperations, PiggyBank } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { useDefaultLayout } from '@/hooks/useLayout';
import { NextPageWithLayout } from '@/utils/types';

import s from './Index.module.scss';

const Home: NextPageWithLayout = () => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, emailSaved] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleEmailDrop() {
    console.log('User submitted ', email);
    if (email === '') return;
    //todo send email somewhere and update the form.
    emailSaved(true);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 860);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '55%',
          zIndex: -1,
          marginBottom: '10px',
        }}
      >
        <video autoPlay muted loop id="myVideo" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="mesh.mp4" type="video/mp4" />
        </video>
      </div>
      <Section
        grow="available"
        style={{
          position: 'relative',
          border: 'none',
          overflow: 'hidden',
        }}
      >
        <Flex stack gap="xl" gapTablet="l" style={{ zIndex: 5, margin: 'auto' }}>
          <Flex stack gap="s" style={{ textAlign: 'center' }}>
            <Text as="h1" color="white">
              Grow together, share wealth.
            </Text>
            <Text size="text-l" weight={400} color="violet12">
              Invest in digital assets to provide a brighter future for you and your loved ones.
            </Text>
          </Flex>

          <Grid columns="1fr 1fr" columnsTablet="1fr 1fr" columnsPhone="1fr 1fr" gap="l" gapPhone="m">
            <Card>
              <Flex style={{ margin: 'auto 0' }} align="center">
                <SvgIcon icon={<PiggyBank />} color="violet8" size="m" />
                <Text color="violet12" size="text-s">
                  Stash funds with family and friends to learn & grow your digital asset journey together.
                </Text>
              </Flex>
            </Card>

            <Card>
              <Flex style={{ margin: 'auto 0' }} align="center">
                <SvgIcon icon={<MathOperations />} color="violet8" size="m" />
                <Text color="violet12" size="text-s">
                  Choose an investment strategy that matches your comfortable risk level.
                </Text>
              </Flex>
            </Card>

            <Card>
              <Flex style={{ margin: 'auto 0' }} align="center">
                <SvgIcon icon={<HandCoins />} color="violet8" size="m" />
                <Text color="violet12" size="text-s">
                  Share a percentage of the potential growth in your assets with your loved ones.
                </Text>
              </Flex>
            </Card>

            <Card>
              <Flex style={{ margin: 'auto 0' }} align="center">
                <SvgIcon icon={<CreditCard />} color="violet8" size="m" />
                <Text color="violet12" size="text-s">
                  Use your assets as collateral to easily cash-out with the Divvy Wealth VISA card.
                </Text>
              </Flex>
            </Card>
          </Grid>
        </Flex>
      </Section>

      <Section>
        <Grid columns="1fr 1fr" gap="xl" columnsTablet="1fr">
          <Flex stack align="start">
            <Text as="h2">The Litepaper</Text>
            <div
              style={{
                border: '1px solid lightgrey',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#f0efec',
              }}
            >
              {isMobile ? (
                <div style={{ textAlign: 'center' }}>
                  <Text>Please download the PDF for the best viewing experience</Text>
                  <Button
                    type="button"
                    variant="affirmative"
                    label="Download"
                    onClick={() => window.open('litepaper.pdf', '_blank')}
                  />
                </div>
              ) : (
                <embed src="litepaper.pdf" width="580px" height="625px" />
              )}
            </div>
          </Flex>
          <Flex stack align="start">
            <Text as="h2">Get Early Access</Text>
            <Text>Drop your email to get updates & early access.</Text>
            <section className={s.subscribe}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEmailDrop();
                }}
              >
                <Input name="email" onChange={(e) => setEmail(e.target.value)} type="email" />
                <Text size="text-s" style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>
                  By sharing your email, you agree to receive product updates and other marketing emails from us. You
                  may unsubscribe at any time.
                </Text>
                <Button
                  type="button"
                  variant="affirmative"
                  label="Get on the list"
                  style={{
                    marginLeft: 'auto',
                  }}
                  disabled={emailSubmitted}
                  onClick={handleEmailDrop}
                />
                {emailSubmitted && <Text className={s.fade}>Thanks, we&apos;ll be in touch.</Text>}
              </form>
            </section>
          </Flex>
        </Grid>
      </Section>
    </>
  );
};

Home.getLayout = useDefaultLayout;

export default Home;
