import { Button } from '@pagoda/ui/src/components/Button';
import { Card } from '@pagoda/ui/src/components/Card';
import { Flex } from '@pagoda/ui/src/components/Flex';
import { Grid } from '@pagoda/ui/src/components/Grid';
import { HR } from '@pagoda/ui/src/components/HorizontalRule';
import { Section } from '@pagoda/ui/src/components/Section';
import { SvgIcon } from '@pagoda/ui/src/components/SvgIcon';
import { Text } from '@pagoda/ui/src/components/Text';
import { CalendarDots, HandPeace, Plus, Ticket } from '@phosphor-icons/react';

import { useDefaultLayout } from '@/hooks/useLayout';
import { NextPageWithLayout } from '@/types/next';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Section
        style={{
          background: 'linear-gradient(to right, var(--violet9), var(--cyan10))',
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

        <Flex stack gap="xl" gapTablet="l" style={{ zIndex: 5 }}>
          <Flex stack gap="s" style={{ textAlign: 'center' }}>
            <Text as="h1" color="white">
              Easy, robust ticketing for any event
            </Text>
            <Text size="text-2xl" weight={400} color="violet12">
              ...without the crazy fees
            </Text>
          </Flex>

          <Grid columns="1fr 1fr 1fr" columnsTablet="1fr 1fr" columnsPhone="1fr" style={{ textAlign: 'center' }}>
            <Card style={{ backgroundColor: 'var(--whiteA4)', backdropFilter: 'blur(15px)' }}>
              <Flex stack align="center">
                <SvgIcon icon={<CalendarDots weight="thin" />} color="violet12" size="m" />
                <Text color="white">
                  Manage any number of events with configurable ticket purchasing, resale, and refund rules.
                </Text>
              </Flex>
            </Card>

            <Card style={{ backgroundColor: 'var(--whiteA4)', backdropFilter: 'blur(15px)' }}>
              <Flex stack align="center">
                <SvgIcon icon={<Ticket weight="thin" />} color="violet12" size="m" />
                <Text color="white">
                  Scan and verify tickets at your event. Ticket holders will receive a proof of attendance.
                </Text>
              </Flex>
            </Card>

            <Card style={{ backgroundColor: 'var(--whiteA4)', backdropFilter: 'blur(15px)' }}>
              <Flex stack align="center">
                <SvgIcon icon={<HandPeace weight="thin" />} color="violet12" size="m" />
                <Text color="white">Combat scalpers and prioritize ticket sales for previous attendees.</Text>
              </Flex>
            </Card>
          </Grid>
        </Flex>
      </Section>

      <Section>
        <Grid columns="1fr 1fr" gap="xl" columnsTablet="1fr">
          <Flex stack align="start">
            <Text as="h2">Event Producer</Text>

            <Text>
              Sign in to start creating and managing your events. After {`you've`} created an event, {`you'll`} be able
              to share a special link with your attendees and fans for them to purchase tickets.
            </Text>

            <Text size="text-xs" color="sand9">
              Depending on how you configure the event, {`they'll`} be able to transfer, resell, or request a refund.
            </Text>

            <HR />

            <Flex wrap>
              <Button iconLeft={<Plus weight="regular" />} variant="affirmative" label="Create Event" />
              <Button iconLeft={<CalendarDots weight="regular" />} label="Manage Events" />
            </Flex>
          </Flex>

          <Flex stack align="start">
            <Text as="h2">Attendee</Text>

            <Text>
              The event producer will share a special link with you to purchase tickets for their event. If {`you've`}{' '}
              already purchased tickets, sign in to view and manage your tickets.
            </Text>

            <Text size="text-xs" color="sand9">
              Depending on how the producer configured the event, {`you'll`} be able to transfer, resell, or refund your
              tickets.
            </Text>

            <HR />

            <Button iconLeft={<Ticket weight="regular" />} label="View Your Tickets" />
          </Flex>
        </Grid>
      </Section>
    </>
  );
};

Home.getLayout = useDefaultLayout;

export default Home;
