import { Button, Card, Flex, Grid, HR, Input, Section, SvgIcon, Text } from '@near-pagoda/ui';
import { CalendarDots, HandPeace, Ticket } from '@phosphor-icons/react';
import { useState } from 'react';

import { useDefaultLayout } from '@/hooks/useLayout';
import { NextPageWithLayout } from '@/utils/types';

import s from './Index.module.scss';

const Home: NextPageWithLayout = () => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, emailSaved] = useState(false);

  function handleEmailDrop() {
    console.log('User submitted ', email);
    if (email === '') return;
    //todo send email somewhere and update the form.
    emailSaved(true);
  }
  return (
    <>
      <Section
        grow="available"
        style={{
          position: 'relative',
          background: 'linear-gradient(to right, var(--violet9), var(--cyan10))',
          border: 'none',
          overflow: 'hidden',
        }}
      >
        <img
          src="/images/hero-background.jpg"
          alt=""
          style={{
            position: 'absolute',
            zIndex: 0,
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.1,
            filter: 'saturate(0%) blur(2px)',
          }}
        />

        <Flex stack gap="xl" gapTablet="l" style={{ zIndex: 5, margin: 'auto' }}>
          <Flex stack gap="s" style={{ textAlign: 'center' }}>
            <Text as="h1" color="white">
              Our elevator pitch title
            </Text>
            <Text size="text-2xl" weight={400} color="violet12">
              ...detailed subtitle/hook
            </Text>
          </Flex>

          <Grid columns="1fr 1fr 1fr" columnsTablet="1fr 1fr" columnsPhone="1fr" gap="l" gapPhone="m">
            <Card>
              <Flex style={{ margin: 'auto 0' }} align="center">
                <SvgIcon icon={<CalendarDots />} color="violet8" size="m" />
                <Text color="violet12" size="text-s">
                  Just as we need third spaces irl —public areas that foster creativity, interactions, and diverse
                  opinions
                </Text>
              </Flex>
            </Card>

            <Card>
              <Flex style={{ margin: 'auto 0' }} align="center">
                <SvgIcon icon={<Ticket />} color="violet8" size="m" />
                <Text color="violet12" size="text-s">
                  we also need essential tools and technologies to be easily understandable, with relevant use-cases
                </Text>
              </Flex>
            </Card>

            <Card>
              <Flex style={{ margin: 'auto 0' }} align="center">
                <SvgIcon icon={<HandPeace />} color="violet8" size="m" />
                <Text color="violet12" size="text-s">
                  for the equitable benefit of society, to accelerate creativity, and drive new economies.
                </Text>
              </Flex>
            </Card>
          </Grid>
        </Flex>
      </Section>

      <Section>
        <Grid columns="1fr 1fr" gap="xl" columnsTablet="1fr">
          <Flex stack align="start">
            <Text as="h2">Our Values</Text>

            <Text>
              We build apps that exemplify how investments in public good technologies facilitate economic mobility.
            </Text>

            <Text>More Detail...</Text>
          </Flex>
          <Flex stack align="start">
            <Text as="h2">Get Early Access</Text>

            <Text>Drop your email to get first access to our latest apps.</Text>

            <section className={s.subscribe}>
              <Input name="email" onChange={(e) => setEmail(e.target.value)} />
              <Button
                type="button"
                variant="affirmative"
                label="Receive Updates"
                style={{ marginLeft: 'auto' }}
                disabled={emailSubmitted}
                onClick={handleEmailDrop}
              />
              {emailSubmitted && <Text className={s.fade}>Thanks, we&apos;ll be in touch.</Text>}
              <HR />
            </section>
          </Flex>
        </Grid>
      </Section>
    </>
  );
};

Home.getLayout = useDefaultLayout;

export default Home;
