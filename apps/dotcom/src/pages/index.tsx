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
  const [isTablet, setIsTablet] = useState(false);

  function handleEmailDrop() {
    emailSaved(true);
    fetch('/api/earlyAccess', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
      setIsTablet(window.innerWidth < 1024);
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
          height: isMobile ? '550px' : isTablet ? '375px' : '450px',
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
        <Flex
          direction="column"
          gap="xl"
          style={{ zIndex: 5, margin: 'auto' }}
          tablet={{ gap: 'l' }}
          phone={{ gap: 'm' }}
        >
          <Flex direction="column" gap="s" style={{ textAlign: 'center' }}>
            <Text as="h1" color="white-a12">
              Grow together, share wealth.
            </Text>
            <Text size="text-l" weight={400} color="white-a12">
              Invest in digital assets to provide a brighter future for you and your loved ones.
            </Text>
          </Flex>

          <Grid columns="1fr 1fr" gap="l" phone={{ columns: '1fr' }}>
            <Card>
              <Flex align="center" gap="m">
                <SvgIcon icon={<PiggyBank />} color="violet-8" size="m" />
                <Text color="violet-12" size="text-s">
                  Stash funds with family and friends to learn & grow your digital asset journey together.
                </Text>
              </Flex>
            </Card>

            <Card>
              <Flex align="center" gap="m">
                <SvgIcon icon={<MathOperations />} color="violet-8" size="m" />
                <Text color="violet-12" size="text-s">
                  Choose an investment strategy that matches your comfortable risk level.
                </Text>
              </Flex>
            </Card>

            <Card>
              <Flex align="center" gap="m">
                <SvgIcon icon={<HandCoins />} color="violet-8" size="m" />
                <Text color="violet-12" size="text-s">
                  Share a percentage of the potential growth in your assets with your loved ones.
                </Text>
              </Flex>
            </Card>

            <Card>
              <Flex align="center" gap="m">
                <SvgIcon icon={<CreditCard />} color="violet-8" size="m" />
                <Text color="violet-12" size="text-s">
                  Use your assets as collateral to easily cash-out with the Divvy Wealth VISA card.
                </Text>
              </Flex>
            </Card>
          </Grid>
        </Flex>
      </Section>

      <Section
        style={{
          position: 'relative',
          border: 'none',
          overflow: 'hidden',
          zIndex: 10,
        }}
      >
        <Grid columns="1fr 1fr" gap="xl" phone={{ columns: '1fr' }} tablet={{ columns: '1fr' }}>
          <Flex direction="column" align="center" style={{ marginTop: '10px' }}>
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
          <Flex
            direction="column"
            align={isMobile || isTablet ? 'center' : 'start'}
            gap="s"
            style={{ marginTop: '10px', width: '90%' }}
          >
            <Text as="h2">Get Early Access</Text>
            <Text>Drop your email to get updates & early access.</Text>
            <section className={s.subscribe}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEmailDrop();
                }}
              >
                <Input name="email" onChange={(e) => setEmail(e.target.value)} type="email" required />
                <Text size="text-s" style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>
                  By sharing your email, you agree to receive product updates and other marketing emails from us. You
                  may unsubscribe at any time.
                </Text>
                <Button type="submit" variant="affirmative" label="Get on the list" disabled={emailSubmitted} />
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
