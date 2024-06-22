import { Button } from '@pagoda/ui/src/components/Button';
import { Card } from '@pagoda/ui/src/components/Card';
import { Container } from '@pagoda/ui/src/components/Container';
import { Flex } from '@pagoda/ui/src/components/Flex';
import { Form } from '@pagoda/ui/src/components/Form';
import { HR } from '@pagoda/ui/src/components/HorizontalRule';
import { Input } from '@pagoda/ui/src/components/Input';
import { Section } from '@pagoda/ui/src/components/Section';
import { SvgIcon } from '@pagoda/ui/src/components/SvgIcon';
import { Text } from '@pagoda/ui/src/components/Text';
import { openToast } from '@pagoda/ui/src/components/Toast';
import { handleClientError } from '@pagoda/ui/src/utils/error';
import {
  ArrowRight,
  CalendarPlus,
  CurrencyDollar,
  HashStraight,
  MapPinArea,
  Note,
  Tag,
  Ticket,
  Trash,
} from '@phosphor-icons/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, use, useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { useProducerLayout } from '@/hooks/useLayout';
import { useWalletStore } from '@/stores/wallet';
import { EVENTS_WORKER_BASE, KEYPOM_EVENTS_CONTRACT } from '@/utils/common';
import { createPayload, FormSchema, serializeMediaForWorker, TicketInfoFormMetadata } from '@/utils/helpers';
import { NextPageWithLayout } from '@/utils/types';

