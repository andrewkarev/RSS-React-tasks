import ValidationMessage from 'components/validation-message';
import ICard from 'interfaces/ICard';
import IFormValues from 'interfaces/IFormValues';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './form.module.css';
import pngUrl from '../../assets/images/John_Doe.jpeg';

interface FormProps {
  addNewCards: (newCard: ICard) => void;
}

const Form: React.FC<FormProps> = ({ addNewCards }) => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      characterName: '',
      characterStatus: 'Alive',
      characterSpecies: 'Human',
      characterGender: '',
      characterOrigin: '',
      characterLocation: '',
      characterDateOfCreation: '',
      characterAvatar: null,
      agreement: false,
    },
  });

  const [isCardCreationSuccessful, setIsCardCreationSuccessful] = useState(() => false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const [hasErrors, setHasErrors] = useState(false);

  const onSubmit = (data: IFormValues) => {
    const file = data.characterAvatar
      ? window.URL.createObjectURL(data.characterAvatar[0])
      : pngUrl;

    const card = {
      name: data.characterName,
      status: data.characterStatus,
      species: data.characterSpecies,
      gender: data.characterGender,
      origin: { name: data.characterOrigin },
      location: { name: data.characterLocation },
      image: file,
      created: data.characterDateOfCreation,
    };

    addNewCards(card);
    reset();
    setIsCardCreationSuccessful(() => true);

    setTimeout(() => {
      setIsCardCreationSuccessful(() => false);
    }, 2000);

    setIsSubmitButtonDisabled(() => true);
    setHasErrors(() => false);
  };

  const onError = () => {
    setIsSubmitButtonDisabled(() => true);
    setHasErrors(() => true);
  };

  const onReset = () => {
    reset();
    setIsCardCreationSuccessful(() => false);
    setIsSubmitButtonDisabled(() => true);
  };

  const onChange = async () => {
    if (hasErrors) {
      const result = await trigger();

      setIsSubmitButtonDisabled(() => !result);
    } else {
      setIsSubmitButtonDisabled(() => false);
    }
  };

  return (
    <form
      className={styles['form']}
      data-testid={'form'}
      onSubmit={handleSubmit(onSubmit, onError)}
      onReset={onReset}
      onChange={onChange}
    >
      <div className={styles['character-name']}>
        <label className={styles['character-name-label']} htmlFor="character-name">
          Enter your character name
        </label>
        <input
          id="character-name"
          className={`${styles['character-name-input']} ${
            styles[!errors.characterName ? 'input' : 'input-invalid']
          }`}
          data-testid={'character-name'}
          {...register('characterName', {
            required: true,
          })}
        />
        <ValidationMessage isValid={!errors.characterName} message={'This field cannot be empty'} />
      </div>
      <div className={styles['character-status']}>
        <label className={styles['character-status-label']} htmlFor="character-status">
          Choose your character status
        </label>
        <select
          id="character-status"
          className={`${styles['character-status-select']} ${styles['input']}`}
          {...register('characterStatus')}
          data-testid={'character-status'}
        >
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className={styles['character-species']}>
        <label className={styles['character-species-label']} htmlFor="character-species">
          Choose your character species
        </label>
        <select
          id="character-species"
          className={`${styles['character-species-select']} ${styles['input']}`}
          {...register('characterSpecies')}
          data-testid={'character-species'}
        >
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>
      </div>
      <div className={styles['character-gender']}>
        <label className={styles['character-gender-label']} htmlFor="character-gender">
          Enter your character gender
        </label>
        <input
          id="character-gender"
          className={`${styles['character-gender-input']} ${
            styles[!errors.characterGender ? 'input' : 'input-invalid']
          }`}
          data-testid={'character-gender'}
          {...register('characterGender', {
            required: true,
          })}
        />
        <ValidationMessage
          isValid={!errors.characterGender}
          message={'This field cannot be empty'}
        />
      </div>
      <div className={styles['character-origin']}>
        <label className={styles['character-origin-label']} htmlFor="character-origin">
          Enter where are your character from
        </label>
        <input
          id="character-origin"
          className={`${styles['character-origin-input']} ${
            styles[!errors.characterOrigin ? 'input' : 'input-invalid']
          }`}
          data-testid={'character-origin'}
          {...register('characterOrigin', {
            required: true,
          })}
        />
        <ValidationMessage
          isValid={!errors.characterOrigin}
          message={'This field cannot be empty'}
        />
      </div>
      <div className={styles['character-location']}>
        <label className={styles['character-location-label']} htmlFor="character-location">
          Enter your character current location
        </label>
        <input
          id="character-location"
          className={`${styles['character-location-input']} ${
            styles[!errors.characterLocation ? 'input' : 'input-invalid']
          }`}
          {...register('characterLocation', {
            required: true,
          })}
          data-testid={'character-location'}
        />
        <ValidationMessage
          isValid={!errors.characterLocation}
          message={'This field cannot be empty'}
        />
      </div>
      <div className={styles['character-date-of-creation']}>
        <label
          className={styles['character-date-of-creation-label']}
          htmlFor="character-date-of-creation"
        >
          Choose when your character was created
        </label>
        <input
          id="character-date-of-creation"
          className={`${
            styles[
              !errors.characterDateOfCreation
                ? 'character-date-of-creation-input'
                : 'character-date-of-creation-input-invalid'
            ]
          }`}
          type="date"
          data-testid={'character-date'}
          {...register('characterDateOfCreation', {
            required: true,
          })}
        />
        <ValidationMessage
          isValid={!errors.characterDateOfCreation}
          message={'Pick the date, please'}
        />
      </div>

      <div className={styles['character-avatar']}>
        <label className={styles['character-avatar-label']} htmlFor="character-avatar">
          Upload your character avatar
        </label>
        <input
          id="character-avatar"
          className={`${
            styles[
              !errors.characterAvatar ? 'character-avatar-input' : 'character-avatar-input-invalid'
            ]
          }`}
          type="file"
          multiple={false}
          accept="image/*"
          {...register('characterAvatar')}
          data-testid={'character-avatar'}
        />
        <ValidationMessage isValid={!errors.characterAvatar} message={'Upload photo, please'} />
      </div>

      <div className={styles['agreement']}>
        Agree to data processing
        <label className={styles['agreement-label']}>
          <input
            className={styles['agreement-input']}
            type="checkbox"
            {...register('agreement', {
              required: true,
            })}
            data-testid={'agreement'}
          />
          <span className={styles['switch']} />
        </label>
        <ValidationMessage
          isValid={!errors.agreement}
          message={'You must agree to the processing of data in order to continue'}
        />
      </div>

      <div className={styles['btns-container']}>
        <button
          className={styles['submit-btn']}
          type="submit"
          disabled={isSubmitButtonDisabled}
          data-testid={'submit-btn'}
        >
          Create
        </button>
        <button className={styles['reset-btn']} type="reset" data-testid={'reset-btn'}>
          Clear
        </button>
        <div
          className={
            styles[`${isCardCreationSuccessful ? 'success-message-active' : 'success-message'}`]
          }
        >
          Success. New character was created!
        </div>
      </div>
    </form>
  );
};

export default Form;