import TicketForm from './TicketForm';

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CreateEvent: NextPageWithLayout = () => {
  const wallet = useWalletStore((state) => state.wallet);
  const form = useForm<FormSchema>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'eventTickets', // unique name for your Field Array
    rules: { minLength: 1 },
  });
  const router = useRouter();
  const [submittingEvent, setSubmittingEvent] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [ticketImages, setTicketImages] = useState<string[]>([]);
  const [txnSuccess, setTxnSuccess] = useState(false);

  const placeHolderTicket: TicketInfoFormMetadata = {
    name: 'General Admission',
    price: '0',
    denomination: 'Near',
    maxSupply: 1,
    maxPurchases: 1,
  };

  useEffect(() => {
    console.log('useEffect: form', form);
  }, [submittingEvent, form]);

  const onValidSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      console.log('TODO: Submit data to API', data);
      const formValue = form.getValues();

      if (!wallet) return;
      const accounts = await wallet.getAccounts();
      const accountId = accounts[0]?.accountId;

      setSubmittingEvent(true);
      console.log('wallet ', wallet);
      console.log('wallet accounts', accounts);
      console.log('wallet accountId', accountId);
      console.log('Is the form valid?', form.formState.isValid);
      console.log('here is are the values', formValue);
      if (form.formState.isValid) {
        const serializedData = await serializeMediaForWorker(form as unknown as FormSchema);
        let response: Response | undefined;
        console.log('serializedData', serializedData);
        try {
          const url = `${EVENTS_WORKER_BASE}/ipfs-pin`;
          response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ base64Data: serializedData }),
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error in payAndCreateEvent', error);
        }

        if (response?.ok) {
          const resBody = await response.json();
          const cids: string[] = resBody.cids;

          const eventArtworkCid: string = cids[0] as string;
          const ticketArtworkCids: string[] = [];
          for (let i = 0; i < cids.length - 1; i++) {
            ticketArtworkCids.push(cids[i + 1] as string);
          }

          const eventId = Date.now().toString();
          const { actions, dropIds }: { actions: Action[]; dropIds: string[] } = await createPayload({
            accountId: accountId!,
            formData: formValue,
            eventId,
            eventArtworkCid,
            ticketArtworkCids,
          });

          // Store event name, stripe account ID, event ID, object mapping ticket drop ID to USD cents
          // ONLY if the user has accepted stripe payments
          // if (form.acceptStripePayments && form.stripeAccountId) {
          //   const stripeAccountId = form.stripeAccountId;

          //   const priceByDropId = {};
          //   for (let i = 0; i < form.tickets.length; i++) {
          //     const ticketDropId = dropIds[i];
          //     const priceCents = Math.round(
          //       parseFloat(form.tickets[i].priceNear) * form.nearPrice! * 100,
          //     );
          //     priceByDropId[ticketDropId] = priceCents;
          //   }
          //   const stripeAccountInfo = {
          //     stripeAccountId,
          //     eventId,
          //     eventName: form.eventName.value,
          //     priceByDropId,
          //   };
          //   localStorage.setItem('EVENT_INFO_SUCCESS_DATA', JSON.stringify(stripeAccountInfo));
          // } else {
          //   localStorage.setItem('EVENT_INFO_SUCCESS_DATA', JSON.stringify({ eventId }));
          // }

          wallet
            .signAndSendTransaction({
              signerId: wallet.id!,
              receiverId: KEYPOM_EVENTS_CONTRACT,
              actions,
            })
            .then(() => {
              setTxnSuccess(true);
            })
            .catch((err) => {
              const error: string = err.toString();
              const description_string = `Error: ` + error;
              openToast({
                title: 'Event Creation Failed',
                description: description_string,
                duration: 5000,
              });
            });
        } else {
          openToast({
            type: 'error',
            title: 'Error with form submission',
          });
        }
      }

      // const serializedData = await serializeMediaForWorker(form as unknown as FormSchema);

      // let response: Response | undefined;

      // const url = `${EVENTS_WORKER_BASE}/ipfs-pin`;
      // response = await fetch(url, {
      //   method: 'POST',
      //   body: JSON.stringify({ base64Data: serializedData }),
      // });

      // await timeout(1000);
      // const newEventId = 123;

      // openToast({
      //   type: 'success',
      //   title: 'Event Created',
      // });

      // router.push(`/events/${newEventId}`);

      setSubmittingEvent(false);
    } catch (error) {
      handleClientError({ error });
    }
  };

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>, index: null | number) => {
    if (!event.target) return;
    if (!event.target.files) return;
    const file = event.target?.files[0];
    const urlImage = URL.createObjectURL(file as Blob);

    if (index !== null) {
      console.log('index -----', index);
      let ticketImagesUpdate = ticketImages;
      ticketImagesUpdate[index] = urlImage;

      setTicketImages(ticketImagesUpdate);
      console.log('ticketImages', ticketImages);
    } else {
      console.log('index ----- this is event image', index);
      setPreviewImage(urlImage);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Event</title>
      </Head>

      <Section
        grow="available"
        style={{
          background: 'linear-gradient(to bottom right, var(--violet4), var(--cyan3))',
        }}
      >
        <Container size="s" style={{ margin: 'auto' }}>
          <Form onSubmit={form.handleSubmit(onValidSubmit)}>
            <Flex stack gap="l">
              <Flex align="center">
                <SvgIcon icon={<CalendarPlus />} color="sand12" size="m" />

                <Text as="h3" style={{ marginRight: 'auto' }}>
                  Create New Event
                </Text>
              </Flex>

              <Card>
                <Input
                  label="Name"
                  iconLeft={<Tag />}
                  error={form.formState.errors.name?.message}
                  {...form.register('name', {
                    required: 'Please enter a name',
                  })}
                />

                <Input
                  label="Description"
                  iconLeft={<Note />}
                  error={form.formState.errors.description?.message}
                  {...form.register('description')}
                />

                <Input
                  label="Location"
                  iconLeft={<MapPinArea />}
                  error={form.formState.errors.location?.message}
                  {...form.register('location', {
                    required: 'Please enter a location',
                  })}
                />

                <Input
                  label="Date"
                  type="date"
                  error={form.formState.errors.date?.message}
                  {...form.register('date', {
                    required: 'Please enter a date',
                  })}
                />

                <Flex stack="phone">
                  <Input
                    label="Start Time"
                    type="time"
                    error={form.formState.errors.startTime?.message}
                    {...form.register('startTime')}
                  />

                  <Input
                    label="End Time"
                    type="time"
                    error={form.formState.errors.endTime?.message}
                    {...form.register('endTime')}
                  />
                </Flex>

                <Flex stack="phone">
                  <label>
                    Event Image
                    {previewImage && (
                      <Card style={{ margin: '1em 0 1em 0' }}>{<img src={previewImage} alt="Event Image" />}</Card>
                    )}
                    <br />
                    <br />
                    <input
                      type="file"
                      {...form.register('eventArtwork')}
                      onChange={(e) => handleUploadedFile(e, null)}
                    />
                  </label>
                </Flex>

                <HR />

                {fields.map((field, index) => (
                  <Card key={field.id}>
                    <Flex stack="phone">
                      <Input
                        label="Ticket Name"
                        placeholder="General Admission"
                        iconLeft={<Tag />}
                        // name={`eventTickets[${index}].name`}
                        // error={form.formState.errors.ticketName?.message}
                        {...form.register(`eventTickets.${index}.name`)}
                      />
                    </Flex>
                    <Flex stack="phone" style={{ display: 'block' }}>
                      <label> Payment Type</label>
                      <select {...form.register(`eventTickets.${index}.denomination`)}>
                        <option value="Near">Near</option>
                        <option disabled value="USD">
                          USD
                        </option>
                      </select>
                    </Flex>
                    <Flex stack="phone">
                      <Input
                        label="Ticket Price"
                        placeholder="Free"
                        iconLeft={<CurrencyDollar />}
                        number={{
                          allowNegative: false,
                        }}
                        // name={`eventTickets[${index}].ticketPrice`}
                        //  error={form.formState.errors.ticketPrice?.message}
                        //  {...form. ('ticketPrice')}
                        {...form.register(`eventTickets.${index}.price`)}
                      />

                      <Input
                        label="Total Supply"
                        placeholder="Unlimited"
                        type="number"
                        iconLeft={<Ticket />}
                        number={{
                          allowNegative: false,
                          allowDecimal: false,
                        }}
                        //  error={form.formState.errors.ticketQuantityLimit?.message}
                        {...form.register(`eventTickets.${index}.maxSupply`)}
                      />
                      <Input
                        label="Quantity Limit"
                        placeholder="Unlimited"
                        type="number"
                        iconLeft={<HashStraight />}
                        number={{
                          allowNegative: false,
                          allowDecimal: false,
                        }}
                        //  error={form.formState.errors.ticketQuantityLimit?.message}
                        {...form.register(`eventTickets.${index}.maxPurchases`)}
                      />
                    </Flex>

                    <div style={{ display: 'block' }}>
                      <label>
                        Ticket Artwork
                        <br />
                        <br />
                        {ticketImages && (
                          <Card style={{ margin: '1em 0 1em 0' }}>
                            {<img src={ticketImages[index]} alt="Event Image" />}
                          </Card>
                        )}
                        <input
                          type="file"
                          {...form.register(`eventTickets.${index}.artwork`)}
                          onChange={(e) => handleUploadedFile(e, index)}
                        />
                      </label>
                    </div>

                    <div style={{ margin: 'auto' }}>
                      <Button
                        variant="destructive"
                        label="Remove Option"
                        iconRight={<Trash />}
                        onClick={() => {
                          remove(index);
                        }}
                      />
                    </div>
                  </Card>
                  // <TicketForm key={index} id={field.id} form={form} />
                ))}

                <Button
                  variant="secondary"
                  label="Add Ticket"
                  onClick={() => {
                    append(placeHolderTicket);
                  }}
                />
              </Card>

              <Flex justify="end">
                <Button
                  type="submit"
                  variant="affirmative"
                  label="Create Event"
                  iconRight={<ArrowRight />}
                  loading={form.formState.isSubmitting}
                />
              </Flex>
            </Flex>
          </Form>
        </Container>
      </Section>
    </>
  );
};

CreateEvent.getLayout = useProducerLayout;

export default CreateEvent;
